const express = require('express');
const router = express.Router();

/* Home page */
router.get('/', (req, res, next) => {
  res.render('index', {title: 'Home'});
});

/* Fight page */
router.get('/fight', (req, res, next) => {
  res.render('fight', {title: 'Fight!'});
});

module.exports = router;
