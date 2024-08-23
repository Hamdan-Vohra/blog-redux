const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId(),
    userId:{type:Number,default:0},
    title:{type:String,required:true},
    body:{type:String,required:true},
    date:{type:String,default:new Date().toISOString(),required:true},
    reactions: {
        thumbsUp: { type: Number, default: 0 },
        wow: { type: Number, default: 0 },
        heart: { type: Number, default: 0 },
        rocket: { type: Number, default: 0 },
        coffee: { type: Number, default: 0 },
    }
})

module.exports = mongoose.model(blogSchema,'blogs');