import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./Cadastro.module.css";
import InputWithText from "../components/InputWithText";
import Labels from "../components/Labels";
import Mensagem from "../components/Mensagem";

export default function Cadastro() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5050/User/Islogged", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => {
        if (data) {
          navigate("/ListaTarefas");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const [cadastroUsuarioForm, setCadastroUsuarioForm] = useState({
    nomeUsuario: "",
    senhaUsuario: "",
    confirmarSenhaUsuario: "",
    termosUso: "",
  });

  const alterarDados = (e) => {
    setCadastroUsuarioForm({
      ...cadastroUsuarioForm,
      [e.target.name]: e.target.value,
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
        minWidth: "275px",
        width: "50%",
        maxWidth: "360px",
        height: "40px",
        top: "255px",
      },
    });
  };

  const criarConta = (e) => {
    e.preventDefault();

    if (
      cadastroUsuarioForm.senhaUsuario !==
      cadastroUsuarioForm.confirmarSenhaUsuario
    ) {
      mostrarMensagem(
        "As senhas informadas são diferentes. Tente novamente.",
        "alert"
      );
      return;
    }

    fetch("http://localhost:5050/User/Cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cadastroUsuarioForm),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.err) {
          throw new Error();
        } else if (data) {
          mostrarMensagem("Conta criada com sucesso!", "success");

          setCadastroUsuarioForm({
            nomeUsuario: "",
            senhaUsuario: "",
            confirmarSenhaUsuario: "",
            termosUso: "",
          });

          document.getElementById("cadastroForm").reset();
        } else {
          mostrarMensagem("Usuário já existe! Tente outro nome.", "alert");
        }
      })
      .catch((err) =>
        mostrarMensagem("Erro ao criar conta. Tente novamente.", "error")
      );
  };

  return (
    <section>
      <Link to={"/Login"} id={styles.linkInicio}>
        Início
      </Link>
      <h1>Crie sua conta preenchendo as informações abaixo:</h1>
      <form id="cadastroForm" onSubmit={criarConta}>
        <h2>Cadastro</h2>
        <Labels text={"Usuário:"} element={"nomeUsuario"} />
        <InputWithText
          type={"text"}
          name={"nomeUsuario"}
          id={"nomeUsuario"}
          placeholder={"Insira seu nome de usuário"}
          preencherDados={alterarDados}
        />

        <Labels text={"Senha:"} element={"senhaUsuario"} />
        <InputWithText
          type={"password"}
          name={"senhaUsuario"}
          id={"senhaUsuario"}
          placeholder={"Insira sua senha"}
          preencherDados={alterarDados}
        />

        <Labels text={"Confirmar senha:"} element={"confirmarSenhaUsuario"} />
        <InputWithText
          type={"password"}
          name={"confirmarSenhaUsuario"}
          id={"confirmarSenhaUsuario"}
          placeholder={"Insira sua senha novamente"}
          preencherDados={alterarDados}
        />

        <span id={styles.checkBoxStyle}>
          <Labels
            text={`Li e aceito os `}
            element={"termosUso"}
            elementoInterno={<Link to={"/TermosUso"}>termos de uso</Link>}
          />
          <input
            type="checkbox"
            name="termosUso"
            id="termosUso"
            onChange={alterarDados}
            required
          />
        </span>

        <input type="submit" value="Criar conta" />

        <Mensagem
          atributes={mensagem.atributes}
          estilos={mensagem.styles}
          setMessageVisibility={setMensagem}
          message={mensagem}
        />
      </form>
    </section>
  );
}
