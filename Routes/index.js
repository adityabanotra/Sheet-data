const express = require('express');

//Using express Router
const Router = express.Router();

const sheetController = require('../Controllers/sheet_controller.js');
console.log('route loaded');

Router.get('/', sheetController.home);

Router.get('/retrieve', sheetController.retrieve);

Router.post('/add', sheetController.add);

module.exports = Router;