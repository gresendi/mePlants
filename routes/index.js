const router = require('express').Router()

router.use('/api', require('./userRoutes.js'))
router.use('/api', require('./postRoutes.js'))
router.use('/api', require('./plantRoutes.js'))
router.use('/seed', require('./seedRoutes.js'))

module.exports = router
