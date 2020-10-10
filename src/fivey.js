const makeConentEditable = (elements) => elements.map(e => e.setAttribute('contenteditable', true));
const makeNotConentEditable = (elements) => elements.map(e => e.setAttribute('contenteditable', false));
const changeColor = (color) => (element) => {
  element.style.fill = color;
  if (element?.textContent?.length) {
    element.style.color = color;
  } else {
    element.style.backgroundColor = color;
  }
}

chrome.runtime.onMessage.addListener((message) => {
  const fiveyText = [...document.querySelectorAll('.fivey-text')];
  const mapSubText = [...document.querySelectorAll('.map-text')];
  const mapText = document.querySelector('.hed-wrap')
  const trump = [...document.querySelectorAll('.trump')];
  const biden = [...document.querySelectorAll('.biden')];
  const other = [...document.querySelectorAll('.other')];
  const {contenteditable, trumpColor, bidenColor, otherColor} = message;
  if (contenteditable) {
    makeConentEditable([...fiveyText, ...mapSubText, mapText]);
  } else {
    makeNotConentEditable([...fiveyText, ...mapSubText, mapText]);
  } 
  if (trumpColor.length) {
    trump.map(changeColor(trumpColor));
  } 
  if (bidenColor.length) {
    biden.map(changeColor(bidenColor));
  } 
  if (otherColor.length) {
    other.map(changeColor(otherColor));
  }
});
