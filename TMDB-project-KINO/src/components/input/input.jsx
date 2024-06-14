import "./input.css";

const Input = ({ type, value, onChange, ...props }) => {
    
  return (
    <input
      className="p-1 border-none"
      type={type}
      onChange={onChange}
      value={value}
      placeholder='Enter text'
    >
      {props.children}
    </input>
  );
};

export default Input;
