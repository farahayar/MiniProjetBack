const mongooose = require('mongoose');
const validator = require('validator');

const formationSchema = new mongooose.Schema(
    {
        titre: {
            type: String,
            require: true,
            trim: true,
            minlength: 2

        },
        description: {
            type: String,
            require: true,
            trim: true,
            minlength: 3,

        },
        volume_horaire: {
            type: Number,
            require: true,
            trim: true
        },
        prix: {
            type: String,
            trim: true,
            minlength: 3,

        },
        idformateur: {
            type: String,
            require: true,
            trim: true,

        }
        , date: {
            type: String,
            require: true,
            trim: true,
        }
        , duree: {
            type: Number,
            require: true,
            trim: true,
        }
        
        , image_Formation: {
            type: String,
            require: true,
            trim: true,
        }
    }
);

Formation = mongooose.model('Formation', formationSchema);
module.exports = { Formation };
