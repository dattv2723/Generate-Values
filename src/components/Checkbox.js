import React from 'react'
import styled from 'styled-components'

const Checkbox = ({ label, name, value, changeValue }) => {
  console.log(value)
  return (
    <Wrapper>
      {value ? (
        <input
          type='checkbox'
          id={name}
          name={name}
          checked
          onChange={changeValue}
        />
      ) : (
        <input type='checkbox' id={name} name={name} onChange={changeValue} />
      )}
      <label htmlFor={name}> {label}</label>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: block;
  margin-left: auto;
  margin-right: 20px;
  label {
    color: #cce7ec;
    font-weight: bold;
    padding-left: 10px;
  }
`
export default Checkbox
