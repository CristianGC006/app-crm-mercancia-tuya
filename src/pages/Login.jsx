import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  alertaGenerica,
  alertaRedireccion,
  generarToken,
} from "../helpers/funciones";
import "./Login.css";
function Login() {
  const [getName, setName] = useState("");
  const [getPassword, setPasword] = useState("");
  let redireccion = useNavigate();

  function iniciarSesion(user, password) {
    if (user === "admin" && password === "admin") {
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
      <button onClick={() => iniciarSesion(getName, getPassword)} type="button">
        Submit
      </button>
    </form>
  );
}

export default Login;
