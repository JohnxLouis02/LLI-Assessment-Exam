const express = require('express')
const sql = require('mssql')
const cors = require('cors')
const bodyParser = require('body-parser')


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
app.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    let pool = await sql.connect(config)
    let result = await pool.request()
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, password)
      .query('SELECT * FROM Users WHERE email = @email AND password = @password')

    if (result.recordset.length > 0) {
      res.json({ success: true, message: 'Login successful', user: result.recordset[0] })
    } else {
      res.json({ success: false, message: 'Invalid email or password' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('Error during login')
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
		const checkUserQuery = `SELECT * FROM Users WHERE email = @Email`
		let checkUser = await pool
			.request()
			.input('Email', sql.VarChar, email)
			.query(checkUserQuery)

		if (checkUser.recordset.length > 0) {
			return res
				.status(400)
				.json({ success: false, message: 'User already exists.' })
		}

		// Insert the new user into the database
		const insertUserQuery = `
			INSERT INTO Users (email, password)
			VALUES (@Email, @Password)
		`
		await pool
			.request()
			.input('Email', sql.VarChar, email)
			.input('Password', sql.VarChar, password)
			.query(insertUserQuery)

		return res
			.status(200)
			.json({ success: true, message: 'User registered successfully.' })
	} catch (err) {
		console.error('Error:', err)
		return res
			.status(500)
			.json({ success: false, message: 'Error registering user.' })
	}
})


// Start server port
app.listen(3000, () => {
	console.log('Backend is now online')
})
