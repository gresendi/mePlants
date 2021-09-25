const router = require('express').Router()

router.use('/api', require('./userRoutes.js'))
router.use('/api', require('./postRoutes.js'))
router.use('/api', require('./plantRoutes.js'))
router.use('/api', require('./favoriteRoutes.js'))
router.use('/api', require('./commentRoutes.js'))
router.use('/seed', require('./seedRoutes.js'))

module.exports = router
