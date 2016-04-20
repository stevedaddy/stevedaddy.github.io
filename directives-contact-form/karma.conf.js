// Karma configuration
// Generated on Fri Apr 15 2016 20:23:07 GMT-0700 (Pacific Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'app',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine'],



    // list of files / patterns to load in the browser
    files: [
        './bower_components/jquery/dist/jquery.js',
        './bower_components/angular/angular.js',
        './bower_components/angular-mocks/angular-mocks.js',
        './bower_components/angular-bootstrap/ui-bootstrap.js',
        './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        //'http://chaijs.com/chai.js',
        './myapp.js',
        './myapp-tests.js'

    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor



    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
      browsers: ['Chrome'],

      ///*********************************************************/
      //// Note: this was added AFTER karma init was completed.
      ///*********************************************************/
      //ngHtml2JsPreprocessor: {
      //    stripPrefix: 'spp/',
      //    //stripSufix: '.ext',
      //
      //    // setting this option will create only a single module that contains templates
      //    // from all the files, so you can load them all with module('foo')
      //    moduleName: 'myAppTemplates'
      //},

      // list of files to exclude
      exclude: [],


      // preprocess matching files before serving them to the browser
      // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
          'app/**/*.html': ['ng-html2js']
      },

      proxies: {
          '/loginView.html': 'http://localhost:9876/loginView.html'
      },

      ngHtml2JsPreprocessor: {
          stripPrefix: 'app/',
          moduleName: 'my.templatess'
      },
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
