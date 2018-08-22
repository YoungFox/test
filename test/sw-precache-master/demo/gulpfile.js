/* eslint-env node */

'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var express = require('express');
var ghPages = require('gh-pages');
var packageJson = require('../package.json');
var path = require('path');
var runSequence = require('run-sequence');
var swPrecache = require('../lib/sw-precache.js');
var qcdn = require('../node_modules/@q/qcdn');
var fs = require('fs');
var qcdn1 = require('../node_modules/@q/gulp-qcdn');

var filePath = [
  'app/js/a.js',
  'app/js/b.js'
];
var p = qcdn.upload(filePath);



var DEV_DIR = 'app';
var DIST_DIR = 'dist';

function runExpress(port, rootDir) {
  var app = express();

  app.use(express.static(rootDir));
  app.set('views', path.join(rootDir, 'views'));
  app.set('view engine', 'jade');

  app.get('/dynamic/:page', function(req, res) {
    res.render(req.params.page);
  });

  var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server running at http://%s:%s', host, port);
  });
}

function writeServiceWorkerFile(rootDir, handleFetch, callback) {
  var config = {
    cacheId: packageJson.name,
    /*
    dynamicUrlToDependencies: {
      'dynamic/page1': [
        path.join(rootDir, 'views', 'layout.jade'),
        path.join(rootDir, 'views', 'page1.jade')
      ],
      'dynamic/page2': [
        path.join(rootDir, 'views', 'layout.jade'),
        path.join(rootDir, 'views', 'page2.jade')
      ]
    },
    */
    // If handleFetch is false (i.e. because this is called from generate-service-worker-dev), then
    // the service worker will precache resources but won't actually serve them.
    // This allows you to test precaching behavior without worry about the cache preventing your
    // local changes from being picked up during the development cycle.
    handleFetch: handleFetch,
    logger: $.util.log,
    runtimeCaching: [{
      // See https://github.com/GoogleChrome/sw-toolbox#methods
      urlPattern: /runtime-caching/,
      handler: 'cacheFirst',
      // See https://github.com/GoogleChrome/sw-toolbox#options
      options: {
        cache: {
          maxEntries: 1,
          name: 'runtime-cache'
        }
      }
    }],
    staticFileGlobs: ['app/js/a.js',
      'app/js/b.js',
      'dist/**/*.html'
    ],
    stripPrefix: rootDir + '/',
    // verbose defaults to false, but for the purposes of this demo, log more.
    verbose: true
  };

  // p.then(function(res, res1) {
  //   var tmpArr = [];
  //   for (var i in res) {
  //     tmpArr.push(res[i]);
  //   }

  // config.staticFileGlobs = tmpArr;

  // console.log(config);

  swPrecache.write(path.join(rootDir, 'service-worker.js'), config, callback);

  // }).catch(function(err) {
  //   console.log(err);
  // });

}

gulp.task('default', ['serve-dist']);

gulp.task('build', function(callback) {
  runSequence('copy-dev-to-dist','qcdn1', 'generate-service-worker-dist', callback);
});

gulp.task('clean', function() {
  del.sync([DIST_DIR]);
});

gulp.task('serve-dev', ['generate-service-worker-dev'], function() {
  runExpress(3001, DEV_DIR);
});

gulp.task('tttt', ['build'], function(callback) {
  fs.readFile('dist/service-worker.js', 'utf8', (err, data) => {
    if (err) throw err;
    // console.log(data);
    var tmpS = data;

    p.then(function(res, res1) {
      var tmpArr = [];
      for (var i in res) {
        // tmpArr.push(res[i]);
        tmpS = tmpS.replace(i,res[i]);

      }


      fs.writeFile('dist/service-worker.js',tmpS,function (){
        if (err) throw err;
        callback();
      });
    })
    // config.staticFileGlobs = tmpArr;

    // console.log(config);

  });
});

gulp.task('serve-dist', ['tttt'], function() {
  runExpress(3000, DIST_DIR);
});

gulp.task('gh-pages', ['build'], function(callback) {
  ghPages.publish(path.join(__dirname, DIST_DIR), callback);
});

gulp.task('generate-service-worker-dev', function(callback) {
  writeServiceWorkerFile(DEV_DIR, false, callback);
});

gulp.task('generate-service-worker-dist', function(callback) {
  writeServiceWorkerFile(DIST_DIR, true, callback);
});
gulp.task('qcdn1',function (){
   return gulp.src('app/index.html')
        .pipe(qcdn1({
    "script[src]": "src"
})).pipe(gulp.dest(DIST_DIR));
});
gulp.task('copy-dev-to-dist',function() {
  return gulp.src(DEV_DIR + '/**').pipe(gulp.dest(DIST_DIR));
});