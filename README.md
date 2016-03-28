# device-asset

[Live Demo](http://artnotfound.github.io/device-asset/)

## Motivation

`device-asset` is used to read the browser's `window` + `screen` to calculate the best file size you should use for a given asset. Additionally,
you can pass options like `base` and `ext` to immediately create the correct asset path.

## Specific Devices supported:

* iphone 4
* iphone 5
* iphone 6
* iphone 6 plus
* ipad
* ipad air
* ipad retina
* ipad pro
* samsung galaxy
* surface 3
* android
* android hd

## Node.js Usage

Use anywhere you have a global `window` and `screen` object.
Filenames will become back as a string that corresponds to the keys in `config.json`.

```js

var da = require('device-asset');

da.getAsset();

```

will produce a response:

```js
{
  "displayName": "iPhone 6 Plus",
  "fileName": "iphone_6_plus",
  "res": {
    "w": 1242,
    "h": 2208
  }
}
```

Additionally, you can pass options `base` or `ext` like so:

```js

var da = require('device-asset');
da.getAsset({
  base: 'http://mysite.com/images/',
  ext: 'jpg'
});

```

will produce a response with useful `fileName`:

```js
{
  "displayName": "iPhone 6 Plus",
  "fileName": "http://mysite.com/images/iphone_6_plus.jpg",
  "res": {
    "w": 1242,
    "h": 2208
  }
}
```

If you're feeling extra lucky, you can pass your own config (use the structure in `config.json`).

```js

var da = require('device-asset');
var customConfig = {
  "custom_thing": {
    "displayName": "Custom Thing",
    "fileName": "custom_thing",
    "res": {
      "w": 600,
      "h": 800
    }
  },
  "custom_thing_2": {
    "displayName": "Custom Thing 2",
    "fileName": "custom_thing 2",
    "res": {
      "w": 200,
      "h": 300
    }
  }
}
da.getAsset({
  base: 'http://mysite.com/images/',
  ext: 'jpg'
}, customConfig);

```

You can also get the default config by using `getDevices`.

```js

var da = require('device-asset');

function getOptions(devices) {
  return Object.keys(devices).map(function(d) {
   var elm = document.createElement('option');
   elm.value = devices[k].fileName; 
   elm.innerHTML = devices[k].displayName

   return elm;
  });
}

var devices = getOptions(da.getDevices());

```

## Non-Node Usage

To use outside of Node, require the `device-asset-min.js` file in your project which will expose a global `deviceAsset` object.

```html
<html>
<head>
<title>Page</title>
</head>
<body>
  <div id="mount"></div>
  <script type="text/javascript" src="/device-asset-min.js"></script>
  <script>
    var bestAsset = deviceAsset.getAsset({
      base: 'http://mysite.com/images/',
      ext: 'jpg'
    });

    var image = document.createElement('img');
    image.src = bestAsset.fileName;

    var container = document.getElementById('mount');
    container.appendChild(image);
  </script>
</body>
</html>
 
```


