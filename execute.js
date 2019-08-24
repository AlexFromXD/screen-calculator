let firstNum = null
let secondNum = null
let operator = null

const menuStyle = (x, y) => `
  display: flex;
  width: 160px;
  justify-content: space-around;
  align-items: center;
  background-color: #777;
  padding: 3px;
  position: absolute;
  top: ${y + 10}px;
  left: ${x + 10}px;
  z-index: 9999;`

const operatorStyle = `
  width: 30px; height: 30px;
  text-align: center;
  border-radius: 100%;
  font-size: 24px;
  line-height: 36px;
  background-color: #fcfcfc;`

const buttonList = [
  { id: 'plus', symbol: '➕'},
  { id: 'minus', symbol: '➖'},
  { id: 'multiply', symbol: '✖️'},
  { id: 'dividen', symbol: '➗'},
]

chrome.runtime.onMessage.addListener(data => {
  if (data.mode === 'on') {
    console.log('turn on calculator')
    document.body.addEventListener('click', calculator)
  }
  if (data.mode === 'off') {
    console.log('turn off calculator')
    document.body.removeEventListener('click', calculator)
  }
})

function calculator (event) {
  removeMenu()
  if (firstNum && operator) {
    doMath()
  } else {
    let selectedText = window.getSelection().toString()
    firstNum = Number(selectedText.replace(/[^\d.]/g, ''))
    console.log('first number: ', firstNum)
    if (firstNum) renderMenu(event.clientX, event.clientY)
  }
}

function renderMenu (x, y) {
  let menu = document.createElement('div')
  menu.id = 'extension-menu-wrapper'
  menu.style.cssText = menuStyle(x, y + window.pageYOffset)
  for (let b of buttonList) {
    let btn = document.createElement('div')
    btn.id = b.id
    btn.innerText = b.symbol
    btn.style.cssText = operatorStyle
    btn.onclick = function(e) { 
      console.log('selected operator: ', this.id)
      operator = this.id
      removeMenu()
      e.stopPropagation()
    }
    menu.appendChild(btn)
  }
  document.body.appendChild(menu)
}

function doMath () {
  let secondNum = Number(window.getSelection().toString().replace(/[^\d.]/g, ''))
  if (secondNum && operator) {
    switch (operator) {
      case 'plus':
        alert(`${firstNum} + ${secondNum} = ${firstNum + secondNum}`)
        break
      case 'minus':
        alert(`${firstNum} - ${secondNum} = ${firstNum - secondNum}`)
        break
      case 'multiply':
        alert(`${firstNum} * ${secondNum} = ${firstNum * secondNum}`)
        break
      case 'dividen':
        alert(`${firstNum} / ${secondNum} = ${firstNum / secondNum}`)
        break
    }
  }
  firstNum = null
  operator = null
  secondNum = null
}


function removeMenu () {
  let menu = document.querySelector('#extension-menu-wrapper')
  if (menu) menu.remove()
}