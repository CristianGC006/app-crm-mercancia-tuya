import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { alertaGenerica } from "../helpers/funciones";
let urlDelivery = "https://backjsonservertuya.onrender.com/envios";
const DeliveyList = () => {

const[getDelivery, setDelivery]=("")
let userLogged=JSON.parse(localStorage.getItem("user"))
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
    let filtro
    let delivery = delivery.filter(  
      (item) => item.idUser ==userLogged.id
    );
    return filtro;
  }
  

  return <div>Soy la mera Verga</div>;
};
export default DeliveyList;
