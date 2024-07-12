import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { styles } from "./HomeStyles";
import { useSelector } from "react-redux";
import { AddToPostLikes, CheckUserLike, DeleteFromPostLikes, getAllPostData, getPostCommentCount, getPostLikeCount, getReplyPostCommentCount, getUserData } from "../../controllers/postControllers";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import firestore from '@react-native-firebase/firestore';
import { AddToNotification, DeleteLikePostFromNotification } from "../../controllers/notificationControllers";

const HomeScreen = () => {

    const navigation = useNavigation();
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        const getPostData = getAllPostData((data) => {
            setPostData(data);
        });
        return () => {
            getPostData();
        };
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Bài Đăng</Text>
            </View>
            <FlatList
                style={styles.feed}
                data={postData}
                renderItem={({ item }) => <Card item={item} navigation={navigation} />}
                keyExtractor={item => item.idpost}
                showsVerticalScrollIndicator={false}
            />
        </View >
    );
}

const Card = ({ item, navigation }) => {

    const userData = useSelector(state => state.user.userData);
    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");
    const [isLike, setIsLike] = useState(false);
    const [postCommentCount, setPostCommentCount] = useState(0);
    const [replyPostCommentCount, setReplyPostCommentCount] = useState(0);
    const [postLikeCount, setPostLikeCount] = useState(0);
    const totalCount = postCommentCount + replyPostCommentCount;

    useEffect(() => {
        const CheckIsLike = CheckUserLike(userData.uid, item.idpost, (data) => {
            setIsLike(data);
        });
        return CheckIsLike;
    }, [userData.uid, item.idpost])

    useEffect(() => {
        const unsubscribe1 = getPostCommentCount(item.idpost, (data) => {
            setPostCommentCount(data);
        });

        const unsubscribe2 = getReplyPostCommentCount(item.idpost, (data) => {
            setReplyPostCommentCount(data)
        });

        const PostLikeCount = getPostLikeCount(item.idpost, (data) => {
            setPostLikeCount(data)
        })

        return () => {
            unsubscribe1();
            unsubscribe2();
            PostLikeCount();
        };
    }, [item.idpost]);

    useEffect(() => {
        const data = getUserData(item.id_user, (userData) => {
            if (userData) {
                setUserName(userData.user_name)
                setUserImage(userData.user_image);
            }
        });
        return data;
    }, [item.id_user])

    const handleLikePress = async () => {
        if (isLike) {
            await DeleteFromPostLikes(item.idpost, userData.uid);
            await DeleteLikePostFromNotification(item.idpost, userData.uid);
        }
        else {
            const dataPostLike = {
                id_post: item.idpost,
                id_user: userData.uid,
                date_like: firestore.Timestamp.now()
            }
            await AddToPostLikes(dataPostLike);
            if (userData.uid !== item.id_user) {
                const dataPostLikeNotification = {
                    id_user: item.id_user,
                    id_user_2: userData.uid,
                    id_post: item.idpost,
                    content: `${userData.user_name} đã thích bài đăng của bạn`,
                    date_created: firestore.Timestamp.now()
                };
                await AddToNotification(dataPostLikeNotification);
            }
        }
        setIsLike(!isLike)
    }

    return (
        <View style={styles.feedItem}>
            {
                userImage && (
                    <Image source={{ uri: userImage }} style={styles.avatar} />
                )
            }
            <View style={{ flex: 1 }}>
                <View style={styles.postHeader}>
                    <View>
                        <Text style={styles.name}>{userName}</Text>
                        <Text style={styles.timestamp}>{moment(item.date_posted.toDate()).fromNow()}</Text>
                    </View>
                    <Ionicons name="ellipsis-horizontal" size={24} color="#73788B" />
                </View>
                <Text style={styles.post}>{item.post_content}</Text>
                <Image source={{ uri: item.post_image }} style={styles.postImage} />
                <View style={styles.postActions}>
                    <TouchableOpacity onPress={handleLikePress}>
                        <Ionicons name={isLike ? "heart" : "heart-outline"} color={isLike ? "red" : "black"} size={24} style={{ marginRight: 5 }} />
                    </TouchableOpacity>
                    <Text style={styles.likeCount}>{postLikeCount}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Comment', { item })}>
                        <Ionicons name="chatbubble-outline" size={24} />
                    </TouchableOpacity>
                    <Text style={styles.commentCount}>{totalCount}</Text>
                </View>
            </View>
        </View>
    )
}

export default HomeScreen
