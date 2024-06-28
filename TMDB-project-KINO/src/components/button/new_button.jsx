import './new_button.css'

const New_button = (props) => { 

  return (
    <button
      className={`new_btn ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
export const OutlinedButton = (props) => { 

  return (
    <button
      className={`new_btn-outline ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
export default New_button
