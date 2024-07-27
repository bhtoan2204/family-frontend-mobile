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
  export interface FamilyInfo {
    name: string;
    avatar: string;
  }
  
  export  interface Noti {
    _id: string;
    title: string;
    title_vn: string;
    content: string;
    content_vn: string;
    type: string;
    id_family: number;
    id_target: number;
    isRead: boolean;
    createdAt: string; 
    updatedAt: string; 
    timestamp: string; 
    familyInfo: FamilyInfo | null;
  }
  