const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)

const Item = mongoose.model('Item', {
    name: String,
    quantity: Number
})

module.exports = Item