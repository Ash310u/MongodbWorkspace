const mongoose = require('mongoose')

const Schema = mongoose.Schema()

const ArtistSchema = new Schema({
    name:{
        type:String,
    },
    age:{
        type:Number,
    },
    yearsActive:{
        type:Number,
    },
    image:{
        type:String,
    },
    genre:{
        type:String,
    },
    website:{
        type:String,
    },
    netWorth:{
        type:String,
    },
    labelName:{
        type:String,
    },
    retired:{
        type:Boolean,
    },
    album:[{
        type: Schema.Types.ObjectId,
    }]
})
