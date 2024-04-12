import React, { useEffect, useState } from "react";
import { getSocket } from "src/services/apiclient/Socket";
import * as Notifications from 'expo-notifications';
import { AxiosResponse } from "axios";
import { FamilyServices } from "src/services/apiclient";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, selectProfile } from "src/redux/slices/ProfileSclice";

interface Member {
    id_user: string;
    firstname: string;
    lastname: string;
    avatar: string;
}
  
interface Message {
    senderId: string;
    type: string;
    content: string;
    receiverId: string;
}

const Notification = () => {
    const socket = getSocket();
    const [sender, setSender] = useState<Member>();
    const [receiver, setReceiver] = useState<Member>();
    const dispatch = useDispatch();
    const profile = useSelector(selectProfile);

    const fetchMember = async (receiverId?: string) => {
        try {
            const response1: AxiosResponse<Member[]> = await FamilyServices.getMember({ id_user: receiverId });
            if (response1 && response1.data.length > 0) {
                setSender(response1.data[0]);
            }
        } catch (error) {
            console.error('Error fetching member:', error);
        }
    };
    
    const handleNewMessage = (message: Message) => {
        try{
            fetchMember(message.senderId);

        if (profile.id_user === message.receiverId && sender) {
            console.log('hi')
            const notificationContent: Notifications.NotificationContentInput = {
                title: `${sender?.firstname || ''} ${sender?.lastname || ''}`,
                subtitle: null, 
                body: message.content, 
                data: {},
                sound: 'default', 
            };

            Notifications.scheduleNotificationAsync({
                content: notificationContent,
                trigger: null,
            });
        }
    }catch(error){
        console.log(error);
    }
    };
    
    useEffect(() => {
        dispatch(fetchProfile());
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('onNewMessage', handleNewMessage);

            return () => {
                socket.off('onNewMessage', handleNewMessage);
            }
        }
    }, [socket]);

    return null; 
};

export default Notification;
