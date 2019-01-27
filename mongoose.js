const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)

const itemSchema = new mongoose.Schema({
    name: String,
    quantity: Number
})

const Item = mongoose.model('Item', itemSchema);
  
if(process.argv.length <= 2) {
    Item
        .find({})
        .then(response => {
            console.log("Kauppalista:")
            response.forEach(item => {
                console.log(item.name, item.quantity);
            });
            mongoose.connection.close();
        });
} else if(process.argv.length >= 4) {
    const item = new Item({
        name: process.argv[2],
        quantity: process.argv[3]
    });

    item
        .save()
        .then(response => {
            console.log(`Lisätään tavaraa ${item.name} ${item.quantity} kappaletta listalle`);
        mongoose.connection.close()
        })
    }