import React from 'react'
import styled from 'styled-components'

const FormInput = ({ label, type, name, value, changeValue }) => {
  return (
    <Wrapper className='col-sm'>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        className='form-control'
        name={name}
        value={value}
        onChange={changeValue}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  label {
    color: #cce7ec;
    font-weight: bold;
  }
  input {
    height: 40px;
    text-align: center;
    width: 180px;
    margin-bottom: 10%;
    border-radius: 50px;
    box-shadow: 10px 10px 14px 1px rgb(0 0 0 / 20%);
    letter-spacing: 0.094em;
  }
`

export default FormInput
