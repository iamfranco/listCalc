function getCookie(cname, emptyReturn) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return emptyReturn;
}

function saveCookie(cname, cvalue) {document.cookie = cname + "=" + cvalue + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";}

function getLists() {return getCookie("lists", "[]");}
function getFormulaArr() {return getCookie("formulaArr", "[]");}

function saveLists() {saveCookie("lists", listsToString());}
function saveFormulaArr() {saveCookie("formulaArr", formulaArrToString());}

function listsToString() {
  var r = "[";
  for (var i=0; i<lists.length; i++) {
    r += "[" + lists[i].join(", ");
    if (i < lists.length-1) {
      r += "], ";
    } else {
      r += "]";
    }
  }
  r += "]";
  return r;
}

function formulaArrToString() {
  var r = "[";
  for (var i=0; i<formulaArr.length; i++) {
    if (formulaArr[i] === undefined) {
      r += "undefined"
    } else {
      r += "'" + formulaArr[i] + "'";
    }
    if (i < formulaArr.length-1) {
      r += ", ";
    }
  }
  r += "]";
  return r
}

function loadLists() {
  lists = eval(getLists());
  if (lists.length > 0) {
    updateAllListsDom();
  } else {
    addList();
  }
}

function loadFormula() {
  formulaArr = eval(getFormulaArr());
  for (var i=0; i<formulaArr.length; i++) {
    currentf = formulaArr[i];
    if (currentf !== undefined) {
      getListFormulaDom(i).innerText =  getListLetteringDom(i).innerText +  "=" + currentf;
    }
  }
}

function saveState() {
  saveLists();
  saveFormulaArr();
}