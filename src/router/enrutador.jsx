/* El enrutador es un arreglo de objetos */
/* El objeto se construye con el componente y la ruta */
import Home from "../pages/Home";
import Login from "../pages/Login";
import RutaProtegida from "../components/RutaProtegida";
import Register from "../pages/Register";
import CreateDelivery from "../pages/CreateDelivery";
import DeliveyList from "../pages/DeliveryList";
export let enrutador = [
  {
    path: '/home/',
    element: <RutaProtegida proteger={<Home />} />,
    children:[
      {
        path:"crear-envio",
        element:<CreateDelivery/>
      },{
        path:"listar-envio",
        element:<DeliveyList/>
      }
    ]
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
