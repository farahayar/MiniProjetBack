const mongooose = require('mongoose');
const validator = require('validator');


const formateurschema = new mongooose.Schema(
    {
        nom: {
            type: String,
            require: true,
            trim: true,
            minlength: 3

        },
        prenom: {
            type: String,
            require: true,
            trim: true,
            minlength: 3,

        },
        age: {
            type: Number,
            require: true,
            trim: true
        },
        fonction: {
            type: String,
            trim: true,
            minlength: 3,

        },
        numero_tel: {
            type: String,
            require: true,
            trim: true,
            minlength: 8,

        },
        email: {
            type: String,
            require: true,
            trim: true,
            minlength: 2,
            unique: true,
            validate:
            {
                validator: validator.isEmail,
                message: "email invalid"

            }
        }, salaire: {
            type: String,
            require: true,
            trim: true,
            minlength: 2,

        }, admin: {
            type: String,
            default: "desactive",
            require: true,
            trim: true,

        }, pwd:
        {
            type: String,
            trim: true,
            minlength: 4

        }, image_formateur: {
            type: String,
            require: true,
            trim: true,
        }
        
    }

);

Formateur = mongooose.model('Formateur', formateurschema);
module.exports = { Formateur };
