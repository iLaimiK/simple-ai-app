/**
 * 消息格式
 */

export interface Message {
  role: 'user' | 'assistant' | 'system',
  content: string,
}
