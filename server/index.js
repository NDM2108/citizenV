//Import
const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')

//Connect to database
const connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb://localhost:27017/my_database',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        console.log('DB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
connectDB()

const app = express()

app.use('/api/auth', authRouter)

const PORT = 5000

app.listen(PORT, () => console.log('Server started on port ${PORT}'))