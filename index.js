const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Item = require('./modules/item')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

const formatItem = (item) => {
    return {
        name: item.name,
        quantity: item.quantity,
        id: item._id
    }
}

app.post('/items', (req, res) => {
    const body = req.body

    const item = new Item({
        name: body.name,
        quantity: body.quantity
    })

    Item
    .findOne({name: body.name})
    .then(result => {
        item
        .save()
        .then(savedItem => {
            res.json(formatItem(savedItem))
        })
    })     
})

app.get('/', (req, res) => {
    res.send('<h1>Kauppalista</h1>')
})

app.get('/items', (req, res) => {
    Item
        .find({})
        .then(items => {
            res.json(items.map(formatItem))
        })
})

app.get('/items/:id', (req, res) => {
    Item
        .findById(req.params.id)
        .then(item => {
            if(item) {
                res.json(formatItem(item))
            } else {
                res.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({error: 'Malformatted id'})
        })
})

app.delete('/items/:id', (req, res) => {
    Item
        .findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({error: 'Malformatted id'})
        })
})
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })