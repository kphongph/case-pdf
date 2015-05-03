define(['jquery'], function($) {
  var loadJSON = function(url,cb) {
    $.ajax({
      url:url,
      method:'GET',
      dataType:'json'
    }).done(function(response) {
      cb(response);
    });
  };

  var loadRAW = function(url,cb) {
    $.ajax({
      url:url,
      method:'GET',
      responseType:'arraybuffer'
    }).done(function(response) {
      cb(response);
    });
  };

  return {
    loadJSON : loadJSON,
    loadRAW : loadRAW
  };
  
});
