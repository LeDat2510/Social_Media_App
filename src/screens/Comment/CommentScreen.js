import { useNavigation } from '@react-navigation/native';
import { styles } from './CommentStyles';
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Button, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { addCommentData, AddToCommentPostLikes, CheckUserLikeComment, DeleteFromCommentPostLikes, getAllCommentData, getCommentPostLikeCount, getReplyCommentCount, getUserData } from '../../controllers/postControllers';
import moment from 'moment';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { AddToNotification, DeleteLikeCommentFromNotification } from '../../controllers/notificationControllers';

const CommentScreen = ({ route }) => {

    const userData = useSelector(state => state.user.userData);
    const { item } = route.params;
    const navigation = useNavigation();
    const [commentData, setCommentData] = useState([]);
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        const fetchCommentData = getAllCommentData(item.idpost, (data) => {
            setCommentData(data);
        })
        return fetchCommentData;
    }, [item.idpost])

    const addComment = async () => {
        const NewComment = {
            id_post: item.idpost,
            id_user: userData.uid,
            comment_content: commentText,
            date_comment: firestore.Timestamp.now(),
        }
        await addCommentData(NewComment);
        console.log(userData.userName)
        if (userData.uid !== item.id_user) {
            const dataCommentLikeNotification = {
                id_user: item.id_user,
                id_user_2: userData.uid,
                id_post: item.idpost,
                content: `${userData.user_name} đã bình luận trong bài đăng của bạn`,
                date_created: firestore.Timestamp.now()
            }
            await AddToNotification(dataCommentLikeNotification);
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={styles.backButton}
                >
                    <MaterialCommunityIcons name="arrow-left" size={32} strokeWidth={4.5} color={'#4A4A4A'} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Bình luận</Text>
            </View>

            <View style={styles.commentContainer}>
                <FlatList
                    data={commentData}
                    keyExtractor={(item) => item.idcomment}
                    numColumns={1}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Card item={item} navigation={navigation} />
                    )}
                    onEndReachedThreshold={0.1}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Nhập bình luận..."
                    value={commentText}
                    onChangeText={text => setCommentText(text)}
                />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={() => {
                        addComment();
                    }}
                >
                    <Text style={styles.sendButtonText}>OK</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const Card = ({ item, navigation }) => {

    const userData = useSelector(state => state.user.userData);
    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");
    const [isLike, setIsLike] = useState(false);
    const [replyCount, setReplyCount] = useState(0);
    const [commentLike, setCommentLike] = useState(0);

    useEffect(() => {
        const data = getUserData(item.id_user, (userData) => {
            if (userData) {
                setUserName(userData.user_name)
                setUserImage(userData.user_image);
            }
        });
        return data;
    }, [item.id_user])

    useEffect(() => {
        const CheckIsLike = CheckUserLikeComment(userData.uid, item.idcomment, (data) => {
            setIsLike(data);
        });
        return CheckIsLike;
    }, [userData.uid, item.idcomment])

    useEffect(() => {
        const getReplyCount = getReplyCommentCount(item.idcomment, (data) => {
            setReplyCount(data);
        })
        return getReplyCount;
    }, [item.idcomment])

    useEffect(() => {
        const commentPostLikeCount = getCommentPostLikeCount(item.idcomment, (data) => {
            setCommentLike(data);
        })
        return commentPostLikeCount;
    }, [item.idcomment])

    const handleLikePress = async () => {
        if (isLike) {
            await DeleteFromCommentPostLikes(item.idcomment, userData.uid);
            await DeleteLikeCommentFromNotification(item.idcomment, userData.uid);
        }
        else {
            const data = {
                id_comment: item.idcomment,
                id_user: userData.uid,
                date_like: firestore.Timestamp.now()
            }
            await AddToCommentPostLikes(data);
            if (userData.uid !== item.id_user) {
                const dataCommentLikeNotification = {
                    id_user: item.id_user,
                    id_user_2: userData.uid,
                    id_comment: item.idcomment,
                    content: `${userData.user_name} đã thích bình luận của bạn`,
                    date_created: firestore.Timestamp.now()
                }
                await AddToNotification(dataCommentLikeNotification);
            }
        }
        setIsLike(!isLike)
    }


    const formattedDate = moment(item.date_comment.toDate()).format('DD/MM/YYYY');

    return (
        <View style={styles.cardContainer}>
            <View key={item.idcomment} style={styles.card}>
                <View style={styles.cardHeader}>
                    {userImage && (
                        <Image
                            source={{ uri: userImage }}
                            style={styles.userImage}
                        />
                    )}
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.userName}>{userName}</Text>
                        <Text style={styles.date}>{formattedDate}</Text>
                    </View>
                </View>
                <View style={styles.commentContent}>
                    <Text style={styles.commentText}>{item.comment_content}</Text>
                </View>
                <View style={styles.actions}>
                    <MaterialCommunityIcons name={isLike ? 'thumb-up' : 'thumb-up-outline'} size={22} style={styles.likeIcon} color={isLike ? 'blue' : 'gray'} onPress={() => handleLikePress()} />
                    <Text style={styles.likeCount}>{commentLike}</Text>
                    <MaterialCommunityIcons name='comment-outline' size={22} onPress={() => navigation.navigate('ReplyComment', { Comment: item })} />
                </View>
                {replyCount !== 0 && (
                    <TouchableOpacity style={styles.replyButton} onPress={() => navigation.navigate('ReplyComment', { Comment: item })}>
                        <Text style={styles.replyText}>Xem thêm {replyCount} phản hồi</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}
export default CommentScreen;
