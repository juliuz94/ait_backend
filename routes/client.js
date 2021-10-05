const express = require('express');
const router = express.Router();
var multer = require("multer");
var upload = multer();

const insertClients = require('../controllers/client/insertClients');
const getClients = require('../controllers/client/getClients');
const getClientsMetadata = require('../controllers/client/getClientsMetada');

router.get('/', getClients);
router.get('/metadata', getClientsMetadata);
router.post('/', upload.any(), insertClients);

module.exports = router;
