var xxx = (function () {
  var list = {}
    , _slice = Array.prototype.slice
    , updateList = function (key) {
      list[key] || (list[key] = {
        cbs: [],
        ok: !1,
        args: []
      })
    }
    , r = {
      _dbg: function () {
        return list
      },
      publish: function () {
        var argsArr = _slice.call(arguments)
          , key = argsArr.shift() || "";
        return !key || typeof key != "string" ? r : (key.split(/\key+/).forEach(function (t) {
          if (t) {
            updateList(t),
              list[t].ok = !0,
              list[t].args.push(argsArr),
              list[t].args = list[t].args.slice(-20);
            var r = (list[t].cbs || []).concat()
              , len = r.length;
            while (len)
              r[--len].apply(this, argsArr)
          }
        }),
          r)
      },
      subscribe: function (key, fn) {
        return !key || typeof key != "string" || typeof fn != "function" ? r : (key.split(/\s+/).forEach(function (key) {
          if (key) {
            updateList(key);
            if (list[key].ok) {
              var r = list[key].args;
              for (var s = 0; s < r.length; s++)
                fn.apply(this, r[s])
            }
            list[key].cbs.unshift(fn)
          }
        }),
          r)
      }
    };
    return r
})()