const { userValidation } = require('../middleware/validation/user.validation');
const { signUp, signIn, emailVerify } = require('../services/user.service');

const app = require('express').Router();

app.post('/signUp',userValidation,signUp);
app.post('/signIn',signIn);
app.get('/verify/:token',emailVerify);

module.exports = app;
