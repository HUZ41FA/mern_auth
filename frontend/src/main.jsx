import React from 'react'
import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterScreen from './screens/Register';
import store from './store';
import { Provider } from 'react-redux';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={ router } />
    </React.StrictMode>,
  </Provider>
  
)
