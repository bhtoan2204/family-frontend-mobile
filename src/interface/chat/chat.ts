export interface LastMessage {
  receiverId: string;
  _id: string;
  messages: Message[];
  user: User;
}
export interface Message {
  senderId: string;
  receiverId: string;
  type: string;
  content: string;
  isRead: boolean;
  timestamp: Date;
  _id: string;
}

export interface User {
  firstname: string;
  lastname: string;
  avatar: string | null;
}
