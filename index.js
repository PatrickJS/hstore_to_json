"use strict";

var pattern = '("(?:\\\\\"|[^"])*?")\\s*=>\\s*((?:"(?:\\\\\"|[^"])*?")|NULL)';
var re = new RegExp(pattern,'gi');

function json_to_hstore(json) {
  if (typeof json === 'string') {
    json = JSON.parse(json);
  }
  var hstore = [];
  for (var key in json) {
    var value = json[key];
    value = (value === null) ? 'NULL' : JSON.stringify(value.toString());
    hstore.push('"' + key + '" => ' + value);
  }
  return hstore.join(', ');
}
module,exports.json_to_hstore = json_to_hstore;

function hstore_to_json(string) {
  var key, value;

  var result = {};
  var match = null;

  while((match = re.exec(string)) != null) {
    key = JSON.parse(match[1]);
    value = match[2] == "NULL" ? null : JSON.parse(match[2]);
    result[key] = value;
  }

  return result;
}
module,exports.hstore_to_json = hstore_to_json;

