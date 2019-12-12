const mongooose = require('mongoose');
const validator = require('validator');



const groupeschema = new mongooose.Schema(
    {
        idFormation: {
            type: String,
            require: true,
            trim: true
        },
        cin: {
            type: String,
            require: true,
            trim: true
        },
    }

);


Groupe = mongooose.model('Groupe', groupeschema);
module.exports = { Groupe };

