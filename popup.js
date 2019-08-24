chrome.tabs.getSelected(null, tab => {
  document.getElementById('turn-on').addEventListener('click', () => {
    chrome.tabs.sendMessage(tab.id, { mode: 'on' })
  })
  document.getElementById('turn-off').addEventListener('click', () => {
    chrome.tabs.sendMessage(tab.id, { mode: 'off' })
  })
})