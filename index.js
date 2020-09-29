const express = require('express')
const app = express();
const checkUser = require('./routes/checkUser.js')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/api', checkUser)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})