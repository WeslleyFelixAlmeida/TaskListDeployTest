//Componente usado para verificar se o usuário está logado

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { API_URL } from "../utils/api_connection_variable";

export default function Islogged() {
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${API_URL}/User/Islogged`, {
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
