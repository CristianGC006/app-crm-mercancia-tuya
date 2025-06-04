import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { alertaGenerica } from "../helpers/funciones";

let urlDelivery = "https://backjsonservertuya.onrender.com/envios";

const DeliveryList = () => {
  const [getDelivery, setDelivery] = useState([]);

  function getDeliveries() {
    fetch(urlDelivery)
      .then((response) => response.json())
      .then((data) => setDelivery(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getDeliveries();
  }, []);

  function filterDelivery() {
    let userLogged = JSON.parse(localStorage.getItem("usuario"));
    
    // Validar si el usuario existe
    if (!userLogged || !userLogged.id) {
      return [];
    }

    let filter = getDelivery.filter((item) => item.idUser == userLogged.id);
    return filter;
  }

  let userFilter = filterDelivery();

  function deleteDelivery(id) {
    // Validar que el ID existe
    if (!id) {
      alertaGenerica(
        "El ID del envio no es válido",
        "Error al eliminar el envio",
        "error"
      );
      return;
    }

    fetch(`${urlDelivery}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        alertaGenerica(
          "El envio ha sido eliminado con éxito",
          "Envio eliminado correctamente",
          "success"
        );
        getDeliveries();
      })
      .catch((error) => {
        console.error("Error al eliminar:", error);
        alertaGenerica(
          "Error al eliminar el envio",
          error.message+
          "Error al eliminar el envio",
          "error"
          
        );
      });
  }

  return (
    <div className="cards">
      {userFilter.length > 0 ? (
        userFilter.map((item) => (
          <div className="card" key={item.id}>
            <h3 className="card__title">id del Envio: {item.id}</h3>
            <p className="card__text">Descripcion: {item.descripcion}</p>
            <p className="card__text">Fecha: {item.fecha}</p>
            <p className="card__text">Origen: {item.origen}</p>
            <p className="card__text">Destino: {item.destino}</p>
            <p className="card__text">Estado: {item.estado}</p>
            <div className="card__buttons">
              <button
                className="card__button"
                onClick={() => deleteDelivery(item.id)}
              >
                Eliminar
              </button>
              <Link className="card__button" to={`/home/editar-envio/${item.id}`}>Editar</Link>
            </div>
          </div>
        ))
      ) : (
        <h2>No hay envios registrados</h2>
      )}
    </div>
  );
};

export default DeliveryList;
