import React from 'react'

const InputFormField = ({ tipo, id, label, errors, values, onChange, onBlur, touched, }) => {
  const isTouched = Boolean(touched[id])
  const hasErrors = Boolean(errors[id])

  return (
    <div className="loginPage__inputWrap">
      <label className="loginPage__label" htmlFor={id}>
        {label}
      </label> 
      <input
        className="loginPage__input"
        type={tipo}
        id={id}
        name={id}
        value={values[id]}
        onChange={onChange}
        onBlur={onBlur}
      />
      <p style={{ color: 'red' }}>
        {isTouched && hasErrors && errors[id]}
      </p>
    </div>
  )
}

export default InputFormField
