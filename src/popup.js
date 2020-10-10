const getCurrentTab = () =>
  new Promise((resolve, reject) => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      tabs => {
        tabs ? resolve(tabs[0]) : reject(new Error('Didnt find a tab'));
      }
    );
  });

const sendMessageToCurrentTab = message =>
  getCurrentTab().then(tab =>
    tab && tab.id
    ? new Promise(resolve =>
      chrome.tabs.sendMessage(tab.id, message, {}, resolve)
    )
    : Promise.resolve()
  );

const form = document.querySelector('form');
function submit(e) {
  e.preventDefault();
  const {
    contenteditable,
    bidenColor,
    trumpColor,
    otherColor,
  } = e.target.elements;

  sendMessageToCurrentTab({
    contenteditable: contenteditable.value === 'true' ? true : false,
    bidenColor: bidenColor.value,
    trumpColor: trumpColor.value,
    otherColor: otherColor.value,
  });
}

form.addEventListener('submit', submit);
