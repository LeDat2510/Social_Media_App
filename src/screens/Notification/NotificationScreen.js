import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./NotificationStyles";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getAllNotificationData } from "../../controllers/notificationControllers";
import { getUserData } from "../../controllers/postControllers";

const NotificationScreen = () => {
    const userData = useSelector(state => state.user.userData);
    const navigation = useNavigation();
    const [notificationData, setNotificationData] = useState([]);

    useEffect(() => {
        const data = getAllNotificationData(userData.uid, (Data) => {
            if (Data) {
                setNotificationData(Data);
            }
        });
        return data;
    }, [userData.uid])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Thông Báo</Text>
            </View>
            <FlatList
                style={styles.feed}
                data={notificationData}
                renderItem={({ item }) => <Card item={item} navigation={navigation} />}
                keyExtractor={item => item.idnotifi}
                showsVerticalScrollIndicator={false}
            />
        </View >
    );
}

const Card = ({ item, navigation }) => {

    const [userImage, setUserImage] = useState("");

    useEffect(() => {
        const data = getUserData(item.id_user_2, (userData) => {
            if (userData) {
                setUserImage(userData.user_image);
            }
        });
        return data;
    }, [item.id_user_2])

    return (
        <View key={item.idnotifi} style={styles.feedItem}>
            {
                userImage && (
                    <Image source={{ uri: userImage }} style={styles.avatar} />
                )
            }
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>
                        <Text style={styles.content}>{item.content}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default NotificationScreen
