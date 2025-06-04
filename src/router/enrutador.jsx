/* El enrutador es un arreglo de objetos */
/* El objeto se construye con el componente y la ruta */
import Home from "../pages/Home";
import Login from "../pages/Login";
import RutaProtegida from "../components/RutaProtegida";
import Register from "../pages/Register";
import CreateDelivery from "../pages/CreateDelivery";
import DeliveyList from "../pages/DeliveryList";
import DeliveryEdit from "../pages/DeliveryEdit";
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
      },{
        path:"editar-envio/:id",
        element:<DeliveryEdit/>
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
