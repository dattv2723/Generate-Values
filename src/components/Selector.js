import React from 'react'
import styled from 'styled-components'

const Selector = ({ label, name, value, changeValue }) => {
  return (
    <Wrapper className='col-sm'>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        onChange={changeValue}
        className='form-control'
        value={value}
      >
        <option value='0'>False</option>
        <option value='1'>True</option>
      </select>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  label {
    color: #cce7ec;
    font-weight: bold;
  }
  select {
    height: 40px;
    text-align: center;
    width: 180px;
    margin-bottom: 10%;
    border-radius: 50px;
    box-shadow: 10px 10px 14px 1px rgb(0 0 0 / 20%);
    letter-spacing: 0.094em;
  }
`

export default Selector
