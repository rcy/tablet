var Tablet = (function() {
  var map = Array.prototype.map;
  var join = Array.prototype.join;
  var forEach = Array.prototype.forEach;

  var maxWidths = function(a) {
    var max = [];  // [3, 1, 1, 7] for above art
    a.forEach(function(row) {
      for (var i in row) {
        if (!max[i] || (row[i].length > max[i])) {
          max[i] = row[i].length;
        }
      }
    });
    return max;
  }

  var exports = {
    run: function() {
      console.log('welcome to tablet');

      forEach.call(this.tables(), function(table) {
        console.log(this.atoaa(this.ttoa(table)));
      }, this);
    },

    tables: function() {
      return document.querySelectorAll('table');
    },

    // table to array
    ttoa: function(table) {
      return map.call(table.querySelectorAll('tr'), function(tr) {
        return map.call(tr.querySelectorAll('th,td'), function(td) {
          return td.textContent;
        })
      });
    },

    // array to csv
    atocsv: function(a) {
      return a.map(function(row) {
        return row.join(',');
      }).join('\n');
    },

    // array to ascii art
    atoaa: function(a, opts) {
      // +-----+---+---+---------+
      // | abc | d | e | fghijkl |
      // +-----+---+---+---------+

      opts = opts || {};
      var align = opts.align || 'left';
      var padding = (opts.padding === undefined) ? 1 : opts.padding;

      var maxes = maxWidths(a);
      var aa = '\n';

      var divline = '';
      maxes.forEach(function(max) {
        divline += "+";
        divline += Array(2*padding + max+1).join('-');
      });
      divline += '+\n';

      aa += divline;
      a.forEach(function(row) {
        aa += "|";
        for (var i in row) {
          var col = row[i];
          var max = maxes[i];
          aa += Array(1+padding).join(' ');
          switch (align) {
          case 'left':
            aa += col + Array(max+1-col.length).join(' ');
            break;
          case 'right':
            aa += Array(max+1-col.length).join(' ') + col;
            break;
          default: // center
            var ws1 = Array(Math.floor((max-col.length)/2)+1).join(' ');
            var ws2 = Array(Math.ceil((max-col.length)/2)+1).join(' ');
            aa += ws1 + col + ws2;
          }
          aa += Array(1+padding).join(' ') + "|";
        }
        aa += "\n" + divline;
      });
      return aa;
    }
  }

  return exports;
})();
