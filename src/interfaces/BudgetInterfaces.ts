export interface IBudget {
  _id: string
  solicitud_servicio: string
  monto: number
  fecha: string
  estado: string
  detalle: string
  documentos: string[]
  __v: number
}