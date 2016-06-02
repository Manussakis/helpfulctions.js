
function getElementPos (element) {
  var x = element.offsetLeft;
  var y = element.offsetTop;
  var parent = element.offsetParent;
  while (parent) {
    x += parent.offsetLeft;
    y += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return {
    x : x,
    y : y
  }
}

function getEventMousePos (element, e) {
  var scrollX = document.body.scrollLeft || document.documentElement.scrollLeft;
  var scrollY = document.body.scrollTop || document.documentElement.scrollTop;

  if (e.currentTarget) {
    var pos = getElementPos(element);
    return {
      x : e.clientX - pos.x + scrollX,
      y : e.clientY - pos.y + scrollY
    }
  }
  return {
    x : e.offsetX,
    y : e.offsetY
  }
}

function extend ( a, b ) {
  for( var property in b ){
    if(b.hasOwnProperty( property ))
      a[property] = b[property];
  }
  return a;
}

function nodeToArray ( obj ){
  return Array.prototype.slice.call( obj );
}

function objToString ( obj ) {
  return  Object.prototype.toString.call( obj );
}

function insertAfter( referenceNode, newNode ) {
    referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
}

function debounce (func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

//Get viewport size
function getViewport () {
  var docElem = window.document.documentElement,
  clientW = docElem.clientWidth,
  innerW  = window.innerWidth,
  clientH = docElem.clientHeight,
  innerH  = window.innerHeight;

  return {
    width : clientW < innerW ? innerW : clientW,
    height: clientH < innerH ? innerH : clientH
  };
}

// Get top and Left body scroll
function pageScroll (){
  var docElem = document.documentElement;
  return {
    top  : window.pageYOffset || docElem.scrollTop,
    left : window.pageXOffset || docElem.scrollLeft
  };
}

// Get top and Left positions relatives to body
function getOffset (element){
  var rect = element.getBoundingClientRect();
  return {
    top: rect.top + pageScroll().top,
    left: rect.left + pageScroll().left
  };
}

//Check if the element is in viewport
function inViewport ( element, axis, value ){
  var rect = element.getBoundingClientRect(),
  viewportSize, edgeA, edgeB, amount;

  if(axis === 'y'){
    viewportSize = getViewport().height;
    edgeA = 'top';
    edgeB = 'bottom';
    amount = element.offsetHeight * (value || 0);
  } else if (axis === 'x'){
    viewportSize = getViewport().width;
    edgeA = 'left';
    edgeB = 'right';
    amount = element.offsetWidth * (value || 0);
  }
  return (rect[edgeA] <= (viewportSize - amount) && rect[edgeB] >= amount);
}

function arrayToClasses  ( array ) {
  return array.toString().replace(/,/g, ' ');
}

function getStyleValue ( elem, property, psdElem ){
  return window.getComputedStyle(elem, psdElem || null ).getPropertyValue(property);
}

function selectorMatches (el, selector) {
  var p = Element.prototype,
  f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
    return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
  };
  return f.call(el, selector);
}

function getClosest (element, ancestor) {
  while (element) {
    if(selectorMatches(element, ancestor)) break;
    element = element.parentElement;
  }
  return element;
}

// --------------------------------------
// STRING FUNCTIONS
// --------------------------------------

// Get first word
function getFirstWord ( str ) {
  str = str.trim();
  var endAt = str.indexOf(' ');
  return str.substr(0, endAt);
}

// Get last word
function getLastWord ( str ) {
  str = str.trim();
  var startAt = str.lastIndexOf(' ') + 1,
  endAt = str.length - 1;
  return str.substr(startAt, endAt);
}

// Same as above, but return an object with the methods first and last
function getWord ( str ) {
  str = str.trim();
  var startAt, endAt;
  return {
    first: function(){
      startAt = 0;
      endAt = str.indexOf(' ');
      return str.substr(startAt, endAt);
    },
    last: function(){
      startAt = str.lastIndexOf(' ') + 1;
      endAt = str.length - 1;
      return str.substr(startAt, endAt);
    }
  };
}

function stringToArray ( str ) {
  if (objToString(str) === '[object Array]') return str;
  else return str.trim().split(/\s+/g);
}
