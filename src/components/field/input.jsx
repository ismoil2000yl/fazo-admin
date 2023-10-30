import { Input } from "antd";
import React, { useState } from 'react'
// import { ErrorMessage } from 'formik'
import IconSee from '/src/assets/images/png/see.png'
import IconNotSee from '/src/assets/images/png/notsee.png'

const TextInput = ({
  field,
  label,
  required = false,
  placeholder,
  type = "text",
  hasPassword = false,
  errorMessage = "To'ldirish shart",
  form: { setFieldValue, errors, touched, setFieldTouched },
}) => {
  const [seen, setSeen] = useState(false)
  const seeFunction = () => {
    if (seen) {
      document.getElementById("password").setAttribute("type", "password")
      setSeen(false)
    }
    else {
      document.getElementById("password").setAttribute("type", "text")
      setSeen(true)
    }
  }
  return (
    <div className="form-floating my-2">
      <input
        name={field.name}
        status={touched[field.name] && errors[field.name] && "error"}
        value={field.value}
        onBlur={() => setFieldTouched(field.name, true)}
        onChange={(e) => setFieldValue(field.name, e.target.value)}
        placeholder={label}
        type={type}
        id={`${hasPassword ? "password" : ""}`}
        className={`form-control ${hasPassword ? 'pass' : ''}`}
      />
      {
        hasPassword ?
          <button className='see' onClick={seeFunction}>
            {
              seen ?
                <img className="see-img" src={IconSee} alt="" />
                :
                <img className="see-img" src={IconNotSee} alt="" />
            }
          </button>
          : null
      }
      {/* <ErrorMessage component="div" className='error' name={field.name} /> */}
      {!field.value && touched[field.name] && errors[field.name] && (
        <small className="text-red-500 font-bold text-xs">
          {errorMessage}
        </small>
      )}
      <label>{label}</label>
    </div>
  )
}

export default TextInput