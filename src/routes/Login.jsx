import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "../routes/Login.module.css";
import InputWithText from "../components/InputWithText";
import Labels from "../components/Labels";
import Mensagem from "../components/Mensagem";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accountDeleted = searchParams.get("accountDeleted");

    if (accountDeleted) {
      mostrarMensagem("Conta deletada com sucesso!", "success");

      searchParams.delete("accountDeleted");

      navigate("/Login", { replace: true });
    }
  }, [searchParams]);

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

  const [formDados, setFormDados] = useState({
    nomeUsuario: "",
    senhaUsuario: "",
  });

  const preencherDados = (e) => {
    setFormDados({
      ...formDados,
      [e.target.name]: e.target.value,
    });
  };

  const eventoSubmitForm = (e) => {
    e.preventDefault();

    fetch("http://localhost:5050/User/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDados),
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => {
        if (data) {
          navigate("/ListaTarefas");
        }

        mostrarMensagem(
          "Nome de usuario ou senha incorretos, tente novamente.",
          "alert"
        );
      })
      .catch((err) => {
        mostrarMensagem("Erro ao realizar login. Tente novamente.", "error");
      });
  };

  return (
    <section>
      <h1>Seja bem-vindo ao TaskList</h1>
      <p>Realize o login ou cadastre-se para começar a usar</p>
      <form id="loginForm" onSubmit={eventoSubmitForm}>
        <h2>Login</h2>
        <Labels text={"Usuário:"} element={"nomeUsuario"} />
        <InputWithText
          type={"text"}
          name={"nomeUsuario"}
          id={"nomeUsuario"}
          placeholder={"Insira seu nome de usuário"}
          preencherDados={preencherDados}
        />

        <Labels text={"Senha:"} element={"senhaUsuario"} />
        <InputWithText
          type={"password"}
          name={"senhaUsuario"}
          id={"senhaUsuario"}
          placeholder={"Insira sua senha"}
          preencherDados={preencherDados}
        />

        <input type="submit" value="Entrar" />
        <Link to={"/Cadastro"}>
          Não tem uma conta? Clique aqui para criar uma.
        </Link>

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
