const express = require('express')
const app = express()
const port = 80

app.use(express.static('frontend/dist'))

app.listen(port, () =>
	console.log('Server has benn started and he has a port 80 !!!')
)
