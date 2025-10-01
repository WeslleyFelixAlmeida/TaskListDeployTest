import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import styles from "./TarefaDetalhes.module.css";
import Labels from "./../components/Labels";
import Islogged from "../components/Islogged";
import FormUpdate from "../components/FormUpdate";
import Mensagem from "../components/Mensagem";
import QuestionBox from "../components/QuestionBox";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

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
    if (window.innerWidth <= 800) {
      setMensagem({
        atributes: {
          message: message,
          type: type,
        },
        styles: {
          display: "flex",
          minWidth: "",
          width: "230px",
          maxWidth: "",
          height: "40px",
          left: "80px",
        },
      });
    } else {
      setMensagem({
        atributes: {
          message: message,
          type: type,
        },
        styles: {
          display: "flex",
          minWidth: "225px",
          width: "30%",
          maxWidth: "430px",
          height: "35px",
          left: "80px",
        },
      });
    }
  };

  const [updateForms, setUpdateForms] = useState({
    display: "",
  });

  const alterarDadosForm = () => {
    setUpdateForms({
      display: "flex",
    });
  };

  const [statusPropriedades, setStatusPropriedades] = useState({
    backgroundColor: {
      backgroundColor: "",
    },
    cor: {
      color: "",
    },
    text: "",
  });

  const verificarEstado = (statusID) => {
    let statusCorFundo = "";
    let statusTexto = "";
    let statusCorTexto = "";

    switch (statusID) {
      case 1:
        statusCorFundo = "lightblue";
        statusTexto = "Em aberto";
        statusCorTexto = "rgb(61 131 223)";
        break;
      case 2:
        statusCorFundo = "lightgreen";
        statusTexto = "Finalizado";
        statusCorTexto = "#00b300";
        break;
      case 3:
        statusCorFundo = "rgb(235, 110, 110)";
        statusTexto = "Expirado";
        statusCorTexto = "rgb(235, 110, 110)";
        break;
      case 4:
        statusCorFundo = "yellow";
        statusTexto = "Próximo de finalizar";
        statusCorTexto = "#b1b100";
        break;
    }

    setStatusPropriedades({
      backgroundColor: {
        backgroundColor: statusCorFundo,
      },
      cor: {
        color: statusCorTexto,
      },
      text: statusTexto,
    });
  };

  const [dadosTarefa, setDadosTarefa] = useState({
    dataFimTarefaFormatada: "",
    dataInicioTarefaFormatada: "",
    descricao: "",
    id: "",
    statusID: "",
    titulo: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5050/Tarefas/PuxarDadosTarefaEspecifica/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.err) {
          navigate("/ListaTarefas");
        }

        setDadosTarefa({
          dataFimTarefaFormatada: data.dataFimTarefaFormatada,
          dataInicioTarefaFormatada: data.dataInicioTarefaFormatada,
          descricao: data.descricao,
          id: data.id,
          statusID: data.statusID,
          titulo: data.titulo,
        });

        verificarEstado(data.statusID);
      })
      .catch((err) => console.log(err));
  }, []);

  const [question, setQuestion] = useState({
    styles: {
      display: "",
    },
  });

  const deletarTarefa = () => {
    setQuestion({
      styles: {
        display: "flex",
      },
    });
  };

  const [funcaoExecutar, setFuncaoExecutar] = useState(() => () => {
    fetch(`http://localhost:5050/Tarefas/Deletar/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.error) {
          throw new Error();
        }
        navigate("/ListaTarefas?taskDeleted=true");
      })
      .catch((err) => {
        mostrarMensagem("Erro ao deletar tarefa, tente novamente.", "error");
      });
  });

  const [containerAlterarStatus, setContainerAlterarStatus] = useState({
    display: "none",
  });

  const mostrarJanelaAlteracaoStatus = () => {
    setContainerAlterarStatus({
      display: "flex",
    });
  };

  const removerJanelaAlteracaoStatus = () => {
    setContainerAlterarStatus({
      display: "none",
    });
  };

  const alterarStatus = (e) => {
    let novoStatus = "";
    switch (e.target.id) {
      case "emAberto":
        novoStatus = 1;
        break;
      case "finalizado":
        novoStatus = 2;
        break;
      case "expirado":
        novoStatus = 3;
        break;
      case "expiracaoProximo":
        novoStatus = 4;
        break;
    }

    fetch(`http://localhost:5050/Tarefas/Status/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: novoStatus }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.err) {
          throw new Error();
        }
        removerJanelaAlteracaoStatus();
        mostrarMensagem("Status alterado com sucesso!", "success");
        verificarEstado(data.statusID);

        setDadosTarefa({
          ...dadosTarefa,
          statusID: data.statusID,
        });

      })
      .catch((err) => {
        mostrarMensagem("Erro ao alterar status, tente novamente!", "error");
      });
  };

  return (
    <div id={styles.tarefasDetalhesContainer}>
      <Islogged />

      <QuestionBox
        question={question}
        setQuestion={setQuestion}
        message={"Você tem certeza que deseja prosseguir?"}
        funcaoExecutar={funcaoExecutar}
      />

      <FormUpdate
        display={updateForms}
        setDisplay={setUpdateForms}
        message={mostrarMensagem}
        setInformacao={setDadosTarefa}
      />
      <Mensagem
        atributes={mensagem.atributes}
        estilos={mensagem.styles}
        setMessageVisibility={setMensagem}
        message={mensagem}
      />
      <Link to={".././ListaTarefas"} id={styles.linkInicio}>
        Voltar
      </Link>
      <h1 id={styles.titulo}>Tarefa: {dadosTarefa.titulo}</h1>
      <div id={styles.datasContainer}>
        <p>Data de início: {dadosTarefa.dataInicioTarefaFormatada}</p>
        <p>Data de finalização: {dadosTarefa.dataFimTarefaFormatada}</p>
      </div>
      <div className={styles.linhasStatus}>
        <div id={styles.statusAlterarCoitainer} style={containerAlterarStatus}>
          {dadosTarefa.statusID !== 1 && (
            <button
              onClick={alterarStatus}
              id="emAberto"
              className={styles.linhaAlterarStatus}
            >
              <div
                className={`${styles.alterarStatusTarefa} ${styles.emAberto}`}
              ></div>
              Em aberto
            </button>
          )}
          {dadosTarefa.statusID !== 2 && (
            <button
              onClick={alterarStatus}
              id="finalizado"
              className={styles.linhaAlterarStatus}
            >
              <div
                className={`${styles.alterarStatusTarefa} ${styles.finalizado}`}
              ></div>
              Finalizada
            </button>
          )}
          {dadosTarefa.statusID !== 3 && (
            <button
              onClick={alterarStatus}
              id="expirado"
              className={styles.linhaAlterarStatus}
            >
              <div
                className={`${styles.alterarStatusTarefa} ${styles.expirado}`}
              ></div>
              Expirada
            </button>
          )}
          {dadosTarefa.statusID !== 4 && (
            <button
              onClick={alterarStatus}
              id="expiracaoProximo"
              className={styles.linhaAlterarStatus}
            >
              <div
                className={`${styles.alterarStatusTarefa} ${styles.expiracaoProximo}`}
              ></div>
              Tempo de expiração próximo
            </button>
          )}
          <div id={styles.botoesStatusAlterar}>
            <input
              type="button"
              value="Cancelar"
              className={styles.Botoes}
              onClick={removerJanelaAlteracaoStatus}
            />
          </div>
        </div>
        <Labels
          text={statusPropriedades.text}
          element={"status"}
          color={statusPropriedades.cor}
        />
        <div
          id={styles.status}
          className={styles.statusPadroes}
          style={statusPropriedades.backgroundColor}
        ></div>
        <p>Status:</p>
      </div>
      <input
          type="button"
          value="Alterar status"
          className={styles.Botoes}
          onClick={mostrarJanelaAlteracaoStatus}
        />
      <div id={styles.botoesContainer}>
        <input
          id="editarTarefaButton"
          className={styles.Botoes}
          type="button"
          value="Editar tarefa"
          onClick={alterarDadosForm}
        />
        <input
          id={styles.deletarTarefaButton}
          type="button"
          value="🗑️ Deletar tarefa"
          onClick={deletarTarefa}
        />
      </div>
      <h2>Descrição da tarefa:</h2>
      <div id={styles.descricaoTarefa}>{dadosTarefa.descricao}</div>
    </div>
  );
}
