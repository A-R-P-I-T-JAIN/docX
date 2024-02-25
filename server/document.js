const { Schema, model } = require("mongoose");

const Document = new Schema({
    _id: String,
    name:String,
    data: Object,
    owner: {
        userId: String,
        emailId: String
    },
    shared:[
        {
            userId: String,
            emailId: String
        }
    ]
})

module.exports = model("Document", Document)