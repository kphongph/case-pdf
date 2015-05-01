(function() {
  require([
    'xhr-loader'
  ], function(xhrLoader) {
    xhrLoader.loadJSON('/test.json',function(content) {
      console.log(content);
    });
  });
})();
