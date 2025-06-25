import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { alertaGenerica, alertaRedireccion } from "../helpers/funciones";
import "./Login.css";
let urlUsuarios = "https://backjsonservertuya.onrender.com/users";
import { Link } from "react-router-dom";
const Register = () => {
  const [getName, setName] = useState("");
  const [getPassword, setPasword] = useState("");
  const [getUser, setUser]=useState("")
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
      (item) => getUser == item.user);
    return user;
  }

  function registerUser() {
    if (!buscarUsuario()) {
        let newUser={
            name:getName,
            user:getUser,
            password:getPassword
        }
        fetch(urlUsuarios,{
            "method":"POST",
            "body":JSON.stringify(newUser)
        }).then(()=>{
            getUsuarios()
        })
         alertaRedireccion(
        redireccion,
        "Bienvenido",
        "Usuario Registrado Exitosamenente",
        "success",
        "/"
      );
    } else {
      
      alertaGenerica("Error", "Este usuario ya se encuentra registrado", "error");
     
    }
  }

  return (
    <form className="form">
      Sign in
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="input"
        placeholder="nombre"
      />
      <input
        onChange={(e) => setUser(e.target.value)}
        type="text"
        className="input"
        placeholder="Tu usuario"
      />
      <input
        onChange={(e) => setPasword(e.target.value)}
        type="password"
        className="input"
        placeholder="Password"
      />
      <button onClick={registerUser} type="button">
        Registrarse
      </button>
      <Link to={"/"}>¿Ya tienes una cuneta ?</Link>
    </form>
    
  );
};
export default Register;
