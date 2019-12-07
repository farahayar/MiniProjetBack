const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

var app = express();
var port = "3000";

app.use(bodyParser.json());
app.use(cors());

app.use(express.static('assets'))
const formateur = require('./controllers/formateurControllers');
const user = require('./controllers/userControllers');


app.use("/formateur", formateur);
app.use("/user", user);

app.listen(port, () => console.log(`Listening on port ${port}`));
