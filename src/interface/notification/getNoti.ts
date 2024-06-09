export interface Member {
    id_user: string;
    firstname: string;
    lastname: string;
    avatar: string;
  }
  
  export  interface Message {
    senderId: string;
    type: string;
    content: string;
    receiverId?: string;
    _id: string;
    isRead: boolean;
    category: string; //user, family
    familyId?: number;
  }
  
  export  interface Family {
    id_family: number;
    quantity: number;
    description: string;
    name: string;
    avatar: string;
  }