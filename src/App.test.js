import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'mobx-react'
import BoardModel from './stores/BoardModel'

let boardModel
beforeEach(() => {
  boardModel = new BoardModel()
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider boardStore={boardModel}>
      <App />
    </Provider>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
