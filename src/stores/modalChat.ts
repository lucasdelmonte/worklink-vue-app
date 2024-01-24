import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
import type { IServiceRequestGet } from '../interfaces/ServiceRequestInterfaces'
import type { IChat } from '../interfaces/ChatInterfaces'

let updateChatsInterval: number | null = null;

export const useModalChatStore = defineStore('modalChat', {
  state: () => ({
    state: false,
    serviceRequest: {} as IServiceRequestGet,
    chat: [] as IChat[] 
  }),
  actions: {
    toggleModal() {
      this.state = !this.state
    },
    async sendChat(message: string) {
      const cookies = useCookies()
      if(!cookies.cookies.get('userId') || message === '' || Object.keys(this.serviceRequest).length === 0) return

      const URL = `http://localhost:4000/solicitudes_servicio/${ this.serviceRequest._id }/chat`
      const data = {
        "id_autor": cookies.cookies.get('userId'),
        "mensaje": message
      }

      try {
        const response = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        const responseData = await response.json()
        if (!response.ok && responseData.error) throw new Error(responseData.message)

        this.updateChats()
        return true
      } catch (error) {
        console.error(error)
      }
    },
    async updateChats() {
      const URL = `http://localhost:4000/solicitudes_servicio/${ this.serviceRequest._id }`
      try {
        const response = await fetch(URL)
        const responseData = await response.json()
        if (!response.ok && responseData.error) throw new Error(responseData.message)
        
        responseData.data.chat.forEach((chat: IChat) => {
          if (!this.chat.some((existingChat) => existingChat.id_autor === chat.id_autor && existingChat.fecha === chat.fecha)) {
            this.chat.push(chat)
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    startUpdatingChats() {
      updateChatsInterval = setInterval(() => {
        this.updateChats()
      }, 5000);
    },
    stopUpdatingChats() {
      if (updateChatsInterval !== null) {
        clearInterval(updateChatsInterval)
        updateChatsInterval = null
      }
    },
    resetAttributes() {
      this.state = false
    }
  },
})