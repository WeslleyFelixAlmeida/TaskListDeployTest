export default function Labels({text, element, elementoInterno, color}){
    return(
        <label htmlFor={element} style={color}>
            {text}
            {elementoInterno !== "" &&
                elementoInterno
            }
        </label>
    )
}