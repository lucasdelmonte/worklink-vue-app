document.addEventListener('DOMContentLoaded', () => {
  const modalChats = document.querySelector('.modal-chat__chats') as HTMLElement | undefined
  if(!modalChats) return

  const observer = new MutationObserver(() => {
    modalChats.scrollTop = modalChats.scrollHeight
  })
  observer.observe(modalChats, { childList: true })
})