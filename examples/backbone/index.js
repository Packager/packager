const packager = new Packager();
packager.registerPlugin(commonjsPlugin);

const files = [
  {
    name: "app.js",
    path: "/src/app.js",
    entry: true,
    code: `import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

var ListView = Backbone.View.extend({    
    el: $('#app'),
    initialize: function(){
        _.bindAll(this, 'render'); 
        
        this.render();
    },
    render: function(){
        $(this.el).append("<h1>Hello world from Backbone!</h1>");
    }
    });
var listView = new ListView();`
  }
];

(async () => {
  try {
    const bundle = await packager.bundle(files);
    eval(bundle.code);
  } catch (e) {
    console.error(e);
  }
})();
