import classes from './Input.module.css'
const Input = (props) => {
  const hasError = props.hasError
  const valid = props.validInput
  const inputClass = `${classes.user_box} ${hasError ? classes.error : ''} ${valid ? classes.valid : ''}`
  return (
    <div className={inputClass}>
      <input {...props.input} onChange={props.onChange} onBlur={props.onBlur} />
      <label htmlFor={props.input.id} >{props.label}</label>
    </div>
  )
}

export default Input;