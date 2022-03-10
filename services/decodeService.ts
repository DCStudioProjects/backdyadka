import { decodeString, uString } from '../constants/decodeParams';

const btoa = (str) => {
  var buffer;

  if (str instanceof Buffer) {
    buffer = str;
  } else {
    buffer = Buffer.from(str.toString(), 'binary');
  }

  return buffer.toString('base64');
};

const urlDecoder = (options) => {
  let o = {
    u: uString,
    y: 'xx??x?=xx????=',
    p: '#1fZxiaveQd2JgeNtnet9PavxmfNUizOF2wkQ7wOFQeuYmwkPjEKF3bLBmwqiPavxmfNUizOF2yGwTwOpZaLxWcuXjCjxPevFXdnQdz1XWaOxicNJnb2lVcNJ0Lq9id3BmevBdz3amcNFWdmXWBrmiaHo0AkplB2s0Akh0CKalAHBiBKInMKI0aNAXArlVfu1TD3M9AZ4XxNJ4euJZcNtTL3B1MNmlDGiPc3B0yGwTwNmlwkPjMKF3bLBmAnd2BZwTwNBXcGw6wkA1AkIjgGXjMKF3bLBmL3aid3FgdNJ6b2sVMKdjCOTjeum0cuIjCjxpaveQd2IhyvxmfNUizNtOyGwTwOpZaLxWcuXjCjxPevFXdnQdz1XWaOxicNJnb2lVcNJ0Lq9id3BmevBdz3amcNFWdmXWAndnBNM2aKs3MkemAHs1M2xjBuM1MnxmMHiNBKMZauMVfu1TD3M9AZ4XxNJ4euJZcNtTL3B1MNmlDGiPc3B0yGwTwNmlwkPjMKF3bLBmAnd2CqwTwNBXcGw6wkA1AkIjgGXjfqw6KZxXdNJZc2YTwjXjdut1d2JZc2YTwjXjdu9nevxWcuXjzqxUbKFZc2YTwm19',

    KiZNtnRE: function (x) {
      var a;
      eval(decode(decodeString));

      var b = eval(decode(decodeString));
      return a;
    },
    fd: ['KiZNtnRE', 'fBbNhAEF'],
  };

  const fd0 = (s) => {
    if (s.indexOf('.') == -1) {
      s = s.substring(1);
      let s2 = '';
      for (let i = 0; i < s.length; i += 3) {
        s2 += '%u0' + s.slice(i, i + 3);
      }
      s = decodeURIComponent(s2);
    }
    return s;
  };

  var v = {
    log: 0,
    file: '?',
    file3_separator: '//',
    events: 'PlayerjsEvents',
    enc2: '2',
    enc3: '3',
  };

  function UpdateObject(obj, obj2) {
    for (var s in obj2) {
      if (typeof obj2[s] == 'object') {
        if (s == 'events' || s == 'file') {
          obj[s] = obj2[s];
        } else {
          for (var s2 in obj2[s]) {
            if (typeof obj[s] != 'object') {
              obj[s] = {};
            }
            if (typeof obj2[s][s2] == 'object') {
              for (var s3 in obj2[s][s2]) {
                if (typeof obj[s][s2] != 'object') {
                  obj[s][s2] = {};
                }
                if (typeof obj2[s][s2][s3] == 'object') {
                  for (var s4 in obj2[s][s2][s3]) {
                    if (typeof obj[s][s2][s3] != 'object') {
                      obj[s][s2][s3] = {};
                    }
                    obj[s][s2][s3][s4] = obj2[s][s2][s3][s4];
                    if (s3 == 'padding' || s3 == 'margin') {
                      obj[s][s2][s3][s4] = parseInt(obj[s][s2][s3][s4]);
                    }
                  }
                } else {
                  obj[s][s2][s3] = obj2[s][s2][s3];
                  if (s2 == 'padding' || s2 == 'margin') {
                    obj[s][s2][s3] = parseInt(obj[s][s2][s3]);
                  }
                }
              }
            } else {
              obj[s][s2] = obj2[s][s2];
              if (s == 'padding' || s == 'margin') {
                obj[s][s2] = parseInt(obj[s][s2]);
              }
            }
          }
        }
      } else {
        if (s.indexOf('roll') > 0 && trim(obj2[s]) === '') {
        } else {
          obj[s] = SettingsParser(s, obj2[s]);
        }
      }
    }
    return obj;
  }

  var SettingsParser = function (key, value) {
    if (typeof value == 'string') {
      value = trim(value);
      if (key.indexOf('color') > -1 && value != -1) {
      }
    }
    return value;
  };
  var trim = function (x) {
    if (typeof x == 'string') {
      return x.replace(/^\s+|\s+$/gm, '');
    } else {
      return x;
    }
  };
  var dechar = function (x) {
    return String.fromCharCode(x);
  };
  var decode = function (x) {
    if (x.slice(0, 2) == '#1') {
      return salt.d(pepper(x.substring(2), -1));
    } else if (x.slice(0, 2) == '#0') {
      return salt.d(x.substring(2));
    } else {
      return x;
    }
  };
  var abc = String.fromCharCode(
    65,
    66,
    67,
    68,
    69,
    70,
    71,
    72,
    73,
    74,
    75,
    76,
    77,
    97,
    98,
    99,
    100,
    101,
    102,
    103,
    104,
    105,
    106,
    107,
    108,
    109,
    78,
    79,
    80,
    81,
    82,
    83,
    84,
    85,
    86,
    87,
    88,
    89,
    90,
    110,
    111,
    112,
    113,
    114,
    115,
    116,
    117,
    118,
    119,
    120,
    121,
    122
  );
  var salt = {
    _keyStr: abc + '0123456789+/=',
    d: function (e) {
      var t = '';
      var n, r, i;
      var s, o, u, a;
      var f = 0;
      e = e.replace(/[^A-Za-z0-9\+\/\=]/g, '');
      while (f < e.length) {
        s = this._keyStr.indexOf(e.charAt(f++));
        o = this._keyStr.indexOf(e.charAt(f++));
        u = this._keyStr.indexOf(e.charAt(f++));
        a = this._keyStr.indexOf(e.charAt(f++));
        n = (s << 2) | (o >> 4);
        r = ((o & 15) << 4) | (u >> 2);
        i = ((u & 3) << 6) | a;
        t = t + dechar(n);
        if (u != 64) {
          t = t + dechar(r);
        }
        if (a != 64) {
          t = t + dechar(i);
        }
      }
      t = salt._ud(t);
      return t;
    },
    _ud: function (e) {
      var t = '';
      var n = 0;
      var r = 0;
      var c2 = 0;
      while (n < e.length) {
        r = e.charCodeAt(n);
        if (r < 128) {
          t += dechar(r);
          n++;
        } else if (r > 191 && r < 224) {
          c2 = e.charCodeAt(n + 1);
          t += dechar(((r & 31) << 6) | (c2 & 63));
          n += 2;
        } else {
          c2 = e.charCodeAt(n + 1);
          let c3 = e.charCodeAt(n + 2);
          t += dechar(((r & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
          n += 3;
        }
      }
      return t;
    },
  };
  var pepper = function (s, n) {
    s = s.replace(/\+/g, '#');
    s = s.replace(/#/g, '+');
    var a = Number(sugar(o.y)) * n;
    if (n < 0) a += abc.length / 2;
    var r = abc.substring(a * 2) + abc.slice(0, a * 2 + 1);
    return s.replace(/[A-Za-z]/g, function (c) {
      return r.charAt(abc.indexOf(c));
    });
  };
  var sugar = function (x) {
    x = x.split(dechar(61));
    var result = '';
    var c1 = dechar(120);
    var chr;
    for (var i in x) {
      if (x.hasOwnProperty(i)) {
        var encoded = '';
        for (var j in x[i]) {
          if (x[i].hasOwnProperty(j)) {
            encoded += x[i][j] == c1 ? dechar(49) : dechar(48);
          }
        }
        chr = parseInt(encoded, 2);
        result += dechar(chr.toString(10));
      }
    }
    return result.slice(0, result.length - 1);
  };
  var exist = function (x) {
    return x != null && typeof x != 'undefined' && x != 'undefined';
  };
  const Media = (url) => {
    if (typeof url == 'string') {
      url = trim(url);
      if (url.indexOf('[{') == 0) {
        try {
          url = url.replace(/pjs'qt/gi, '"');
          url = JSON.parse(url);
        } catch (e) {
          url = 'incorrect JSON';
        }
      }
      if (url.indexOf('#' + v.enc2) == 0) {
        url = o[o.fd[0]](url);
      }
      if (url) {
        if (url.indexOf('#' + v.enc3) == 0 && url.indexOf(v.file3_separator) > 0) {
          url = o[o.fd[1]](url);
        }
      }
      if (url) {
        if (url.indexOf('#0') == 0) {
          url = fd0(url);
        }
      }
    }

    return url;
  };

  const Init = () => {
    var stop = false;
    if (exist(options.player)) {
      for (var i = 2; i < 10; i++) {
        if (options.player == i && o['u' + i] != '') {
          v = UpdateObject(v, JSON.parse(decode(o['u' + i])));
          stop = true;
        }
      }
    }
    if (o.u != '' && !stop) {
      v = UpdateObject(v, typeof o.u != 'object' ? JSON.parse(decode(o.u)) : o.u);
    }
    v = UpdateObject(v, options);
    //Ready();
  };

  Init();

  const url = Media(v.file);
  return url;
};

export default urlDecoder;
