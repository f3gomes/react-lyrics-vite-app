export function InputComponent(props) {
  return (
    <input
      className="inp"
      type="text"
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  );
}
