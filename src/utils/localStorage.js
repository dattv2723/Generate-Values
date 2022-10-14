export const addIsOpenModalFromLocalStorage = (isModalOpen) => {
  localStorage.setItem('openModal', isModalOpen)
}

export const getIsOpenModalFromLocalStorage = () => {
  const result = localStorage.getItem('openModal')
  let isModalOpen = false
  if (result == null) isModalOpen = true
  return isModalOpen
}
