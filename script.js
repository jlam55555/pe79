var input = [319,680,180,690,129,620,762,689,762,318,368,710,720,710,629,168,160,689,716,731,736,729,316,729,729,710,769,290,719,680,318,389,162,289,162,718,729,319,790,680,890,362,319,760,316,729,380,319,728,716];
input = input.sort();
input = input.filter(function(element, index, array) {
  return element != array[index-1];
});
for(var element in input) {
  input[element] = input[element].toString();
}

var map = {};
for(var element of input) {
  var match1 = [];
  var match2 = [];
  var regex1 = new RegExp("\^" + element.slice(-1));
  var regex2 = new RegExp("\^" + element.slice(-2));
  for(var element2 of input) {
    if(element == element2) continue;
    if(regex1.exec(element2)) match1.push(element2);
    if(regex2.exec(element2)) match2.push(element2);
  }
  map[element] = {match1: match1, match2: match2};
}
for(var element of map) {
  if(element.match1.length == 0 && element.match2.length == 0) {
    console.log(element);
  }
}

var ans = JSON.stringify(map);
