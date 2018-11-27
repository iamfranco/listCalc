var formulaField = $('#formula');

function parseFormula(f) {
  var f = removeSpace(f);
  f = fixPower(f);
  var pf = "";
  var listArr = [];
  for (var i=0; i<f.length; i++) {
    var n = letterToNumber(f[i]);
    if (n >= 0 && n < lists.length)  { // if is list reference
      listArr.push(n);
      pf += " lists[" + n + "][k] "
    } else {
      pf += f[i];
    }
  }
  return [pf, listArr];
}

function formulaToList(pf, listArr) {
  var arr = [];
  var ll = listlength(listArr);
  for (var k=0; k<ll; k++) {
    arr[k] = ridErr(eval(pf));
  }
  return arr;
}

function listlength(listArr) {
  if (listArr.length == 0) return 1;
  var r = lists[listArr[0]].length;
  for (var i=1; i<listArr.length; i++) {
    nr = lists[listArr[i]].length;
    if (nr < r) {
      r = nr;
    }
  }
  return r;
}

formulaField.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 13: // ENTER key pressed
      var formula = formulaField.value.toUpperCase();
      if (formula == "FIT") {
        updateElBoxWidth();
        formulaField.value = "";
      } else if (formula == "CLEAR") {
        clearState();
        formulaField.value = "";
      } else if (formula == "SAVE") {
        saveState();
        formulaField.value = "";
      } else {
        var [pf, listArr] = (parseFormula(formula));
        try {
          var newComputedList = formulaToList(pf, listArr);
          if (newComputedList.length > 0) {
            lists.push(newComputedList);
            formulaField.value = "";
            drawList();
            updateListDom(lists.length-1);
            updateListFormula(lists.length-1, removeSpace(formula));
          }
        } catch (e) {}
      }
      break;
    default:

  }
})

function updateListFormula(listIndex, f) {
  getListFormulaDom(listIndex).innerText =  getListLetteringDom(listIndex).innerText +  "=" + f;
  formulaArr[listIndex] = f;
}

