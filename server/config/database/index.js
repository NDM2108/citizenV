const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://namdeptrai:Namdeptrai2502@cluster0.bzcyy.mongodb.net/citizen_v',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        console.log('Connect successfully!');
    } catch (error) {
        console.log('Connect failed!');
    }
}

module.exports = {connect}