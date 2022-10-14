import { createSlice } from '@reduxjs/toolkit'
import {
  getIsOpenModalFromLocalStorage,
  addIsOpenModalFromLocalStorage,
} from '../utils/localStorage'
const initialState = {
  isModalOpen: getIsOpenModalFromLocalStorage(),
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen
      addIsOpenModalFromLocalStorage(state.isModalOpen)
    },
  },
})

export const { toggleModal } = modalSlice.actions

export default modalSlice.reducer
