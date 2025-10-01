import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./CriarTarefa.module.css";
import InputWithText from "../components/InputWithText";
import Labels from "../components/Labels";
import Mensagem from "../components/Mensagem";
import Islogged from "../components/Islogged";

export default function CriarTarefa() {
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
          top: "105px",
          left: "100px"
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
          top: "105px",
          left: "100px"
        },
      });
    }
  };

  const [criarTarefaForm, setCriarTarefaForm] = useState({
    titulo: "",
    dataInicioTarefa: "",
    dataFimTarefa: "",
    descricao: "",
  });

  const alterarDados = (e) => {
    setCriarTarefaForm({
      ...criarTarefaForm,
      [e.target.name]: e.target.value,
    });
  };

  const criarTarefa = (e) => {
    e.preventDefault();

    fetch("http://localhost:5050/Tarefas/CriarTarefa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(criarTarefaForm),
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => {
        if (data) {
          mostrarMensagem("Tarefa criada com sucesso!", "success");

          setCriarTarefaForm({
            titulo: "",
            dataInicioTarefa: "",
            dataFimTarefa: "",
            descricao: "",
            value: "",
          });

          return;
        }
        mostrarMensagem("Algo deu errado, tente novamente.", "alert");
      })
      .catch((err) => mostrarMensagem("Erro ao criar tarefa", "error"));
  };

  return (
    <div id={styles.criarTarefaContainer}>
      <Islogged />

      <Link to={"/ListaTarefas"} id={styles.linkInicio}>
        Voltar
      </Link>

      <Mensagem
        atributes={mensagem.atributes}
        estilos={mensagem.styles}
        setMessageVisibility={setMensagem}
        message={mensagem}
      />

      <h1>Crie sua tarefa:</h1>
      <form id={styles.taskForm} onSubmit={criarTarefa}>
        <Labels text={"Informe um título para a tarefa:"} element={"titulo"} />
        <InputWithText
          id={"titulo"}
          name={"titulo"}
          type={"text"}
          placeholder={"Insira o título"}
          preencherDados={alterarDados}
          value={criarTarefaForm.titulo || ""}
        />

        <Labels
          text={"Informe a data de início e fim"}
          element={"containerDatas"}
        />
        <div id={styles.containerDatas}>
          <div id={styles.containerDataInicio}>
            <Labels text={"Início:"} element={"dataInicioTarefa"} />
            <InputWithText
              id={"dataInicioTarefa"}
              name={"dataInicioTarefa"}
              type={"date"}
              min={"1000-01-02"}
              max={"9999-12-31"}
              placeholder={"Insira a data de início"}
              preencherDados={alterarDados}
              value={criarTarefaForm.dataInicioTarefa}
            />
          </div>
          <div id={styles.containerDataFim}>
            <Labels text={"Fim:"} element={"dataFinalizacaoTarefa"} />
            <InputWithText
              id={"dataFimTarefa"}
              name={"dataFimTarefa"}
              type={"date"}
              min={"1000-01-02"}
              max={"9999-12-31"}
              placeholder={"Insira a data de finalização"}
              preencherDados={alterarDados}
              value={criarTarefaForm.dataFimTarefa}
            />
          </div>
        </div>

        <Labels text={"Informe a descrição da tarefa:"} element={"descricao"} />

        <textarea
          name="descricao"
          id="descricao"
          value={criarTarefaForm.descricao}
          onChange={alterarDados}
          maxLength={900}
          placeholder="Informe a descrição"
          className={styles.descricaoArea}
          required
        ></textarea>

        <input className={styles.buttons} type="submit" value="Criar tarefa" />
      </form>
    </div>
  );
}
