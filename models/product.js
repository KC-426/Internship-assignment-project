const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        enum: [1, 2, 3],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    transporter: {
        type: String,
        enum: ['transporter1','transporter2', 'transporter3' ],
        required: true
    },

})

module.exports = mongoose.model('Product', productSchema)