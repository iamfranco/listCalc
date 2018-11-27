var lists = [];
var formulaArr = [];
var elBoxWidth = 75;
var sumBoxWidth = 178;
var precision = 10;

var onClearMode = false;

var listContainer = $('#listContainer');
var fitBtn = $('#fitBtn');
var saveBtn = $('#saveBtn');
var clearBtn = $('#clearBtn');

loadLists();
loadFormula();

document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 9:  // TAB key
      event.preventDefault();
      formulaField.focus();
      break;
    case 188: //  , key
      event.preventDefault();

      break;
    case 27: // ESC key
      event.preventDefault();
      graph.style.display = "none";
      break;
    default:
  }
})

function clearState() {
  lists = [];
  formulaArr = [];
  for (var i=listContainer.childElementCount-1; i>=0; i--) {
    listContainer.removeChild(listContainer.childNodes[i])
  }
  addList();
}


fitBtn.addEventListener('click', function() {
  updateElBoxWidth();
})

saveBtn.addEventListener('click', function() {
  saveState();
  this.classList.add('btn--saved');
  this.innerText = "Saved!";
})
saveBtn.addEventListener('mouseout', function() {
  this.classList.remove('btn--saved');
  this.innerText = "Save";
})

clearBtn.addEventListener('click', function () {
  if (onClearMode) {
    clearState();
    onClearMode = false;
    this.classList.remove('btn--alert');
    this.innerText = "Clear";
  } else {
    onClearMode = true;
    this.classList.add('btn--alert');
    this.innerText = "Clear?";
  }
})
clearBtn.addEventListener('mouseout', function() {
  onClearMode = false;
  this.classList.remove('btn--alert');
  this.innerText = "Clear";
})