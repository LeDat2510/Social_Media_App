import React, { useEffect, useState } from "react";
import { View, Text, Image, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./ProfileStyles";
import { useDispatch, useSelector } from "react-redux";
import { AddToPostLikes, CheckUserLike, DeleteFromPostLikes, getAllPostDataWithUser, getPostCommentCount, getPostLikeCount, getReplyPostCommentCount, getUserData } from "../../controllers/postControllers";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore';
import moment from "moment";
import { clearUser } from "../../store/userSlice";
import DialogPopup from "../../components/DialogPopup";
import { Menu } from "react-native-paper";

const ProfileScreen = () => {
    const navigation = useNavigation();
    const userData = useSelector(state => state.user.userData);
    const dispatch = useDispatch();
    const [postData, setPostData] = useState([]);

    const Logout = () => {
        dispatch(clearUser());
    }

    useEffect(() => {
        const getPostData = getAllPostDataWithUser(userData.uid, (data) => {
            setPostData(data);
        });
        return () => {
            getPostData();
        };
    }, [userData.uid]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profileContainer}>
                    {userData.user_image && (
                        <View style={styles.profileImageContainer}>
                            <Image
                                alt=""
                                source={{ uri: userData.user_image }}
                                style={styles.profileImage}
                            />
                        </View>
                    )}
                    <View style={styles.profileDetails}>
                        <Text style={styles.userName}>{userData.user_name}</Text>
                        <Text style={styles.userEmail}>{userData.email}</Text>
                    </View>
                </View>
                {userData.description && (
                    <Text style={styles.description}>{userData.description}</Text>
                )}
                <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('EditProfile')}
                    >
                        <Text style={styles.actionButtonText}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => Logout()}
                    >
                        <Text style={styles.actionButtonText}>Đăng Xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.cardHeader}>
                    <Text style={styles.headerTitle}>Tất Cả Bài Đăng</Text>
                </View>
                <FlatList
                    style={styles.feed}
                    data={postData}
                    renderItem={({ item }) => <Card item={item} navigation={navigation} />}
                    keyExtractor={item => item.idpost}
                    showsVerticalScrollIndicator={false}
                />
            </View >
        </SafeAreaView>
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

    const [visible, setVisible] = useState(false);
    const [visibleDialog, setVisibleDialog] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const openDialogPopup = () => {
        setVisibleDialog(true);
    };

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
        }
        else {
            const data = {
                id_post: item.idpost,
                id_user: userData.uid,
                date_like: firestore.Timestamp.now()
            }
            await AddToPostLikes(data);
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
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>
                        <Text style={styles.name}>{userName}</Text>
                        <Text style={styles.timestamp}>{moment(item.date_posted.toDate()).fromNow()}</Text>
                    </View>
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                            <TouchableOpacity style={{ flex: 1, marginTop: 10 }} onPress={openMenu}>
                                <Ionicons name="ellipsis-horizontal" size={24} color="#73788B" />
                            </TouchableOpacity>
                        }
                        contentStyle={{ backgroundColor: '#ffffff' }}
                    >
                        <Menu.Item onPress={() => {
                            closeMenu()
                            navigation.navigate('EditPost', { item })
                        }} title="Sửa" />
                        <Menu.Item onPress={() => {
                            openDialogPopup()
                            closeMenu()
                        }} title="Xóa" />
                    </Menu>
                </View>
                <Text style={styles.post}>{item.post_content}</Text>
                <Image source={{ uri: item.post_image }} style={styles.postImage} />
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                    <TouchableOpacity onPress={handleLikePress}>
                        <Ionicons name={isLike ? "heart" : "heart-outline"} color={isLike ? "red" : "black"} size={24} style={{ marginRight: 5 }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 12, marginRight: 10, alignSelf: "center" }}>{postLikeCount}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Comment', { item })}>
                        <Ionicons name="chatbubble-outline" size={24} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 12, marginLeft: 5, alignSelf: "center" }}>{totalCount}</Text>
                </View>
            </View>
            <DialogPopup visible={visibleDialog} hideDialog={() => setVisibleDialog(false)} item={item} />
        </View>
    )
}

export default ProfileScreen
