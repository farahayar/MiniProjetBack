const mongooose = require('mongoose');
const validator = require('validator');



const userschema = new mongooose.Schema(
    {
        email: {
            type: String,
            require: true,
            trim: true,
            minlength: 5,

        },
        nom: {
            type: String,
            require: true,
            trim: true,
            minlength: 2,

        },
        prenom: {
            type: String,
            require: true,
            trim: true,
            minlength: 2,

        },
        age: {
            type: Number,
            require: true,
            trim: true,
            minlength: 2,

        },
        tel: {
            type: String,
            require: true,
            trim: true,
            minlength: 2,

        },
        cin: {
            type: String,
            require: true,
            trim: true,
            minlength: 2,

        },
        lienfb: {
            type: String,
            require: true,
            trim: true,
            minlength: 2,

        },
        formalabeur: {
            type: String,
            default: "desactive",
            trim: true,
            minlength: 2,

        },
        img: {
            type: String,
            require: true,
            trim: true,

        }
    }

);


User = mongooose.model('User', userschema);
module.exports = { User };

