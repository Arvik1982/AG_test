import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store/indexStore.tsx'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import "@fontsource/roboto"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
   </Provider>
   </BrowserRouter>
  </React.StrictMode>,
)
