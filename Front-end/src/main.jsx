import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'


import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.jsx'
import store from './Store/store.js'

createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </>,
)
