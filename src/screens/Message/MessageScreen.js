import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./MessageStyles";
import { useSelector } from "react-redux";
import { getAllUsersExceptCurrent } from "../../controllers/postControllers";
import { useNavigation } from "@react-navigation/native";

const MessageScreen = () => {

    const navigation = useNavigation();
    const userData = useSelector(state => state.user.userData);
    const [allUserData, setAllUserData] = useState([]);

    useEffect(() => {
        const data = getAllUsersExceptCurrent(userData.uid, (userData) => {
            if (userData) {
                setAllUserData(userData);
            }
        });
        return data;
    }, [userData.uid])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Chat</Text>
            </View>
            <FlatList
                style={styles.feed}
                data={allUserData}
                renderItem={({ item }) => <Card item={item} navigation={navigation} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View >
    );
}

const Card = ({ item, navigation }) => {

    return (
        <TouchableOpacity onPress={() => navigation.navigate('MessageDetail', { item })}>
            <View key={item.id} style={styles.feedItem}>
                {
                    item.user_image && (
                        <Image source={{ uri: item.user_image }} style={styles.avatar} />
                    )
                }
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Text style={styles.name}>{item.user_name}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default MessageScreen
