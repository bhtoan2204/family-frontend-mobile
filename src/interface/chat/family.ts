export interface LastMessage {
    senderId: string;
    type: string; 
    content: string;
    isRead: boolean;
    timestamp: Date; 
    _id: string;
  }
  
  export interface FamilyLastMessage {
    _id: string;
    familyId: number;
    lastMessage: LastMessage;
    name: string;
    avatar: string;
  }
  
  export interface UserInfo {
    id_user: string;
    email: string;
    phone: string;
    language: string;
    firstname: string;
    lastname: string;
    avatar: string | null;
  }
  
  export interface Message {
    senderId: string;
    type: string;
    content: string;
    isRead: boolean;
    timestamp: Date;
    _id: string;
    userInfo: UserInfo;
  }
  
