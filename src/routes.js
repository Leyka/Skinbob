const express = require('express')
const router = express.Router()

const homeCtrl = require('./controllers/home')
const syncCtrl = require('./controllers/sync')

// Home Controller
router.route('/').get(homeCtrl.getIndex)
// Sync Controller
router.route('/sync').get(syncCtrl.getIndex)

module.exports = router