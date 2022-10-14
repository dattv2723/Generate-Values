import React from 'react'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModal } from '../features/modalSlice'

const Modal = () => {
  const { isModalOpen } = useSelector((store) => store.modal)

  const dispatch = useDispatch()

  const handleToggleModal = () => {
    dispatch(toggleModal())
  }

  return (
    <Wrapper>
      <div className={`sidebar-container ${isModalOpen ? 'show-sidebar' : ''}`}>
        <div className='content'>
          <button className='close-btn' onClick={handleToggleModal}>
            <FaTimes />
          </button>
          <div>
            <h3 className='text-center'>Hướng Dẫn Sử Dụng</h3>
            <div className='mt-5'>
              <p>1. Trên SQL Server, click chuột phải vào table cần copy</p>
              <p>
                2. Chọn <strong>Script Table as</strong>
              </p>
              <p>
                3. Chọn <strong>Insert to</strong>
              </p>
              <p>
                4. Chọn <strong>Clipboard</strong>
              </p>
              <p>5. Paste câu lệnh vào Textbox</p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.aside`
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 1;
    transition: 0.3s ease-in-out all;
    left: -100%;
  }
  .show-sidebar {
    z-index: 10000;
    left: 0;
    opacity: 1;
  }
  .content {
    background-image: linear-gradient(
      to right top,
      #8d7ef6,
      #5994ff,
      #07a5fe,
      #00b3f4,
      #10bde6,
      #00bfda,
      #16c0cc,
      #34c1bd,
      #0fbba7,
      #00b48e,
      #15ac72,
      #2fa353
    );
    height: 50vh;
    border-radius: var(--borderRadius);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 500px;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: var(--red-dark);
    cursor: pointer;
  }
  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--grey-500);
    padding: 1rem 0;
    text-transform: capitalize;
    transition: var(--transition);
  }
  .nav-link:hover {
    color: var(--grey-900);
  }
  .nav-link:hover .icon {
    color: var(--primary-500);
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }
  .active {
    color: var(--grey-900);
  }
  .active .icon {
    color: var(--primary-500);
  }
`
export default Modal
