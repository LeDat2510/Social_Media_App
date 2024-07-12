import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from "./MessageDetailStyles";
import firestore from '@react-native-firebase/firestore';
import { useSelector } from "react-redux";
import moment from "moment";

const MessageDetailScreen = ({ route }) => {

    const { item } = route.params;
    const userData = useSelector(state => state.user.userData);
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();
    console.log(item.id)
    useEffect(() => {
        const messagesRef1 = firestore().collection('Messages')
            .where('user_text', '==', userData.uid)
            .where('user_receive', '==', item.id);

        const messagesRef2 = firestore().collection('Messages')
            .where('user_text', '==', item.id)
            .where('user_receive', '==', userData.uid);

        const unsubscribe1 = messagesRef1.onSnapshot((querySnapshot) => {
            const messages1 = querySnapshot.docs.map(doc => ({
                _id: doc.id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user_text: doc.data().user_text,
                user_receive: doc.data().user_receive,
                user: doc.data().user,
                userMessage: doc.data().userMessage
            }));

            const unsubscribe2 = messagesRef2.onSnapshot((querySnapshot) => {
                const messages2 = querySnapshot.docs.map(doc => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user_text: doc.data().user_text,
                    user_receive: doc.data().user_receive,
                    user: doc.data().user,
                    userMessage: doc.data().userMessage
                }));

                const mergedMessages = [...messages1, ...messages2].sort((a, b) => b.createdAt - a.createdAt);
                setMessages(mergedMessages);
            });

            return () => {
                unsubscribe1();
                unsubscribe2();
            };
        });
    }, [userData.uid, item.id]);

    const handleSend = useCallback((newMessages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, newMessages)
        );

        const { _id, createdAt, text, user } = newMessages[0];

        firestore().collection('Messages').add({
            _id,
            text,
            createdAt,
            user_text: userData.uid,
            user_receive: item.id,
            user,
        });
    }, []);

    return (
        <View style={styles.container} behavior="padding">
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={styles.backButton}
                >
                    <MaterialCommunityIcons name="arrow-left" size={32} strokeWidth={4.5} color={'#4A4A4A'} />
                </TouchableOpacity>
                {
                    item.user_image && (
                        <Image source={{ uri: item.user_image }} style={styles.avatar} />
                    )
                }
                <Text style={styles.headerText}>{item.user_name}</Text>
            </View>
            <GiftedChat
                messages={messages}
                showAvatarForEveryMessage={false}
                showUserAvatar={false}
                onSend={messages => handleSend(messages)}
                messagesContainerStyle={{
                    backgroundColor: '#fff'
                }}
                textInputStyle={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                }}
                user={{
                    _id: userData.uid,
                    avatar: userData.user_image
                }}
            />
        </View>
    )
}

export default MessageDetailScreen