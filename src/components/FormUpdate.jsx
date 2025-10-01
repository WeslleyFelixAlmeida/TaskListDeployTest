import { useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./FormUpdate.module.css";
import InputWithText from "./InputWithText";
import Labels from "./Labels";
import QuestionBox from "./QuestionBox";
import Mensagem from "./Mensagem";

export default function FormUpdate({
  display,
  setDisplay,
  message,
  setInformacao,
}) {
  const { id } = useParams();

  const fecharForm = () => {
    setFormAlterarTitulo({});
    setFormAlterarDataFim({});
    setFormAlterarDesc({});
    setDisplay({
      display: "none",
    });
  };

  const [funcaoExecutar, setFuncaoExecutar] = useState(() => () => {});

  const alterarTitulo = () => {
    fetch(`http://localhost:5050/Tarefas/Titulo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formAlterarTitulo),
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => {
        fecharForm();
        if(data.error){
          throw new Error();
        }
        setInformacao((infos) => ({
          ...infos,
          titulo: data.tituloNovo,
        }));
        message("Título alterado com sucesso!",  "success");
      })
      .catch((err) => {
        message("Erro ao alterar título, tente novamente.", "error");
      });
  };

  const alterarDataFim = () => {
    fetch(`http://localhost:5050/Tarefas/DataFim/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formAlterarDataFim),
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => {
        fecharForm();
        if(data.error){
          throw new Error();
        }
        
        setInformacao((infos) => ({
          ...infos,
          dataFimTarefaFormatada: data.dataFimNova,
        }));
        message("Data final alterada com sucesso!",  "success");
      })
      .catch((err) => {
        message("Erro ao alterar a data final, tente novamente.", "error");
      });
  };

  const alterarDesc = () => {    
    fetch(`http://localhost:5050/Tarefas/Descricao/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formAlterarDesc),
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => {
        fecharForm();
        if(data.error){
          throw new Error();
        }
        setInformacao((infos) => ({
          ...infos,
          descricao: data.descNova,
        }));
        message("Descrição alterada com sucesso!", "success");
      })
      .catch((err) => {
        message("Erro ao alterar descrição, tente novamente.", "error");
      });
  };

  const [question, setQuestion] = useState({
    styles: {
      display: "",
    },
  });

  const alterarInformacao = (e) => {
    e.preventDefault();
    if (e.target.id === "alterarTituloForm") {
      setFuncaoExecutar(() => alterarTitulo);
    } else if (e.target.id === "alterarDataFimForm") {
      setFuncaoExecutar(() => alterarDataFim);
    } else if (e.target.id === "alterarDescForm") {
      setFuncaoExecutar(() => alterarDesc);
    }

    setQuestion({
      styles: {
        display: "flex",
      },
    });
  };

  const [formAlterarTitulo, setFormAlterarTitulo] = useState();
  const [formAlterarDataFim, setFormAlterarDataFim] = useState();
  const [formAlterarDesc, setFormAlterarDesc] = useState();

  const alterarDados = (e) => {
    if (e.target.name === "tituloAlterar") {
      setFormAlterarTitulo({
        ...formAlterarTitulo,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name === "dataFimAlterar") {
      setFormAlterarDataFim({
        ...formAlterarDataFim,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name === "descricao") {
      setFormAlterarDesc({
        ...formAlterarDesc,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div id={styles.containerBackground} style={display}>
      <QuestionBox
        question={question}
        setQuestion={setQuestion}
        message={"Você tem certeza que deseja prosseguir?"}
        funcaoExecutar={funcaoExecutar}
      />
      <div id={styles.containerUpdate}>
        <input type="button" value="Cancelar" onClick={fecharForm} />
        <form id="alterarTituloForm" onSubmit={alterarInformacao}>
          <Labels
            text={"Alterar Título da tarefa: "}
            element={"tituloAlterar"}
          />
          <div className={styles.containerInputs}>
            <InputWithText
              type={"text"}
              id={"tituloAlterar"}
              name={"tituloAlterar"}
              preencherDados={alterarDados}
              placeholder={"Insira o título"}
              value={formAlterarTitulo?.tituloAlterar || ""}
            />
            <input type="submit" value="Alterar" />
          </div>
        </form>
        <form id="alterarDataFimForm" onSubmit={alterarInformacao}>
          <Labels
            text={"Alterar data de finalização: "}
            element={"dataFimAlterar"}
          />
          <div className={styles.containerInputs}>
            <InputWithText
              type={"date"}
              id={"dataFimAlterar"}
              name={"dataFimAlterar"}
              preencherDados={alterarDados}
              value={formAlterarDataFim?.dataFimAlterar || ""}
              max={"9999-12-31"}
              min={"1000-01-02"}
            />
            <input type="submit" value="Alterar" />
          </div>
        </form>
        <form id="alterarDescForm" onSubmit={alterarInformacao}>
          <Labels text={"Alterar descrição: "} element={"descricao"} />
          <div className={styles.containerInputs}>
            <textarea
              name="descricao"
              id="descricao"
              required
              onChange={alterarDados}
              value={formAlterarDesc?.descricao || ""}
              placeholder="Insira a descrição"
            ></textarea>
            <input type="submit" value="Alterar" />
          </div>
        </form>
      </div>
    </div>
  );
}
