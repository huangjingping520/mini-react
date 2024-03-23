// v1
// const dom = document.createElement('div')
// dom.id = 'app'

// document.querySelector('#root').append(dom)

// const textNode = document.createTextNode('')
// textNode.nodeValue = 'app'
// dom.append(textNode)

// v2
// const textEl = {
//   type: 'TEXT_ELEMENT',
//   props: {
//     nodeValue: 'app',
//     children: []
//   }
// }

// const el = {
//   type: 'div',
//   props: {
//     id: 'app',
//     children: [textEl]
//   }
// }

// const dom = document.createElement(App.type)
// dom.id = App.props.id
// document.querySelector('#root').append(dom)

// const textNode = document.createTextNode('')
// textNode.nodeValue = textEl.props.nodeValue
// dom.append(textNode)

// render(App, document.querySelector('#root'))

// const App = createElement('div', { id: 'app' }, textEl)


import ReactDOM from './core/ReactDom.js'
import App from './App.js'

ReactDOM.createRoot(document.querySelector('#root')).render(App)

