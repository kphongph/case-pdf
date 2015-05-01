define('xhr-loader',[], function() {
  var loadJSON = function(url,cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'text';
    xhr.send();

    xhr.onload = function(e) {
      cb(JSON.parse(xhr.responseText));
    }
  };

  return {
    loadJSON : loadJSON   
  };
});
