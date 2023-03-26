export type MessageStatus = 'warn' | 'success' | 'error'

export interface StatusOptions {
  status?: MessageStatus
  msg: string
}
