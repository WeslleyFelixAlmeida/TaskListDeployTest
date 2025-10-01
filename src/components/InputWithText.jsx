export default function InputWithText({
  type,
  placeholder,
  id,
  name,
  preencherDados,
  value,
  maxLength,
  max,
  min,
  isRequired
}) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={preencherDados}
      value={value}
      maxLength={maxLength}
      max={max ? max : ""}
      min={min ? min : ""}
      required={isRequired !== false}
    />
  );
}
