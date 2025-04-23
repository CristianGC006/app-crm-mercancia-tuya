import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  alertaGenerica,
  alertaRedireccion,
  generarToken,
} from "../helpers/funciones";
import "./Login.css";
let urlUsuarios = "https://back-json-server-tuya-14tp.onrender.com/usuarios";

function Login() {
  const [getName, setName] = useState("");
  const [getPassword, setPasword] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  let redireccion = useNavigate();

  function getUsuarios() {
    fetch(urlUsuarios)
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getUsuarios();
  }, []);

  function buscarUsuario() {
    let user = usuarios.find(
      (item) => getName == item.user && getPassword == item.password
    );
    return user;
  }
  function iniciarSesion() {
    if (buscarUsuario()) {
      let tokenAcceso = generarToken();
      localStorage.setItem("token", tokenAcceso);
      alertaRedireccion(
        redireccion,
        "Bienvenido",
        "Será redireccionado al home",
        "success",
        "/home"
      );
    } else {
      alertaGenerica("Error", "Usuario y/o contraseña incorrecto", "error");
    }
  }

  return (
    <form className="form">
      Sign Up
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="input"
        placeholder="Name"
      />
      <input
        onChange={(e) => setPasword(e.target.value)}
        type="text"
        className="input"
        placeholder="Password"
      />
      <button onClick={iniciarSesion} type="button">
        Submit
      </button>
    </form>
  );
}

export default Login;
