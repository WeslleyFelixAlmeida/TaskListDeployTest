import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, Router, RouterProvider} from 'react-router-dom';
import Home from './routes/home.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import TarefaDetalhes from './routes/TarefaDetalhes.jsx';
import Login from './routes/Login.jsx';
import Cadastro from './routes/Cadastro.jsx';
import TermosUso from './routes/TermosUso.jsx';
import ListaTarefa from './routes/ListaTarefas.jsx';
import Perfil from './routes/Perfil.jsx';
import CriarTarefa from './routes/CriarTarefa.jsx';

const route = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children:[
      {
        path: '/',
        element: <Login/>,
      },
      {
        path: '/ListaTarefas',
        element: <ListaTarefa/>
      },
      {
        path: '/Perfil',
        element: <Perfil/>
      },
      {
        path: '/TarefaDetalhes/:id',
        element: <TarefaDetalhes/>
      },
      {
        path: '/Login',
        element: <Login/>
      },
      {
        path: '/TermosUso',
        element: <TermosUso/>
      },
      {
        path: '/Cadastro',
        element: <Cadastro/>
      },
      {
        path: '/CriarTarefa',
        element: <CriarTarefa/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route}/>
  </StrictMode>,
)
