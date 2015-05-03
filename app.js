requirejs.config({
  "baseUrl":".",
  "paths" : {
    "app":"./js",
    "jquery":"//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
    "pdfkit":"./bower_components/bower-pdfkit/pdfkit-0.7.0",
    "blob-stream":"./bower_components/bower-pdfkit/blob-stream-v0.1.2"
  }
});

requirejs(["main"]);
