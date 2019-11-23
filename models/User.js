var mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
var USerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Can\'t be blank'],
        trim: true,
        minlength: [3, 'The length of name should be atleast 3 characters']
    },
    phoneno: {
        type: String,
        required: [true, 'Can\'t be blank'],
        trim: true,
        unique: true,
        match: [/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/, 'Please fill a valid phone number']
    },
    email: {
        type: String,
        required: [true, 'Can\'t be blank'],
        trim: true,
        lowercase: true,
        unique: true,
        uniqueCaseInsensitive: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Can\'t be blank'],
        trim: true,
        minlength: [8, 'Password\'s length should be atleast 8 characters']
    },
    rides: [{
        type: Schema.Types.ObjectId,
        ref: 'ride'
    }]
}, { collection: "user" });

// Create model from the schema
module.exports = mongoose.model("user", USerSchema);