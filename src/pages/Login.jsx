import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  alertaGenerica,
  alertaRedireccion,
  generarToken,
} from "../helpers/funciones";
import "./Login.css";
let urlUsuarios = "https://backjsonservertuya.onrender.com/users";

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
      localStorage.setItem("usuario", JSON.stringify(buscarUsuario()));
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
        placeholder="Tu Usuario"
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
      <Link to={"/register"}>No tienes cuenta ?</Link>
    </form>
  );
}

export default Login;
