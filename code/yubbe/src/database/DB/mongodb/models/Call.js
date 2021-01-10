const mongoose = require('mongoose');

const CallSchema = new mongoose.Schema({
    date:{
        type: Date,
        required:true,
    },
    theme:{
        type:String,
    },
    moderator:{
        type: String,
        required:true,
    },
    clients:{
        type: Array,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})
module.exports = mongoose.models.calls||mongoose.model('calls',CallSchema)