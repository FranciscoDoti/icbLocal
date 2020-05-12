const HashTable = function HashTable (obj) {
  this.length = 0;
  this.items = {};
  
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      this.items[p] = obj[p];
      this.length++;
    }
  }

  this.setItem = function (key, attribute, value) {
    let previous;
    if (this.hasItem(key)) {
      previous = this.items[key];
    } else {
      this.length++;
      if (value !== undefined) {
        this.items[key] = new HashTable();
      }
    }

    if (value !== undefined) {
      this.items[key].setItem(attribute, value);
    } else {
      this.items[key] = attribute;
    }
    return previous;
  };

  this.getItem = function (key, attribute) {
    if (this.hasItem(key)) {
      if (attribute === undefined) {
        return this.items[key];
      } else {
        if (this.items[key].hasItem(attribute)) {
          return this.items[key].getItem(attribute);
        }
      }
    }
    return undefined;
  };

  this.hasItem = function (key) {
    return this.items.hasOwnProperty(key);
  };

  this.removeItem = function (key) {
    if (this.hasItem(key)) {
      const previous = this.items[key];
      this.length--;
      delete this.items[key];
      return previous;
    } else {
      return undefined;
    }
  };

  this.keys = function () {
    var keys = [];
    for (var k in this.items) {
      if (this.hasItem(k)) {
        keys.push(k);
      }
    }
    return keys;
  };

  this.keyList = function (delimiter, padLength) {
    var localPadLength = padLength || 0;
    var localDelimiter = delimiter || "";
    returnList = "";

    //var keys = [];
    for (var k in this.items) {
      if (this.hasItem(k)) {
        returnList = returnList + k.padEnd(padLength) + localDelimiter;
      }
    }
    return returnList;
  };

  this.values = function () {
    var values = [];
    for (var k in this.items) {
      if (this.hasItem(k)) {
        values.push(this.items[k]);
      }
    }
    return values;
  };

  this.each = function (fn) {
    for (var k in this.items) {
      if (this.hasItem(k)) {
        fn(k, this.items[k]);
      }
    }
  };

  this.clear = function () {
    this.items = {};
    this.length = 0;
  };
};
module.exports = HashTable;