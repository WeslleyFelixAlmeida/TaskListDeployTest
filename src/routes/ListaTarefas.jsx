import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import styles from "./ListaTarefas.module.css";
import Tarefa from "./../components/Tarefa";
import Labels from "../components/Labels";
import Islogged from "../components/Islogged";
import Mensagem from "../components/Mensagem";
import Filtro from "../components/Filtro";

export default function ListaTarefa() {
  const [tarefas, setTarefas] = useState([]);
  const [backupTarefas, setBackupTarefas] = useState({});

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [filtroVisibilidade, setFiltroVisibilidade] = useState({
    display: "none",
  });

  const [filtroExplicacao, setFiltroExplicacao] = useState({
    display: "none",
  });

  const mostrarExplicacaoFiltro = () => {
    document.body.style.overflow = "hidden"; // bloqueia scroll
    window.scrollTo(0, 0);//Mover tela para o início
    setFiltroExplicacao({
      display: "block",
    });
  };

  const removerExplicacaoFiltro = () => {
    document.body.style.overflow = "auto"; // libera scroll
    setFiltroExplicacao({
      display: "none",
    });
  };

  const [botoesFiltro, setBotoesFiltro] = useState({
    botaoAplicar: {
      display: "block",
    },
    botaoRemover: {
      display: "none",
    },
  });

  const removerFiltro = () => {
    setTarefas(backupTarefas);

    setBotoesFiltro({
      botaoAplicar: {
        display: "block",
      },
      botaoRemover: {
        display: "none",
      },
    });
    mostrarMensagem("Filtro removido!", "alert");
  };

  const mostrarFiltro = () => {
    document.body.style.overflow = "hidden"; // bloqueia scroll
    window.scrollTo(0, 0);//Mover tela para o início

    setFiltroVisibilidade({
      display: "flex",
    });
  };

  const [mensagem, setMensagem] = useState({
    atributes: {
      message: "",
      type: "",
    },

    styles: {
      display: "",
      minWidth: "",
      width: "",
      maxWidth: "",
      height: "",
    },
  });

  const mostrarMensagem = (message, type) => {
    setMensagem({
      atributes: {
        message: message,
        type: type,
      },
      styles: {
        display: "flex",
        minWidth: "335px",
        width: "30%",
        maxWidth: "430px",
        height: "35px",
        top: screen.width > 357 ? "335px" : "365px",
        left: "50%",
        transform: "translate(-50%, 0px)",
      },
    });
  };

  useEffect(() => {
    const taskDeleted = searchParams.get("taskDeleted");

    if (taskDeleted) {
      mostrarMensagem("Tarefa deletada com sucesso!", "success");

      searchParams.delete("taskDeleted");

      navigate("/ListaTarefas", { replace: true });
    }
  }, [searchParams]);

  useEffect(() => {
    fetch("http://localhost:5050/Tarefas/PuxarDadosTarefas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setTarefas(data);
        setBackupTarefas(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div id={styles.mainContainer}>
      <Islogged />

      <Mensagem
        atributes={mensagem.atributes}
        estilos={mensagem.styles}
        setMessageVisibility={setMensagem}
        message={mensagem}
      />

      <Filtro
        setVisibilidadeJanelaFiltro={setFiltroVisibilidade}
        visibilidade={filtroVisibilidade}
        tarefas={tarefas}
        setTarefas={setTarefas}
        mensagem={mostrarMensagem}
        setBotoesFiltro={setBotoesFiltro}
      />
      <div
        style={filtroExplicacao}
        id="containerFiltroExplicacao"
        className={styles.containerFiltroExplicacao}
      >
        <input
          type="button"
          value="Voltar"
          className={styles.BotoesLista}
          id={styles.botaoExplicacaoVoltar}
          onClick={removerExplicacaoFiltro}
        />
        <div id={styles.containerStatusLinha}>
          <div className={styles.statusLinha}>
            <div className={styles.statusLinhaInterna}>
              <div
                id={styles.finalizado}
                className={styles.statusPadroes}
              ></div>
              <h2>Finalizado:</h2>
            </div>
            <p>
              Quando o usuário altera o status para finalizado dentro da tela de
              uma tarefa em específico para finalizado.
            </p>
          </div>
          <div className={styles.statusLinha}>
            <div className={styles.statusLinhaInterna}>
              <div
                id={styles.quaseFinalizado}
                className={styles.statusPadroes}
              ></div>
              <h2>Tempo de expiração próximo:</h2>
            </div>
            <p>Significa que a tarefa está à 3 dias da expiração.</p>
          </div>
          <div className={styles.statusLinha}>
            <div className={styles.statusLinhaInterna}>
              <div id={styles.expirado} className={styles.statusPadroes}></div>
              <h2>Expirado:</h2>
            </div>
            <p>Quando a tarefa expirou sem que o usuário alterasse o status.</p>
          </div>
          <div className={styles.statusLinha}>
            <div className={styles.statusLinhaInterna}>
              <div id={styles.aberto} className={styles.statusPadroes}></div>
              <h2>Em aberto:</h2>
            </div>
            <p>
              Quando a tarefa está com o tempo de realização dentro do prazo
              estabelecido na criação.
            </p>
          </div>
        </div>
      </div>
      <div id={styles.topMain}>
        <h1>Tarefas:</h1>
        <div id={styles.listaStatus}>
          <h2 className={styles.containerStatusExplicacao}>
            Status possíveis:
          </h2>
          <div className={styles.linhasStatus}>
            <Labels text={"Finalizado"} element={"finalizado"} />
            <div id={styles.finalizado} className={styles.statusPadroes}></div>
          </div>

          <div className={styles.linhasStatus}>
            <Labels
              text={"Tempo de expiração próximo"}
              element={"quaseFinalizado"}
            />
            <div
              id={styles.quaseFinalizado}
              className={styles.statusPadroes}
            ></div>
          </div>

          <div className={styles.linhasStatus}>
            <Labels text={"Expirado"} element={"expirado"} />
            <div id={styles.expirado} className={styles.statusPadroes}></div>
          </div>

          <div className={styles.linhasStatus}>
            <Labels text={"Em aberto"} element={"aberto"} />
            <div id={styles.aberto} className={styles.statusPadroes}></div>
          </div>
          <div id={styles.containerDuvidasFuncionamento}>
            <p>Dúvidas sobre os status?</p>
            <Link onClick={mostrarExplicacaoFiltro}>
              Clique aqui para mais informações.
            </Link>
          </div>
        </div>
      </div>

      <div id={styles.containerBotoesLista}>
        <Link className={styles.BotoesLista} to={"/CriarTarefa"}>
          Criar tarefa
        </Link>
        <input
          type="button"
          value="Remover filtro"
          className={styles.BotoesLista}
          onClick={removerFiltro}
          style={botoesFiltro.botaoRemover}
        />
        <input
          type="button"
          value="Filtrar"
          className={styles.BotoesLista}
          onClick={mostrarFiltro}
          style={botoesFiltro.botaoAplicar}
        />
      </div>

      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            <Tarefa
              titulo={tarefa.titulo}
              dataFim={tarefa.dataFimTarefaFormatada}
              dataInicio={tarefa.dataInicioTarefaFormatada}
              descTarefa={tarefa.descTarefa}
              status={tarefa.statusID}
              linkTarefa={`./../TarefaDetalhes/${tarefa.id}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
