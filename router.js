const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

var app = express();
var port = "3000";

const product= require('./controllers/FormateurControllers');
const user = require('./controllers/userControllers');

app.use(bodyParser.json());
app.use(cors());

app.use(express.static('assets'))


app.use('/Formateur',product);

app.use("/user", user);
app.use("/groupe", user);
app.use("/formalabeur", user);
app.use("/formation", product);

app.listen(port, () => console.log(`Listening on port ${port}`));
