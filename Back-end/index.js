const express = require('express')
const sql = require('mssql')
const cors = require('cors')

const app = express()
app.use(cors())

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

// Start server port
app.listen(3000, () => {
	console.log('Backend is now online')
})
