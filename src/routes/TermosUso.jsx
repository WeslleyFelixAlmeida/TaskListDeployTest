import { Link } from "react-router-dom";

import styles from "./TermosUso.module.css";

export default function TermosDeUso() {
  return (
    <div id={styles.containerCentral}>
      <Link to={"/Cadastro"} id={styles.linkInicio}>
        Voltar
      </Link>
      <h1>Termos de uso:</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
        beatae ullam! Inventore, quia? Fugit ut at blanditiis in cumque officia
        ipsam odio quisquam neque odit. Velit perferendis rem qui, error
        excepturi debitis eum nisi? Aspernatur cum quisquam sed voluptate fuga
        expedita ullam eos et veniam excepturi similique harum rerum quos nobis
        repudiandae assumenda illum molestias, non odio quia ad eveniet. Porro
        magni eaque quis dignissimos labore voluptate mollitia veritatis alias
        accusantium nisi reprehenderit deserunt perferendis praesentium delectus
        itaque odit quod aliquid consectetur, quisquam perspiciatis libero?
        Exercitationem, cumque, rerum minus quibusdam deleniti eius debitis,
        laboriosam voluptate perspiciatis labore corrupti numquam laborum!
      </p>
    </div>
  );
}
