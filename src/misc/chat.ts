document.addEventListener('DOMContentLoaded', () => {
  const modalChats = document.querySelector('.modal-chat__chats') as HTMLElement | undefined
  if(!modalChats) return
  // Necesito observar cuando hay cambios dentro de modalChats
  // Si hay cambios, entonces debo hacer scroll hacia abajo
  // Si no hay cambios, entonces no hago nada
  const observer = new MutationObserver(() => {
    modalChats.scrollTop = modalChats.scrollHeight
  })
  observer.observe(modalChats, { childList: true })
})