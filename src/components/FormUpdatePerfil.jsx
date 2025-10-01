import { useState } from "react";

import styles from "./FormUpdatePerfil.module.css";
import Labels from "./Labels";
import InputWithText from "./InputWithText";
import QuestionBox from "./QuestionBox";

export default function FormUpdatePerfil({
  setJanelaUpdate,
  janelaUpdate,
  setNomeUsuario,
  mostrarMensagem,
}) {
  const removerTelaUpdate = () => {
    setJanelaUpdate({
      styles: {
        display: "none",
      },
      informacao: "",
    });

    setFormUsuarioUpdate({
      usuarioUpdate: "",
    });

    setFormSenha({
      senhaAntigaUpdate: "",
      senhaUpdate: "",
    });

    setMensagemConfirmacao({
      styles: {
        display: "none",
      },
    });
  };

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

  const [formUsuarioUpdate, setFormUsuarioUpdate] = useState({
    usuarioUpdate: "",
  });

  const [formSenha, setFormSenha] = useState({
    senhaAntigaUpdate: "",
    senhaUpdate: "",
  });

  const alterarInformacao = (e) => {
    if (e.target.id === "usuarioUpdate") {
      setFormUsuarioUpdate({
        ...formUsuarioUpdate,
        [e.target.name]: e.target.value,
      });
      return;
    }

    setFormSenha({
      ...formSenha,
      [e.target.name]: e.target.value,
    });
  };

  const atualizarDado = () => {
    if (formUsuarioUpdate.usuarioUpdate) {
      fetch(`http://localhost:5050/User/AlterarUsuario`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formUsuarioUpdate),
        credentials: "include",
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.err) {
            throw new Error();
          } else if (data.message) {
            mostrarMensagem(`${data.message}`, "alert");
            removerTelaUpdate();
            return;
          }

          setNomeUsuario({
            nomeUsuario: data,
          });

          mostrarMensagem("Nome de usuário alterado com sucesso!", "success");
          removerTelaUpdate();
        })
        .catch((err) => {
          mostrarMensagem(
            "Erro ao alterar nome de usuário, tente novamente.",
            "error"
          );
        });
    } else if (formSenha.senhaAntigaUpdate && formSenha.senhaUpdate) {
      fetch(`http://localhost:5050/User/AlterarSenhaUsuario`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formSenha),
        credentials: "include",
      })
        .then((data) => data.json())
        .then((data) => {          
          if (data.err) {
            throw new Error();
          } else if (data.message) {
            mostrarMensagem(`${data.message}`, "alert");
            removerTelaUpdate();
            return;
          }

          mostrarMensagem("Senha alterada com sucesso!", "success");
          removerTelaUpdate();
        })
        .catch((err) => {
          mostrarMensagem(
            "Erro ao alterar senha, tente novamente.",
            "error"
          );
        });
    }
  };

  return (
    <div style={janelaUpdate.styles} className={styles.janelaUpdate}>
      <form
        className={styles.formUpdate}
        id="formUpdate"
        onSubmit={mostrarMensagemConfirmacao}
      >
        <QuestionBox
          funcaoExecutar={atualizarDado}
          question={mensagemConfirmacao}
          setQuestion={setMensagemConfirmacao}
          message={"Tem certeza que deseja prosseguir?"}
        />
        <input type="button" value="Cancelar" onClick={removerTelaUpdate} />
        {janelaUpdate.informacao === "usuario" && (
          <div className={styles.linhaForm}>
            <h2>Alterar nome de usuário:</h2>
            <Labels element={"usuarioUpdate"} text={"Novo nome:"} />
            <InputWithText
              type={"text"}
              name={"usuarioUpdate"}
              id={"usuarioUpdate"}
              placeholder={"Insira o novo nome"}
              preencherDados={alterarInformacao}
            />
          </div>
        )}
        {janelaUpdate.informacao === "senha" && (
          <div className={styles.linhaForm}>
            <h2>Alterar senha:</h2>
            <Labels element={"senhaAntigaUpdate"} text={"Senha antiga:"} />
            <InputWithText
              type={"password"}
              name={"senhaAntigaUpdate"}
              id={"senhaAntigaUpdate"}
              placeholder={"Insira a senha antiga"}
              preencherDados={alterarInformacao}
            />
            <Labels element={"senhaUpdate"} text={"Nova senha:"} />
            <InputWithText
              type={"password"}
              name={"senhaUpdate"}
              id={"senhaUpdate"}
              placeholder={"Insira a nova senha"}
              preencherDados={alterarInformacao}
            />
          </div>
        )}
        <input type="submit" value="Alterar" />
      </form>
    </div>
  );
}
