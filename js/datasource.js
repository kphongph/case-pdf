define(['jquery'], function($) {

  var loadJSON = function(url,cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'text';
    xhr.onload = function(e) {
      cb(JSON.parse(xhr.responseText));
    }
    xhr.send();
  };

  var loadRAW = function(url,cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function(e) {
      cb(xhr.response);
    }
    xhr.send();
  };

  var ds = {
    open : function(url,cb) {
      var dsObj = this;
      loadJSON(url,function(response) {
        dsObj.json_content = response;
        console.log(response);
        var context = {
          json: response,
          getFont: function(url, cb) {
            loadRAW(url, function(response) {
              cb(response);
            });
          }
        };
        cb(context);
      });
    }
  };

  return ds;
});
