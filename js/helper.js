function $(x) {return document.querySelector(x);}

function sum(ar1) {
  var r = 0;
  for (var i=0; i<ar1.length; i++) {
    r += ar1[i];
  }
  return ridErr(r);
}

function ridErr(f) {
  return parseFloat(f.toFixed(precision));
}

function fixPower(expr) {
  // "x^3" -> "x**3"
  return expr.replace(/\^/g, "**");
}

function letterToNumber(l) {return l.charCodeAt(0) - 65;}
function numberToLetter(n) {return String.fromCharCode(65 + n);}
function removeSpace(str) {return str.replace(/\s/g, '');}