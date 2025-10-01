import { useState, useEffect } from "react";

import styles from "./Filtro.module.css";
import Labels from "../components/Labels";
import InputWithText from "../components/InputWithText";

export default function Filtro({
  visibilidade,
  setVisibilidadeJanelaFiltro,
  tarefas,
  setTarefas,
  mensagem,
  setBotoesFiltro,
}) {
  useEffect(() => {
    if (visibilidade.display === "none") {
      document.body.style.overflow = "auto"; // libera scroll

      setFiltroStatus([]);
      setFiltroData("nenhum");
      setOpcaoData({
        visibilidade: { visibility: "hidden" },
        required: false,
      });
      setDataEspecifica({ data: "" });

      const inputs = document.querySelectorAll("#fundoFiltro input");
      inputs.forEach((input) => {
        if (input.type === "checkbox" || input.type === "radio") {
          input.checked = false;
        }
      });
    }
  }, [visibilidade]);

  const janelaFiltroDesabilitar = () => {
    removerOpcaoData();
    setVisibilidadeJanelaFiltro({
      display: "none",
    });
    setFiltroStatus([]);
  };

  const [opcaoData, setOpcaoData] = useState({
    visibilidade: {
      visibility: "",
    },
    opcaoEscolhida: "",
    required: false,
  });

  const apresentarOpcaoData = () => {
    setOpcaoData({
      visibilidade: { visibility: "visible" },
      required: true,
    });
  };

  const removerOpcaoData = () => {
    if (opcaoData.visibilidade.visibility === "visible") {
      setOpcaoData({
        visibilidade: { visibility: "hidden" },
        required: false,
      });

      setDataEspecifica({
        data: "",
      });
    }
  };

  const alterarDados = (e) => {
    setDataEspecifica({
      ...dataEspecifica,
      [e.target.name]: e.target.value,
    });
  };

  const [filtroData, setFiltroData] = useState();
  const [filtroStatus, setFiltroStatus] = useState([]);
  const [dataEspecifica, setDataEspecifica] = useState({
    data: "",
  });

  const checarInputs = (e) => {
    let elemento = e.target.id;

    if (
      elemento === "aberto" ||
      elemento === "finalizada" ||
      elemento === "expirado" ||
      elemento === "proximoExpirar"
    ) {
      switch (elemento) {
        case "aberto":
          elemento = 1;
          break;
        case "finalizada":
          elemento = 2;
          break;
        case "expirado":
          elemento = 3;
          break;
        case "proximoExpirar":
          elemento = 4;
          break;
      }

      if (!filtroStatus.includes(elemento)) {
        setFiltroStatus((prev) => [...prev, elemento]);
      } else {
        setFiltroStatus((prev) => prev.filter((item) => item !== elemento));
      }
    } else {
      setFiltroData(`${elemento}`);
    }
  };

  //Filtro funcões:
  const dataOrdenar = (tarefas, ordenamento) => {
    let arrayNovo = [];

    //Criando um array de objetos que contém as tarefas com as dataFimFormatada sendo atribuida em um objeto Date()
    tarefas.forEach((tarefa) => {
      let [dia, mes, ano] = tarefa.dataFimTarefaFormatada.split("/");

      let dataFormatada = new Date(`${ano}-${mes}-${dia}`);

      arrayNovo.push({
        ...tarefa,
        dataFimTarefaFormatada: dataFormatada,
      });
    });

    if (ordenamento === "crescente") {
      arrayNovo.sort(
        (a, b) =>
          new Date(a.dataFimTarefaFormatada) -
          new Date(b.dataFimTarefaFormatada)
      );
    } else if (ordenamento === "decrescente") {
      arrayNovo.sort(
        (a, b) =>
          new Date(b.dataFimTarefaFormatada) -
          new Date(a.dataFimTarefaFormatada)
      );
    }

    //Formatando novamente as datas para o formato dd/mm/yyyy
    arrayNovo.forEach((tarefa, index) => {
      let data = new Date(tarefa.dataFimTarefaFormatada);
      const dia = data.getDate().toString().padStart(2, "0");
      const mes = (data.getMonth() + 1).toString().padStart(2, "0");
      const ano = data.getFullYear();

      let dataFimFormatada = `${dia}/${mes}/${ano}`;

      arrayNovo[index] = {
        ...tarefa,
        dataFimTarefaFormatada: dataFimFormatada,
      };
    });

    return arrayNovo;
  };

  const filtrarPorData = (tarefas, tipoFiltro) => {
    if (tipoFiltro === "dataFiltroAntigo") {
      return dataOrdenar(tarefas, "crescente");
    } else if (tipoFiltro === "dataFiltroRecente") {
      return dataOrdenar(tarefas, "decrescente");
    } else {
      let [ano, mes, dia] = dataEspecifica.data.split("-");
      let dataFormatada = `${dia}/${mes}/${ano}`;

      let tarefasPorData = tarefas.filter(
        (tarefa) => tarefa.dataFimTarefaFormatada === dataFormatada
      );
      return tarefasPorData;
    }
  };

  const filtrarTarefasStatus = (tarefas, statusEscolhidos) => {
    //statusEscolhidos espera um array
    let retornoTarefasFiltroStatus = tarefas.filter((tarefa) =>
      statusEscolhidos.includes(tarefa.statusID)
    );

    return retornoTarefasFiltroStatus;
  };

  const aplicarFiltro = (e) => {
    e.preventDefault();
    let tarefasFiltradasPorStatus = tarefas;

    if (filtroStatus.length > 0) {
      tarefasFiltradasPorStatus = filtrarTarefasStatus(tarefas, filtroStatus);
    }

    if (filtroData && filtroData !== "nenhum") {
      tarefasFiltradasPorStatus = filtrarPorData(
        tarefasFiltradasPorStatus,
        filtroData
      );
    }

    if (tarefasFiltradasPorStatus.length < 1) {
      mensagem("Não foi encontrada nenhuma tarefa com esta condição!", "alert");
      janelaFiltroDesabilitar();
    } else {
      mensagem("Filtro aplicado com sucesso!", "success");
      setTarefas(tarefasFiltradasPorStatus);
      setBotoesFiltro({
        botaoAplicar: {
          display: "none",
        },
        botaoRemover: {
          display: "block",
        },
      });
      janelaFiltroDesabilitar();
    }
  };

  return (
    <form
      className={styles.fundoFiltro}
      id="fundoFiltro"
      style={visibilidade}
      onSubmit={aplicarFiltro}
    >
      <div id={styles.containerFiltro}>
        <div id={styles.containerButtons}>
          <input
            type="button"
            value="Cancelar"
            onClick={janelaFiltroDesabilitar}
          />
          <input type="submit" value="Aplicar filtro" />
        </div>
        <h1>Selecione as opções:</h1>
        <div id={styles.containerOpcoesFiltro}>
          <div id={styles.containerStatusFiltro}>
            <h2>Status:</h2>
            <div className={styles.containerLinhaInputs}>
              <input
                type="checkbox"
                name="aberto"
                id="aberto"
                onClick={(e) => {
                  checarInputs(e);
                }}
              />
              <Labels element={"aberto"} text={"Em aberto"} />
            </div>
            <div className={styles.containerLinhaInputs}>
              <input
                type="checkbox"
                name="finalizada"
                id="finalizada"
                onClick={(e) => {
                  checarInputs(e);
                }}
              />
              <Labels element={"finalizada"} text={"Finalizada"} />
            </div>
            <div className={styles.containerLinhaInputs}>
              <input
                type="checkbox"
                name="expirado"
                id="expirado"
                onClick={(e) => {
                  checarInputs(e);
                }}
              />
              <Labels element={"expirado"} text={"Expirado"} />
            </div>
            <div className={styles.containerLinhaInputs}>
              <input
                type="checkbox"
                name="proximoExpirar"
                id="proximoExpirar"
                onClick={(e) => {
                  checarInputs(e);
                }}
              />
              <Labels element={"proximoExpirar"} text={"Proximo de expirar"} />
            </div>
          </div>
          <div id={styles.containerDataFiltro}>
            <h2>Data de finalizacão:</h2>
            <div className={styles.containerLinhaInputs}>
              <input
                type="radio"
                name="dataFiltro"
                id="dataFiltroNenhum"
                onClick={(e) => {
                  removerOpcaoData();
                  checarInputs(e);
                }}
              />
              <Labels element={"dataFiltroNenhum"} text={"Nenhum"} />
            </div>
            <div className={styles.containerLinhaInputs}>
              <input
                type="radio"
                name="dataFiltro"
                id="dataFiltroRecente"
                onClick={(e) => {
                  removerOpcaoData();
                  checarInputs(e);
                }}
              />
              <Labels element={"dataFiltroRecente"} text={"Mais recentes"} />
            </div>
            <div className={styles.containerLinhaInputs}>
              <input
                type="radio"
                name="dataFiltro"
                id="dataFiltroAntigo"
                onClick={(e) => {
                  removerOpcaoData();
                  checarInputs(e);
                }}
              />
              <Labels element={"dataFiltroAntigo"} text={"Mais antigos"} />
            </div>
            <div className={styles.containerLinhaInputs}>
              <input
                type="radio"
                name="dataFiltro"
                id="dataFiltroDataEspecifica"
                onClick={(e) => {
                  apresentarOpcaoData();
                  checarInputs(e);
                }}
              />
              <Labels element={"dataFiltroDataEspecifica"} text={"Data:"} />
            </div>
            <div id={styles.filtroOpcoesData} style={opcaoData.visibilidade}>
              <div className={styles.containerOpcaoData}>
                <InputWithText
                  type={"date"}
                  id={"data"}
                  name={"data"}
                  preencherDados={alterarDados}
                  min={"1002-01-01"}
                  max={"9999-12-31"}
                  isRequired={opcaoData.required}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
