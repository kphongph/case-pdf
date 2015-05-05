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

  var font_lib = {};
  var json_content = null;
  
  var getFont = function(fontName,fontType,cb) {
    console.log(json_content);
    if(font_lib[fontName] && font_lib[fontName][fontType]) {
      cb(font_lib[fontName][type]);
    } else { 
      $.each(json_content.fonts, function(font) {
        if(font==fontName) {
          font_lib[font] = {};
          $.each(json_content.fonts[font], function(type) {
            if(fontType == type) {
              loadRAW(json_content.fonts[font][type],function(raw) {
                font_lib[font][type] = raw;
                cb(raw);
              });
            }
          });
        }
      });
    }
  };

  var ds = {
    json_content : null,
    open : function(url,cb) {
      var dsObj = this;
      loadJSON(url,function(response) {
        dsObj.json_content = response;
        cb();
      });
    }
  };

  return ds;
});
