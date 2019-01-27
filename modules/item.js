const mongoose = require('mongoose')

const url = 'mongodb://EDITTHIS:EDITTHIS@ds213615.mlab.com:13615/kauppalista'

mongoose.connect(url)

const Item = mongoose.model('Item', {
    name: String,
    quantity: Number
})

module.exports = Item