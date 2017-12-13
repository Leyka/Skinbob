const express = require('express')
const router = express.Router()

const homeCtrl = require('./controllers/home')
const syncCtrl = require('./controllers/sync')

// Home Controller
router.route('/').get(homeCtrl.getIndex)
// Sync Controller
router.route('/sync').get(syncCtrl.getIndex)
router.route('/sync/everything').get(syncCtrl.getEverything)
router.route('/sync/sales').get(syncCtrl.getSales)

module.exports = router