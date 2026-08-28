(function () {
  var _a = 'https://script.google.com/macros/s/AKfycbwHo0u2BAIAEoeAYOcxaivtUffeqhG7UHZeJ1sxqFsxSrlfHKuXySRaWyk8WLvnpWkRww/exec';
  var _b = '1qaz-pl,0okm2wsx3edc9ijn';

  var _c = document.getElementById('downloadCounter');
  var _d = document.getElementById('downloadCounterNum');
  if (!_c || !_d) return;

  var _e = 0;
  var _f = false;

  function _g(_h) {
    var _i = _e;
    var _j = performance.now();
    var _k = 500;
    function _l(_m) {
      var _n = Math.min(1, (_m - _j) / _k);
      var _o = 1 - Math.pow(1 - _n, 3);
      _e = Math.round(_i + (_h - _i) * _o);
      _d.textContent = _e.toLocaleString();
      if (_n < 1) requestAnimationFrame(_l);
    }
    requestAnimationFrame(_l);
  }

  function _p() {
    _c.style.display = '';
  }

  function _q() {
    fetch(_a + '?action=read')
      .then(function (_r) { return _r.json(); })
      .then(function (_s) {
        if (typeof _s.count === 'number') {
          _g(_s.count);
          _p();
        }
      })
      .catch(function () {});
  }

  function _t() {
    if (_f) return;
    _f = true;
    _g(_e + 1);
    fetch(_a + '?action=bump&token=' + encodeURIComponent(_b))
      .then(function (_r) { return _r.json(); })
      .then(function (_s) {
        if (typeof _s.count === 'number') _g(_s.count);
      })
      .catch(function () {});
  }

  ['downloadBtn', 'livePreviewDownload'].forEach(function (_u) {
    var _v = document.getElementById(_u);
    if (_v) _v.addEventListener('click', _t);
  });

  _q();
})();