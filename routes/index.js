const router = require('express').Router()

// prefix api for api routes and seed for seed routes
router.use('/api', require('./userRoutes.js'))
router.use('/api', require('./postRoutes.js'))
router.use('/api', require('./plantRoutes.js'))
router.use('/api', require('./favoriteRoutes.js'))
router.use('/seed', require('./seedRoutes.js'))

// export router
module.exports = router
