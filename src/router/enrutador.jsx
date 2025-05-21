/* El enrutador es un arreglo de objetos */
/* El objeto se construye con el componente y la ruta */
import Home from "../pages/Home";
import Login from "../pages/Login";
import RutaProtegida from "../components/RutaProtegida";
import Register from "../pages/Register";
export let enrutador = [
  {
    path: '/home',
    element: <RutaProtegida proteger={<Home />} />
  },
  {
    path: '/',
    element: <Login />
  },
  {
    path:"/register",
    element:<Register/>
  }
]
