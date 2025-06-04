import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";
import { alertaGenerica, alertaRedireccion } from "../helpers/funciones";
let urlDelivery = "https://backjsonservertuya.onrender.com/envios";
const DeliveryEdit = () => {
  const [getName, setName] = useState("");
  const [getOrigin, setOrigin] = useState("");
  const [getDestination, setDestination] = useState("");
  const [getDate, setDate] = useState("");
  const [getStatus, setStatus] = useState("");
  let redireccion = useNavigate();
  let { id } = useParams();

  

  function getDeliveryById() {
    fetch(`${urlDelivery}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setOrigin(data.origin);
        setDestination(data.destination);
        setDate(data.date);
        setStatus(data.status);
      })
      .catch((error) => {
        alertaGenerica(
          "Error",
          error.message + "No se pudo obtener el pedido",
          "error"
        );
      });
  }

  useEffect(() => {
    getDeliveryById();
  }, []);

  function updateDelivery() {
    let newDelivery = {
      name: getName,
      origin: getOrigin,
      destination: getDestination,
      date: getDate,
      status: getStatus,
    };
    fetch(urlDelivery + "/" + id, {
      method: "PATCH",
      body: JSON.stringify(newDelivery),
    })
      .then(() => {
        alertaRedireccion(
          redireccion,
          "Bienvenido",
          "Pedido actualizado Exitosamente",
          "success",
          "/home/"
        );
      })
      .catch(() => {
        alertaGenerica("Error", "No se pudo actualizar el pedido", "error");
      });
  }
  return (
    <form className="form">
      Editar
      <input
        value={getName}
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="input"
        placeholder="nombre del articulo"
      />
      <input
        value={getOrigin}
        onChange={(e) => setOrigin(e.target.value)}
        type="text"
        className="input"
        placeholder="Origen"
      />
      <input
        value={getDestination}
        onChange={(e) => setDestination(e.target.value)}
        type="text"
        className="input"
        placeholder="Destino"
      />
      <input
        value={getDate}
        onChange={(e) => setDate(e.target.value)}
        type="date"
        className="input"
        placeholder="Fecha"
      />
      <select
        value={getStatus}
        name=""
        id=""
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Seleccione</option>
        <option value="Pendiente">Pendiente</option>
        <option value="Enviado">Enviado</option>
        <option value="Recibido">Recibido</option>
        <option value="Cancelado">Cancelado</option>
      </select>
      <button onClick={updateDelivery} type="button">
        Actualizar un envio
      </button>
      <Link to={"/"}>Cancelar</Link>
    </form>
  );
};
export default DeliveryEdit;
