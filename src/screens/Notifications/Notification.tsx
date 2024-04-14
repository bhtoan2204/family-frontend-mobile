import React, { useEffect, useState } from "react";
import { getSocket } from "src/services/apiclient/Socket";
import * as Notifications from 'expo-notifications';
import { AxiosResponse } from "axios";
import { FamilyServices } from "src/services/apiclient";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, selectProfile } from "src/redux/slices/ProfileSclice";
import * as Permissions from 'expo-permissions';

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
        try {
            console.log("New message received:", message);
            fetchMember(message.senderId);

            if (profile.id_user === message.receiverId && sender) {
 
                console.log("Creating notification...");
                const notificationContent: Notifications.NotificationContentInput = {
                    title: `${sender?.firstname || ''} ${sender?.lastname || ''}`,
                    subtitle: null, 
                    body: message.content, 
                    data: {},
                    sound: 'default', 
                };

                Notifications.scheduleNotificationAsync({
                    content: notificationContent,
                    trigger: { seconds: 1 },
                });
            }
        } catch(error) {
            console.log("Error handling new message:", error);
        }
    };
    
    useEffect(() => {
        const checkNotificationPermission = async () => {
            const { status } = await Notifications.getPermissionsAsync();
            if (status !== 'granted') {
                const { status: newStatus } = await Notifications.requestPermissionsAsync();
                if (newStatus !== 'granted') {
                    console.log('Notification permission not granted');
                    return;
                }
            }

            console.log('Notification permission granted');
        };

        checkNotificationPermission();
        dispatch(fetchProfile());
    }, []);

    useEffect(() => {
        console.log("Setting up socket listener...");
        if (socket) {
            socket.on('onNewMessage', handleNewMessage);
        }
    });

    return null; 
};

export default Notification;
