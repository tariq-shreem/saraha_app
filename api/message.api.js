const { auth } = require('../middleware/auth');
const { addMsg, getMessage } = require('../services/messgae.service');

const app = require('express').Router();

app.post('/',addMsg);
app.get('/',auth,getMessage);

module.exports=app;