var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.status(403).end();
  // res.status(504).end();
  res.render('index', { title: 'Express' });
});

router.get('/http', function (req, res, next) {
  res.set('Content-Type', 'text/plain');
  // res.set('Cache-Control', 'no-store');
  // res.set('Cache-Control', 'no-cache');
  // res.set('Cache-Control', 'only-if-cached');
  // res.set('Cache-Control', 'max-stale=3600');
  // res.set('Connection', 'close');
  // res.set('Set-Cookie', 'a=1;HttpOnly');
  // res.set('Cache-Control', 'min-fresh=5');
  res.set('Cache-Control', 'must-revalidate');
  res.set('Location', 'http://www.so.com');

  res.render('http', { title: 'http' });
});


router.get('/xss', function (req, res, next) {
  // console.log(req);
  res.set('X-XSS-Protection', 0);
  res.render('xss/index', { q: req.query.q });
});


module.exports = router;
