/* El enrutador es un arreglo de objetos */
/* El objeto se construye con el componente y la ruta */
import Home from "../pages/Home";
import Login from "../pages/Login";
import RouterProtected from "../components/RouterProtected";
export let enrutador = [
  {
    path: '/home',
    element: <RouterProtected proteger={<Home/>} />
  },
  {
    path: '/',
    element: <Login />
  }
]
