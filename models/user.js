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
        prenom : {
            type: String,
            require: true,
            trim: true,
            minlength: 2,
        },
        age : {
            type:String,
            require:true,
            trim:true,
        },
        numero_tel : {
            type: String,
            require: true,
            trim: true,
            minlength: 8,
        },
        cin : {
            type: String,
            require: true,
            trim: true,
            minlength: 8,
        },
        formalabeur : {
            type: String,
            require: false,
            trim: true,
            minlength: 2,
        },
        lien_fb : {
            type: String,
            require: true,
            trim: true,
            minlength: 2,
        },
         image_user: {
            type: String,
            require: true,
            trim: true,
        }
        


    }
)


User = mongooose.model('User', userschema);
module.exports = { User };
