import { useState } from "react";

import styles from "./QuestionBox.module.css";
export default function QuestionBox({
  question,
  setQuestion,
  message,
  funcaoExecutar,
}) {
  const fecharPergunta = () => {
    setQuestion({
      styles: {
        display: "none",
      },
    });
  };

  return (
    <div id={styles.containerQuestionBox} style={question.styles}>
      <div id={styles.containerMessage}>
        <p>{message}</p>
        <div>
          <input type="button" value="Cancelar" onClick={fecharPergunta} />
          <input
            type="button"
            value="Confirmar"
            onClick={() => {
              funcaoExecutar();
              fecharPergunta();
            }}
          />
        </div>
      </div>
    </div>
  );
}
