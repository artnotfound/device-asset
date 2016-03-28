function getDeviceRes() {
  var r = window.devicePixelRatio || 1;

  return {
    w: screen.width * r,
    h: screen.height * r
  }
}

function getDeviceInfo(config) {
  return function (res) {
    var w = res.w;
    var h = res.h;
    var device = null;

    Object.keys(config).forEach(function(k) {
      if (!config[k].res) config[k].res = {};

      var matchesPortrait = (config[k].res.w === w && config[k].res.h === h);
      var matchesLandscape = (config[k].res.h === w && config[k].res.w === h);

      if (matchesPortrait || matchesLandscape) {
        device = config[k];
      }
    });

    if (!device) {
      var fileName = w <= 1920 ? 'desktop' : 'desktop_hd';
      var displayName = fileName === 'desktop' ? 'Desktop' : 'Desktop HD';

      device = {
        displayName: displayName,
        fileName: fileName,
        res: {
          w: w,
          h: h
        }
      }
    }

    return device;
  }
}

function applyOptions(options) {
  return function(device) {
    if (!options) {
      return device;
    }

    if (options.base) {
      var lastChar = options.base.slice(-1);
      if (lastChar !== '/') options.base += '/';
      device.fileName = options.base + device.fileName;
    }

    if (options.ext) {
      device.fileName = device.fileName + '.' + options.ext;
    }

    return device;
  }
}

function deviceAsset(options, config) {
  var pipe = function(fns) {
    return function(x) {
      return fns.reduce(function(v, f) {
        return f(v)
      }, x);
    }
  };

  return pipe([
    getDeviceRes,
    getDeviceInfo(config),
    applyOptions(options)
  ])();
}

var defaultConfig = require('config.json');

module.exports = {
  getAsset: function(options, config) {
    if (!window || !screen) {
      console.warn('NEEDS BROWSER WINDOW!');
      return null;
    }

    return deviceAsset(options, (config || defaultConfig));
  },
  getDevices: function() {
    return defaultConfig;
  }
}
