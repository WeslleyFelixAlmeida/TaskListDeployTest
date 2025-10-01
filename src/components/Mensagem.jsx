import styles from "./Mensagem.module.css";
import { useEffect, useState } from "react";

export default function Mensagem2({
  atributes,
  estilos,
  message,
  setMessageVisibility,
}) {

  let style = { ...estilos };
  useEffect(() => {
    if (message !== "") {
      const timer = setTimeout(() => {
        setMessageVisibility({
          atributes: {
            message: "",
            type: "",
          },
          styles: {},
        });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  switch (atributes.type) {
    case "success":
      style.color = "#007900";
      style.backgroundColor = "#c3f5c3";
      style.borderColor = "#007900";
      break;
    case "error":
      style.color = "#ff1919";
      style.backgroundColor = "#ffc7c7";
      style.borderColor = "#ff1919";
      break;
    case "alert":
      style.color = "#b5b500";
      style.backgroundColor = "#ffffc8";
      style.borderColor = "#b5b500";
      break;
  }
  return (
    <div id={styles.containerMensagem} style={style}>
      {atributes.message}
    </div>
  );
}
