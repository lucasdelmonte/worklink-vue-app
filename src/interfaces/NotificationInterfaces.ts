export interface INotifications {
    _id: string
    user: string
    notificacionType: string
    presupuesto: string | undefined
    solicitud: string | undefined
    mensaje: string
    isActive: boolean
    __v: number
}

