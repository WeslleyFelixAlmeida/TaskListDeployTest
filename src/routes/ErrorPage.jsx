import { Link } from "react-router-dom";

import styles from "./ErrorPage.module.css";
import logo from "../assets/imgs/Icones/icone_principal.png";

export default function ErrorPage() {
  return (
    <div id={styles.ErroPageDiv}>
        <div className={styles.icon_container}>
          <img src={logo} alt="logo" id={styles.logo} />
        </div>
      <p>Erro, página não encontrada.</p>
      <Link to={"/Login"}>
        <p>Clique aqui para voltar ao ínicio.</p>
      </Link>
    </div>
  );
}
