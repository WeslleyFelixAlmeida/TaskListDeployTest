import { Link } from "react-router-dom";
import styles from "./Tarefa.module.css";
import iconeFinalizado from "./../assets/imgs/Icones/verificado.png";
import iconeExpirada from "./../assets/imgs/Icones/expirou.png";

export default function Tarefa({
  dataInicio,
  dataFim,
  status,
  titulo,
  linkTarefa,
}) {
  let styleData = {
    backgroundColor: "",
  };

  let styleIcone = {
    width: "",
    margin: "",
  };

  let icone = "";

  switch (status) {
    case 1:
      styleData.backgroundColor = "lightblue";
      break;
    case 2:
      styleData.backgroundColor = "lightgreen";
      icone = iconeFinalizado;
      break;
    case 3:
      styleData.backgroundColor = "rgb(235, 110, 110)";
      styleIcone.width = "65px";
      styleIcone.margin = "0px 5px 0px 12px";

      icone = iconeExpirada;
      break;
    case 4:
      styleData.backgroundColor = "yellow";
      break;
  }

  return (
    <div className={styles.tarefa}>
      <div className={`${styles.data}`}>
        <div className={styles.dataLinha} style={styleData}>
          <p>Início:</p>
          {dataInicio}
        </div>
        <div className={styles.dataLinha} style={styleData}>
          <p>Fim:</p>
          {dataFim}
        </div>
      </div>
      <div className={styles.statusTarefa}>
        {icone && <img src={icone} alt="status" style={styleIcone} />}
      </div>
      <Link to={linkTarefa} className={styles.linksTarefa}>
        <div className={styles.textoTarefa}>{titulo}</div>
      </Link>
    </div>
  );
}
