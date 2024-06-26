export interface LastMessage {
  _id: string;
  receiverId: string;
  latestMessage: Message;
}

export interface Message {
  senderId: string;
  receiverId: string;
  type: string;
  content: string;
  isRead: boolean;
  timestamp: Date;
  _id: string;
  receiver: User; 
}

export interface User {
  firstname: string;
  lastname: string;
  avatar: string | null;
}
