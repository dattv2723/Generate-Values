import moment from 'moment/moment'
import { useEffect, useState } from 'react'
import './App.css'
import { Checkbox, FormInput, Modal, Selector } from './components'
import styled from 'styled-components'
import { FaClipboardCheck } from 'react-icons/fa'
import { FiClipboard } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { toggleModal } from './features/modalSlice'

const initialState = {
  prefixString: 'Data_',
  defaultInt: 2,
  defaultBit: 0,
  defaultDecimal: 123,
  defaultDate: moment(new Date()).format('YYYY-MM-DD'),
  input: '',
  output: '',
  isCopy: false,
  isWrap: true,
}

function App() {
  const [state, setState] = useState(initialState)
  const dispatch = useDispatch()

  const handleToggleModal = () => {
    dispatch(toggleModal())
  }

  const changeValue = (e) => {
    const name = e.target.name
    let value = e.target.value

    if (name === 'isWrap') {
      value = e.target.checked
    }

    setState({ ...state, [name]: value })
  }

  const generateSQL = () => {
    const {
      prefixString,
      defaultInt,
      defaultBit,
      defaultDecimal,
      defaultDate,
      input,
      isWrap,
    } = state

    if (
      !input ||
      (!input.includes('INSERT INTO') && !input.includes('VALUES'))
    ) {
      setState({ ...state, output: '', isCopy: false })
      return
    }

    const breakLine = isWrap ? `\n` : ''
    const endSlice = isWrap ? -2 : -1

    const originalArr = input.split('VALUES')

    const arrInsert = originalArr[0].split('(')
    if (arrInsert.length === 0) return

    let output = arrInsert[0].trimEnd()

    const arrCol = arrInsert[1].split(',')
    if (arrCol.length === 0) return

    output += `\n(`
    arrCol.map((x) => {
      output += ` ${x.trim().replace(`\n`, '')}${breakLine},`
      return true
    })
    output = output.slice(0, endSlice)

    let arrVal = originalArr[1].split('<')

    if (arrVal.length === 0) return

    output += `\nVALUES \n(`
    let val
    arrVal.map((x) => {
      if (x.includes('varchar')) {
        val = `${prefixString}${x.split(',')[0]}`

        const maxLength = parseInt(x.split('(')[1].split(')')[0])
        if (val.length > maxLength) val = val.substring(0, maxLength)

        if (!x.includes('nvarchar')) {
          val = truncateString(val, maxLength)
        }
        val = `'${val}'`
      } else if (x.includes('int')) {
        val = defaultInt
      } else if (x.includes('bit')) {
        val = defaultBit
      } else if (x.includes('decimal')) {
        val = defaultDecimal
      } else if (x.includes('date')) {
        val = defaultDate
      } else return

      output += ` ${val}${breakLine},`

      return true
    })
    output = output.slice(0, endSlice)
    output += ')'

    setState({ ...state, output: output, isCopy: false })
  }

  const truncateString = (val, maxLength) => {
    const maxSize = new Blob([randomString(maxLength)]).size
    let sizeVal = new Blob([val]).size

    while (maxSize < sizeVal) {
      val = val.slice(0, -1)
      sizeVal = new Blob([val]).size
    }
    return val
  }

  const randomString = (length) => {
    var result = ''
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  const handleCopy = () => {
    if (!state.output || state.isCopy) return
    navigator.clipboard.writeText(state.output)
    setState({ ...state, isCopy: !state.isCopy })
  }

  useEffect(() => {
    if (state.input) {
      generateSQL()
    }
    // eslint-disable-next-line
  }, [
    state.prefixString,
    state.defaultInt,
    state.defaultBit,
    state.defaultDecimal,
    state.defaultDate,
    state.isWrap,
  ])

  useEffect(() => {
    generateSQL()
    // eslint-disable-next-line
  }, [state.input])

  return (
    <Wrapper>
      <Modal />
      <h1 className='text-center p-3'>Generate Values</h1>
      <div className='container mt-3'>
        <div className='row'>
          <FormInput
            label='Prefix Nvarchar'
            type='text'
            name='prefixString'
            value={state.prefixString}
            changeValue={changeValue}
          />
          <FormInput
            label='Default value Integer'
            type='number'
            name='defaultInt'
            value={state.defaultInt}
            changeValue={changeValue}
          />
          <Selector
            label='Default value Bit'
            // type='number'
            name='defaultBit'
            value={state.defaultBit}
            changeValue={changeValue}
          />
          <FormInput
            label='Default value Decimal'
            type='number'
            name='defaultDecimal'
            value={state.defaultDecimal}
            changeValue={changeValue}
          />
          <FormInput
            label='Default value DateTime'
            type='text'
            name='defaultDate'
            value={state.defaultDate}
            changeValue={changeValue}
          />
        </div>
        <div className='row ml-auto'>
          <Checkbox
            label='Wrap Text'
            name='isWrap'
            value={state.isWrap}
            changeValue={changeValue}
          />
        </div>
        <div className='row'>
          <div className='col-sm'>
            <textarea
              name='input'
              id='input'
              cols='70'
              rows='28'
              value={state.input}
              onChange={changeValue}
              placeholder='Enter query insert'
            ></textarea>
          </div>
          <div className='col-sm'>
            <button className='btn-copy' title='Copy' onClick={handleCopy}>
              {state.isCopy ? <FaClipboardCheck /> : <FiClipboard />}
            </button>
            <textarea
              name='output'
              id='output'
              cols='70'
              rows='28'
              value={state.output}
              readOnly
            ></textarea>
          </div>
        </div>
      </div>
      <button
        className='btn-user-manual btn btn-outline-warning'
        onClick={handleToggleModal}
      >
        Guideline
      </button>
      <p className='text-center copy-right'>
        &#174; 2022 <strong>Tran Dat</strong>
      </p>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  position: relative;
  height: 100vh;
  background-image: linear-gradient(
    to right top,
    #715fee,
    #1676f0,
    #0085e5,
    #008fd2,
    #0095bc,
    #0096af,
    #0095a0,
    #1f9490,
    #008f7e,
    #008969,
    #008351,
    #187c37
  );
  h1 {
    font-weight: bold;
    color: White;
  }
  #input,
  #output {
    background: space;
    color: white;
    border-color: #a1e6df;
  }
  #input::placeholder {
    color: white;
  }
  #input:focus-visible,
  #output:focus-visible {
    outline: none;
  }
  #input::-webkit-scrollbar {
    width: 0px;
  }
  #output::-webkit-scrollbar {
    width: 5px;
  }
  #input:hover::-webkit-scrollbar,
  #output:hover::-webkit-scrollbar {
    width: 5px;
  }
  #input::-webkit-scrollbar-track,
  #output::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #00b1ff;
    border-radius: 10px;
  }
  #input::-webkit-scrollbar-thumb,
  #output::-webkit-scrollbar-thumb {
    background: #00e7f2;
    border-radius: 10px;
  }
  .btn-copy {
    border: none;
    border-radius: 5px;
    position: absolute;
    top: 5px;
    right: 22px;
    display: flex;
    padding: 10px;
    background-color: #a1e6df;
    &:hover {
      background-color: #6ab3eb;
    }
    &:focus {
      outline: 1px dotted;
    }
  }
  .btn-user-manual {
    position: absolute;
    top: 50%;
    left: 10px;
    color: white;
    font-weight: bold;
  }
  .copy-right {
    margin-top: 5px;
    color: white;
  }
`

export default App
