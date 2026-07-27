const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.get('/', (req, res) => {
  res.send('CSE 341 Movies & Reviews API is running');
});

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use('/auth', require('./auth'));
router.use('/movies', require('./movies'));
router.use('/reviews', require('./reviews'));

module.exports = router;