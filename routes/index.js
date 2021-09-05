const router = require('express').Router()
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
var cookieParser = require('cookie-parser');
router.use(cookieParser());
var control = require('../controllers/index')

router
    .get('/', control.onGetHome)
    .post('/contact', control.onContact)

module.exports = router;