var script = document.getElementById('start');
var isIE8 = script && script.getAttribute('data-browser') === 'ie8';

var jqueryLink = isIE8 ? '//code.jquery.com/jquery-1.11.3' : '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery';

require.config({
  baseUrl: 'src/js',
  paths: {
    jquery: jqueryLink,
    bootstrap: '//netdna.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap',
    bootstrap4: '../../node_modules/bootstrap/dist/js/bootstrap',
    'jui-core': '../../node_modules/jui-core/dist/core',
    'jui': '../../node_modules/jui/dist/ui',
    lang: '../../lang/summernote-ko-KR'
  },
  shim: {
    bootstrap: ['jquery'],
    bootstrap4: ['jquery'],
    lang: ['jquery']
  },
  packages: [{
    name: 'summernote',
    main: 'summernote',
    location: './'
  }]
});

require(['jquery', 'summernote'], function ($) {
  var requireByPromise = function (paths) {
    return $.Deferred(function (deferred) {
      require(paths, function () {
        deferred.resolve.apply(this, arguments);
      });
    });
  };

  var promise = $.Deferred();
  // editor type setting
  switch ($('script[data-editor-type]').data('editor-type')) {
    case 'lite':
      promise = requireByPromise(['summernote/lite/settings']);
      break;
    case 'bs3':
      promise = requireByPromise(['bootstrap', 'summernote/bs3/settings']).then(function () {
        return requireByPromise(['lang']);
      });
      break;
    case 'bs4':
      promise = requireByPromise(['bootstrap4', 'summernote/bs4/settings']).then(function () {
        return requireByPromise(['lang']);
      });
      break;
    case 'jui':
      promise = requireByPromise(['summernote/jui/settings']).then(function () {
        return requireByPromise(['lang']);
      });
      break;
  }

  promise.then(function () {
    // initialize summernote
    $('.summernote').summernote({
      height: 300,
      lang: 'ko-KR',
      placeholder: 'type here...'
    });
  });
});
