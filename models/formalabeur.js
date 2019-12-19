const mongooose = require('mongoose');
const validator = require('validator');



const formalabeurschema = new mongooose.Schema(
    {
        email: {
            type: String,
            unique:true,
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
            minlength: 8,

        },
        cin: {
            type: String,
            unique:true,
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
            default: "active",
            trim: true,
            minlength: 2,

        },
        pwd: {
            type: String,
            require: true,
            trim: true,
            minlength: 8,

        },
        img: {
            type: String,
            require: true,
            trim: true,

        }
    }

);


Formalabeur = mongooose.model('Formalabeur', formalabeurschema);
module.exports = { Formalabeur };

