//Componente usado para verificar se o usuário está logado

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Islogged() {
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
        if (!data) {
          navigate("/Login");
          return;
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return null;
}
