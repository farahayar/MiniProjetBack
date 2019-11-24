const mongooose = require('mongoose');
const validator = require('validator');


const userschema = new mongooose.Schema(
    {
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
        },
        nom : {
            type: String,
            require: true,
            trim: true,
            minlength: 2,
        },
        age : {
            type:Number,
            require:true,
            trim:true,
        },
        numero_tel : {
            type: Number,
            require: true,
            trim: true,
            minlength: 8,
        },
        cin : {
            type: Number,
            require: true,
            trim: true,
            minlength: 8,
        },
        lien_fb : {
            type: String,
            require: true,
            trim: true,
            minlength: 2,
        }
        


    }
)