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
  var json_file = null;
  var json_content = null;
  var state = null;
  

  var init = function(config) {
    json_file = config.json_file;
  }

  var _load_json_content = function(cb) {
    loadJSON(this.json_file, function(content) {
      console.log('load json',this.json_file);
      this.json_content = content;
      cb();
    });
  }

  var getFont = function(fontName,fontType,cb) {
    
    if(font_lib[fontName] && font_lib[fontName][fontType]) {
      cb(font_lib[fontName][type]);
    } else { 
      if(!this.json_content) {
      } else {
        $.each(this.json_content.fonts, function(font) {
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
    }
  };

  return {
    init : init,
    getFont : getFont
  };
  
});
