var input = [319,680,180,690,129,620,762,689,762,318,368,710,720,710,629,168,160,689,716,731,736,729,316,729,729,710,769,290,719,680,318,389,162,289,162,718,729,319,790,680,890,362,319,760,316,729,380,319,728,716];
input = input.sort();
input = input.filter(function(element, index, array) {
  return element != array[index-1];
});
for(var element in input) {
  input[element] = input[element].toString();
}
var loners = {};
for(var element of input) {
  var matched = false;
  for(var element2 of input) {
    if(element.slice(-2) == element2.slice(0, 2)) {
      matched = true;
      break;
    }
  }
  if(!matched) {
    loners[element] = [element];
  }
}
for(var i = 0; i < 5; i++) {
  for(var element of input) {
    for(var element2_number in loners) {
      var element2 = loners[element2_number];
      if(element2_number == element || element2.indexOf(element) >= 0) continue;
      if(element.slice(-2) == element2_number.slice(0, 2)) {
        loners[element + element2_number.slice(2)] = element2.concat([element]);
      } else if(element.slice(-1) == element2_number.slice(0, 1)) {
        loners[element + element2_number.slice(1)] = element2.concat([element]);
      }
    }
  }
}

var nonloners = {};
for(var element of input) {
  if(loners[element] == undefined) {
    nonloners[element] = [element];
  }
}
for(var element1 in nonloners) {
  for(var element2 in nonloners) {
    if((new Set(nonloners[element1].concat(nonloners[element2]))).size == nonloners[element1].concat(nonloners[element2]).length) {
      if(element1.slice(-2) == element2.slice(0, 2)) {
        nonloners[element1 + element2.slice(2)] = nonloners[element2].concat(nonloners[element1]);
      } else if(element1.slice(-1) == element2.slice(0, 1)) {
        nonloners[element1 + element2.slice(1)] = nonloners[element2].concat(nonloners[element1]);
      }
    }
  }
}
for(var element1 in nonloners) {
  for(var element2 in loners) {
    if((new Set(nonloners[element1].concat(loners[element2]))).size == nonloners[element1].concat(loners[element2]).length) {
      if(element1.slice(-2) == element2.slice(0, 2)) {
        nonloners[element1 + element2.slice(2)] = loners[element2].concat(nonloners[element1]);
      } else if(element1.slice(-1) == element2.slice(0, 1)) {
        nonloners[element1 + element2.slice(1)] = loners[element2].concat(nonloners[element1]);
      }
    }
  }
}

for(var obj in nonloners) {
  loners[obj] = nonloners[obj];
}

var keys = Object.keys(loners);
keys = keys.sort(function(a, b) { return b.length-a.length; });
var lonerString = "";
for(var key of keys) {
  loners[key].sort();
  lonerString += "<br>Length: " + key.length + ", Key: " + key + ", Contains: (" + loners[key].length + ") " + loners[key];
}

var ans = input + "<br>" + lonerString;
