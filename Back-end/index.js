const express = require('express')
const sql = require('mssql')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')


const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

const config = {
	user: 'admin',
	password: 'admin',
	server: 'AORUS-5MB',
	database: 'EXAM',
	options: {
		trustedConnection: true,
		enableArithAbort: true,
		trustServerCertificate: true,
		instancename: 'SQLEXPRESS',
	},
	port: 1433,
}


app.get('/', (req, res) => {
	return res.json('This is the backend')
})


// Route to test if the connection works with my test data
app.get('/Users', async (req, res) => {
	try {
		let pool = await sql.connect(config)
		let result = await pool.request().query('SELECT * FROM Users')
		res.json(result.recordset)
        console.log('Data retrieved from the database:', result.recordset)
	} catch (err) {
		console.log(err)
		res.status(500).send('Error retrieving users')
	}
})

// Route to authenticate users
// Route to authenticate users
app.post('/login', async (req, res) => {
	const { email, password } = req.body

	try {
		// Step 1: Fetch user from the database by email
		let pool = await sql.connect(config)
		let result = await pool
			.request()
			.input('Email', sql.VarChar, email)
			.query('SELECT * FROM Users WHERE Email = @Email')

		if (result.recordset.length === 0) {
			// User not found
			return res
				.status(400)
				.json({ success: false, message: 'Invalid credentials' })
		}

		const user = result.recordset[0]

		// Step 2: Compare the input password with the stored hashed password
		const isMatch = await bcrypt.compare(password, user.Password)

		if (!isMatch) {
			return res
				.status(400)
				.json({ success: false, message: 'Invalid credentials' })
		}

		// Step 3: If password matches, login success
		res.json({
			success: true,
			message: 'Login successful',
			userId: user.UserID,
		})
	} catch (error) {
		console.error('Error during login:', error)
		res.status(500).json({ success: false, message: 'Server error' })
	}
})


app.post('/register', async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res
			.status(400)
			.json({ success: false, message: 'Email and password are required.' })
	}

	try {
		let pool = await sql.connect(config)

		// Check if the user already exists
		const checkUserQuery = 'SELECT * FROM Users WHERE email = @Email'
		let checkUser = await pool
			.request()
			.input('Email', sql.VarChar, email)
			.query(checkUserQuery)

		if (checkUser.recordset.length > 0) {
			return res
				.status(400)
				.json({ success: false, message: 'User already exists.' })
		}

		// Hash the password before storing it
		const hashedPassword = await bcrypt.hash(password, 10)

		// Insert the new user into the database
		const insertUserQuery =
			'INSERT INTO Users (email, password) VALUES (@Email, @Password)'
		await pool
			.request()
			.input('Email', sql.VarChar, email)
			.input('Password', sql.VarChar, hashedPassword)
			.query(insertUserQuery)

		return res
			.status(200)
			.json({ success: true, message: 'User registered successfully.' })
	} catch (err) {
		console.error('Error registering user:', err)
		return res
			.status(500)
			.json({ success: false, message: 'Error registering user.' })
	}
})

// Route to add a new faculty member
app.post('/addFaculty', async (req, res) => {
    const { name, college, status, academicStatus, birthday, gender, address } = req.body;

    if (!name || !college || !status || !academicStatus || !birthday || !gender) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        let pool = await sql.connect(config);

        // Insert the new faculty into the database
        const insertFacultyQuery = `
            INSERT INTO Faculty (name, college, status, academicStatus, birthday, gender, address)
            VALUES (@Name, @College, @Status, @AcademicStatus, @Birthday, @Gender, @Address)
        `;
        await pool.request()
            .input('Name', sql.VarChar, name)
            .input('College', sql.VarChar, college)
            .input('Status', sql.VarChar, status)
            .input('AcademicStatus', sql.VarChar, academicStatus)
            .input('Birthday', sql.Date, birthday)
            .input('Gender', sql.VarChar, gender)
            .input('Address', sql.VarChar, address || '')  // Optional field
            .query(insertFacultyQuery);

        return res.status(200).json({ success: true, message: 'Faculty added successfully.' });
    } catch (err) {
        console.error('Error adding faculty:', err);
        return res.status(500).json({ success: false, message: 'Error adding faculty.' });
    }
});

app.get('/Faculty', async (req, res) => {
	try {
		let pool = await sql.connect(config)
		let result = await pool.request().query('SELECT * FROM Faculty')
		res.json(result.recordset)
		console.log('Data retrieved from the database:', result.recordset)
	} catch (err) {
		console.log(err)
		res.status(500).send('Error retrieving users')
	}
})

// Route to update a faculty member
app.put('/Faculty/:id', async (req, res) => {
	const id = req.params.id
	const { name, college, status, academicStatus, birthday, gender, address } =
		req.body

	// Log the data received from the front end
	console.log('Data received from front end:', req.body)

	try {
		let pool = await sql.connect(config)

		// Only update the fields that are provided in the request body
		const updateFields = []
		if (name) updateFields.push('name = @Name')
		if (college) updateFields.push('college = @College')
		if (status) updateFields.push('status = @Status')
		if (academicStatus) updateFields.push('academicStatus = @AcademicStatus')
		if (birthday) updateFields.push('birthday = @Birthday')
		if (gender) updateFields.push('gender = @Gender')
		if (address !== undefined) updateFields.push('address = @Address')

		if (updateFields.length === 0) {
			return res
				.status(400)
				.json({ success: false, message: 'No fields to update.' })
		}

		const updateFacultyQuery = `
            UPDATE Faculty
            SET ${updateFields.join(', ')}
            WHERE id = @Id
        `

		const request = pool.request()
		if (name) request.input('Name', sql.VarChar, name)
		if (college) request.input('College', sql.VarChar, college)
		if (status) request.input('Status', sql.VarChar, status)
		if (academicStatus)
			request.input('AcademicStatus', sql.VarChar, academicStatus)
		if (birthday) request.input('Birthday', sql.Date, birthday)
		if (gender) request.input('Gender', sql.VarChar, gender)
		if (address !== undefined)
			request.input('Address', sql.VarChar, address || '')
		request.input('Id', sql.Int, id)

		await request.query(updateFacultyQuery)

		return res
			.status(200)
			.json({ success: true, message: 'Faculty updated successfully.' })
	} catch (err) {
		console.error('Error updating faculty:', err)
		return res
			.status(500)
			.json({ success: false, message: 'Error updating faculty.' })
	}
})






// Start server port
app.listen(3000, () => {
	console.log('Backend is now online')
})
