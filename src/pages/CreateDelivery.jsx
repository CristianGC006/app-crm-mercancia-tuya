import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";
import { alertaGenerica, alertaRedireccion } from "../helpers/funciones";
let urlDelivery = "https://backjsonservertuya.onrender.com/envios";
const CreateDelivery = () => {
    
        const [getName, setName] = useState("");
        const [getOrigin, setOrigin] = useState("");
        const [getDestination, setDestination] = useState("");
        const [getDate, setDate] = useState("");
        const [getStatus, setStatus] = useState("");
        let redireccion = useNavigate();


        function registerDelivery() {
            let userLogged = JSON.parse(localStorage.getItem("usuario"))
            let newDelivery = {
                name: getName,
                origin: getOrigin,
                destination: getDestination,
                date: getDate,
                status: getStatus,
                idUser: userLogged.id
            };
            fetch(urlDelivery, {
                method: "POST",
                body: JSON.stringify(newDelivery),
            }).then(() => {
                alertaRedireccion(
                    redireccion,
                    "Bienvenido",
                    "Usuario Registrado Exitosamenente",
                    "success",
                    "/home/"
                );
            }).catch(() => {
                alertaGenerica(
                    "Error",
                    "Este usuario ya se encuentra registrado",
                    "error"
                );
            })
        }

        return (
            <form className="form">
                Sign in
                <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="input"
                    placeholder="nombre del articulo"
                />
                <input
                    onChange={(e) => setOrigin(e.target.value)}
                    type="text"
                    className="input"
                    placeholder="Origen"
                />
                <input
                    onChange={(e) => setDestination(e.target.value)}
                    type="text"
                    className="input"
                    placeholder="Destino"
                />
                <input
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    className="input"
                    placeholder="Fecha"
                />
                <select name="" id="" onChange={(e)=>setStatus(e.target.value)}>
                    <option value="">Seleccione</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Recibido">Recibido</option>
                    <option value="Cancelado">Cancelado</option>
                </select>
                   
                <button onClick={registerDelivery} type="button">
                    Registrar un envio
                </button>
                <Link to={"/"}>Cancelar</Link>
            </form>
        );
};
export default CreateDelivery;
