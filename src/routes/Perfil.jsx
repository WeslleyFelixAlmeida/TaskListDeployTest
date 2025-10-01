import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Perfil.module.css";
import Islogged from "../components/Islogged";
import FormUpdatePerfil from "../components/FormUpdatePerfil";
import Mensagem from "../components/Mensagem";
import QuestionBox from "../components/QuestionBox";

export default function Perfil() {
  const navigate = useNavigate();

  const [mensagemConfirmacao, setMensagemConfirmacao] = useState({
    styles: {
      display: "none",
    },
  });

  const mostrarMensagemConfirmacao = (e) => {
    e.preventDefault();

    setMensagemConfirmacao({
      styles: {
        display: "flex",
      },
    });
  };

  const [infoUsuario, setInfoUsuario] = useState({
    nomeUsuario: "",
  });

  useEffect(() => {
    fetch("http://localhost:5050/User/Perfil", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => {
        if (data) {
          setInfoUsuario({
            nomeUsuario: data.usuarioDados,
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const [formUpdate, setFormUpdate] = useState({
    styles: {
      display: "none",
    },
    informacao: "",
  });

  const mostrarFormUpdate = (e) => {
    switch (e.target.id) {
      case "botaoUsuario":
        setFormUpdate({
          styles: {
            display: "flex",
          },
          informacao: "usuario",
        });
        break;
      case "botaoSenha":
        setFormUpdate({
          styles: {
            display: "flex",
          },
          informacao: "senha",
        });
        break;
    }
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
        minWidth: "220px",
        width: "50%",
        maxWidth: "360px",
        height: "40px",
        top: "105px",
        left: "85px",
      },
    });
  };

  const deletarConta = () => {
    fetch(`http://localhost:5050/User/DeletarConta`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => {
        if(!data){
          throw new Error();
        }
        navigate("/Login?accountDeleted=true");
      })
      .catch((err) => {
        mostrarMensagem("Erro ao deletar conta.", "error");
      });
  };

  return (
    <div id={styles.perfilContainer}>
      <Islogged />

      <FormUpdatePerfil
        setJanelaUpdate={setFormUpdate}
        informacao={formUpdate.informacao}
        janelaUpdate={formUpdate}
        setNomeUsuario={setInfoUsuario}
        mostrarMensagem={mostrarMensagem}
      />

      <QuestionBox
        funcaoExecutar={deletarConta}
        question={mensagemConfirmacao}
        setQuestion={setMensagemConfirmacao}
        message={"Tem certeza que deseja prosseguir?"}
      />

      <Mensagem
        atributes={mensagem.atributes}
        estilos={mensagem.styles}
        setMessageVisibility={setMensagem}
        message={mensagem}
      />

      <Link to={"/ListaTarefas"} id={styles.linkInicio}>
        Voltar
      </Link>
      <h1>Perfil do usuário:</h1>
      <p>
        Usuário:
        <span id={styles.nomeUsuario}>{infoUsuario.nomeUsuario}</span>
      </p>
      <input
        className={styles.buttons}
        id="botaoUsuario"
        type="button"
        value="Editar Usuário"
        onClick={mostrarFormUpdate}
      />
      <input
        className={styles.buttons}
        id="botaoSenha"
        type="button"
        value="Editar Senha"
        onClick={mostrarFormUpdate}
      />
      <button
        id={styles.botaoDeletarConta}
        onClick={mostrarMensagemConfirmacao}
      >
        🗑️Deletar Conta
      </button>
    </div>
  );
}
