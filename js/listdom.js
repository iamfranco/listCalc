function addList() {
  lists.push([]);
  drawList();
  drawBox(lists.length-1);
}

function genListLetteringDom() {
  var newListLetteringDom = document.createElement("DIV");
  newListLetteringDom.classList.add("listLettering");
  newListLetteringDom.setAttribute('listIndex', listContainer.childElementCount);
  newListLetteringDom.innerText = numberToLetter(listContainer.childElementCount);
  newListLetteringDom.addEventListener('click', function() {
    plot(letterToNumber(newListLetteringDom.innerText));
    graph.style.display = 'block';
  })
  return newListLetteringDom;
}

function genListSumDom() {
  var newListSumDom = document.createElement("DIV");
  newListSumDom.classList.add("listSum");
  newListSumDom.setAttribute('listIndex', listContainer.childElementCount);
  newListSumDom.style.width = sumBoxWidth + 'px';
  newListSumDom.innerText = "0";
  newListSumDom.addEventListener('click', function() {
    formulaField.value += this.innerText;
    formulaField.focus();
  })
  return newListSumDom;
}

function genListFormulaDom() {
  var newListFormulaDom = document.createElement("DIV");
  newListFormulaDom.classList.add("listFormula");
  newListFormulaDom.addEventListener('click', function() {
    formulaField.value = this.innerText.substring(2, this.innerText.length);
    formulaField.focus();
  })
  return newListFormulaDom;
}

function genListElContainerDom() {
  var newListElContainerDom = document.createElement("DIV");
  newListElContainerDom.classList.add("listElContainer");
  return newListElContainerDom;
}

function drawList() {
  var newListDom = document.createElement("DIV");
  newListDom.classList.add("list");

  newListDom.appendChild(genListLetteringDom());    // position [0]
  newListDom.appendChild(genListSumDom());          // position [1]
  newListDom.appendChild(genListFormulaDom());      // position [2]
  newListDom.appendChild(genListElContainerDom());  // position [3]

  listContainer.appendChild(newListDom);
}

function getListLetteringDom(listIndex) { return listContainer.children[listIndex].children[0];}
function getListSumDom(listIndex) { return listContainer.children[listIndex].children[1];}
function getListFormulaDom(listIndex) { return listContainer.children[listIndex].children[2];}
function getListElContainerDom(listIndex) { return listContainer.children[listIndex].children[3];}

function drawBox(listIndex) {
  var listElContainerDom = getListElContainerDom(listIndex);

  var newListElDom = document.createElement("INPUT");
  newListElDom.classList.add("listel");
  newListElDom.setAttribute('placeholder', "0");
  newListElDom.setAttribute('listIndex', listIndex);
  newListElDom.setAttribute('elIndex', listElContainerDom.childElementCount);
  newListElDom.style.width = elBoxWidth + 'px';

  listElContainerDom.appendChild(newListElDom);
  newListElDom.focus();

  newListElDom.addEventListener('keyup', function(event) {
    updateList(listIndex);
    updateListSum(listIndex);
    var elIndex = parseInt(this.getAttribute('elIndex'));
    var listElContainerDom = getListElContainerDom(listIndex);
    switch (event.keyCode) {
      case 13: // ENTER key pressed
        if (elIndex === listElContainerDom.childElementCount-1) { // if el box is last
          if (this.value.length > 0 ) { // if el box not empty
            drawBox(listIndex);
          } else { // if el box empty
            if (listIndex < listContainer.childElementCount-1) { // if list is not last
              getListElContainerDom(listIndex+1).children[0].focus();
            } else if (listElContainerDom.childElementCount > 1) { // if list is last and has more than 1 entry
              addList();
            }
          }
        } else { // if el box is not last
          listElContainerDom.children[elIndex+1].focus();
        }
        break;
    }
  })

  newListElDom.addEventListener('keydown', function(event) {
    updateList(listIndex);
    updateListSum(listIndex);
    var elIndex = parseInt(this.getAttribute('elIndex'));
    var listElContainerDom = getListElContainerDom(listIndex);
    switch (event.keyCode) {
      case 87: // W key pressed
        event.preventDefault();
        if (listIndex > 0) {
          var nextElIndex = Math.min(elIndex, getListElContainerDom(listIndex-1).childElementCount-1);
          getListElContainerDom(listIndex-1).children[nextElIndex].focus();
        }
        break;
      case 65: // A key pressed
        event.preventDefault();
        if (elIndex > 0) listElContainerDom.children[elIndex-1].focus();
        break;
      case 83: // S key pressed
        event.preventDefault();
        if (listIndex < lists.length-1) {
          var nextElIndex = Math.min(elIndex, getListElContainerDom(listIndex+1).childElementCount-1);
          getListElContainerDom(listIndex+1).children[nextElIndex].focus();
        }
        break;
      case 68: // D key pressed
        event.preventDefault();
        if (elIndex < listElContainerDom.childElementCount-1) listElContainerDom.children[elIndex+1].focus();
        break;
      case 8: // BACKSPACE pressed
        if (this.value.length === 0 ) { // if el box empty
          if (elIndex > 0) {
            event.preventDefault();
            listElContainerDom.removeChild(this);
            lists[listIndex].splice(elIndex, 1);
            listElContainerDom.children[elIndex-1].focus();
          }
        }
        break;
      default:
    }
  })
}

function updateList(listIndex) {
  lists[listIndex] = [];
  var listElContainerDom = getListElContainerDom(listIndex);
  for (var i=listElContainerDom.childElementCount-1; i>=0; i--) {
    var elString = listElContainerDom.children[i].value;
    if (elString.length > 0) { // if el box not empty
      lists[listIndex][i] = parseFloat(elString); // then set value
    } else if (i < lists[listIndex].length) { // if el box empty and not last
      lists[listIndex][i] = 0 // then set as 0li
    }
  }
}

function updateListSum(listIndex) {
  getListSumDom(listIndex).innerText = sum(lists[listIndex]);
}

function updateListDom(listIndex) {
  var listElContainerDom = getListElContainerDom(listIndex);
  for (var i=0; i<lists[listIndex].length; i++) {
    if (listElContainerDom.childElementCount-1 < i) {
      drawBox(listIndex)
    }
    listElContainerDom.children[i].value = lists[listIndex][i];
  }
  if (lists[listIndex].length == 0) {
    drawBox(listIndex);
  }
  updateListSum(listIndex);
}

function updateAllListsDom() {
  for (var i=0; i<lists.length; i++) {
    if (i > listContainer.childElementCount-1 ) {
      drawList();
    }
    updateListDom(i);
  }
}
