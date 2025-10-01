import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../assets/imgs/Icones/icone_principal.png";
import icone_perfil from "../assets/imgs/Icones/icone_perfil.png";
import { useEffect, useState } from "react";

export default function NavBar() {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const logout = () => {
    fetch("http://localhost:5050/User/Logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => {
        navigate("/Login");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fecharOpcoes();
  }, [location]);

  let linkAtual = "";
  let estaLogado = true;

  let [verificarIconePerfilAtivo, setVerificarIconePerfilAtivo] =
    useState(false);

  const [iconesPerfil, setIconesPerfil] = useState({
    height: "fit-content",
    marginTop: "0px",
    width: "65px",
    backgroundColor: "transparent",
  });

  const [perfilLinksInternos, setPerfilLinksInternos] = useState({
    display: "none",
  });

  const apresentarIconesPerfil = () => {
    if (verificarIconePerfilAtivo) {
      fecharOpcoes();
      return;
    }

    setIconesPerfil({
      height: "150px",
      marginTop: "107px",
      width: "100px",
      backgroundColor: "white",
    });
    apresentarOpcoesInternasIconesPerfil();
    setVerificarIconePerfilAtivo(true);
  };

  const apresentarOpcoesInternasIconesPerfil = () => {
    setPerfilLinksInternos({
      display: "flex",
    });
  };

  const fecharOpcoes = () => {
    setIconesPerfil({
      height: "fit-content",
      marginTop: "0px",
      width: "65px",
      backgroundColor: "transparent",
    });

    setPerfilLinksInternos({
      display: "none",
    });

    setVerificarIconePerfilAtivo(false);
  };

  switch (location.pathname) {
    case "/Cadastro":
      linkAtual = "/Login";
      break;
    case "/Login":
      linkAtual = "/";
      break;
    case "/":
      linkAtual = "/";
      break;
    case "/TermosUso":
      linkAtual = "/Cadastro";
      break;
    case "/Perfil":
      linkAtual = "/ListaTarefas";
      break;
    case "/CriarTarefa":
      linkAtual = "/ListaTarefas";
      break;
    case `/TarefaDetalhes/${params.id}`:
      linkAtual = "/ListaTarefas";
      break;
    default:
      linkAtual = `${location.pathname}`;
      break;
  }

  return (
    <nav>
      {(location.pathname === "/Login" ||
        location.pathname === "/" ||
        location.pathname === "/ListaTarefas") && (
        <div className={styles.icon_container}>
          <img src={logo} alt="logo" id={styles.logo} />
        </div>
      )}

      {location.pathname !== "/Login" &&
        location.pathname !== "/" &&
        location.pathname !== "/ListaTarefas" && (
          <Link to={linkAtual} id={styles.linkVoltarLogo}>
            <div className={styles.icon_container}>
              <img src={logo} alt="logo" id={styles.logo} />
            </div>
          </Link>
        )}

      {estaLogado &&
        (location.pathname === "/Perfil" ||
          location.pathname === "/ListaTarefas" ||
          location.pathname === `/TarefaDetalhes/${params.id}`) && (
          <div id={styles.iconePerfilContainer} style={iconesPerfil}>
            <div
              id={styles.perfilImgContainer}
              onClick={apresentarIconesPerfil}
            >
              <img src={icone_perfil} alt="icone perfil" />
            </div>
            <div id={styles.perfilLinksInternos} style={perfilLinksInternos}>
              {location.pathname !== "/Perfil" && (
                <Link to={"/Perfil"}>Perfil</Link>
              )}
              <input type="button" onClick={logout} value={"Sair"} />
            </div>
          </div>
        )}
    </nav>
  );
}
