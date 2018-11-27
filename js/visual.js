var letterWidth = 13;
var elBoxMinWidth = 75;

function updateElBoxWidth() {

  // find longest length
  var l = 0;
  for (var i=0; i<lists.length; i++) {
    for (var j=0; j<lists[i].length; j++) {
      var nl = String(lists[i][j]).length;
      if (nl > l) l = nl;
    }
  }

  // update el box width to fit longest number
  elBoxWidth = Math.max(elBoxMinWidth, letterWidth * (l+1) );
  var elBoxes = document.getElementsByClassName("listel");
  for (var i=0; i<elBoxes.length; i++) {
    elBoxes[i].style.width = elBoxWidth + 'px';
  }
}