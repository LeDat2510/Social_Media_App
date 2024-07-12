import { addReplyPostCommentData, AddToCommentPostLikes, AddToReplyPostCommentLikes, CheckUserLikeComment, CheckUserLikeReplyComment, DeleteFromCommentPostLikes, DeleteFromReplyPostCommentLikes, getAllReplyPostComment, getCommentPostLikeCount, getReplyPostCommentLikeCount, getUserData } from "../../controllers/postControllers";
import moment from 'moment';
import { styles } from "./ReplyCommentStyles";
import { Alert, View, Text, ScrollView, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Button, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useRef, useState } from "react";
import { useNavigation } from '@react-navigation/native';

const ReplyCommentScreen = ({ route }) => {

    const userData = useSelector(state => state.user.userData);
    const { Comment } = route.params;
    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('');
    const [isLike, setIsLike] = useState(false);
    const [commentLike, setCommentLike] = useState(0);
    const [commentText, setCommentText] = useState('');
    const [replyCommentData, setReplyCommentData] = useState([]);
    const formattedDate = moment(Comment.date_comment.toDate()).format('DD/MM/YYYY');
    const navigation = useNavigation();

    useEffect(() => {
        const data = getUserData(Comment.id_user, (userData) => {
            if (userData) {
                setUserName(userData.user_name)
                setUserImage(userData.user_image);
            }
        });
        return data;
    }, [Comment.id_user])

    useEffect(() => {
        const CheckIsLike = CheckUserLikeComment(userData.uid, Comment.idcomment, (data) => {
            setIsLike(data);
        });
        return CheckIsLike;
    }, [userData.uid, Comment.idcomment])

    useEffect(() => {
        const commentPostLikeCount = getCommentPostLikeCount(Comment.idcomment, (data) => {
            setCommentLike(data);
        })
        return commentPostLikeCount;
    }, [Comment.idcomment])

    useEffect(() => {
        const fetchReplyCommentData = getAllReplyPostComment(Comment.idcomment, (data) => {
            setReplyCommentData(data);
        })
        return fetchReplyCommentData;
    }, [Comment.idcomment])

    const handleLikePress = async () => {
        if (Comment.id_post) {
            if (isLike) {
                await DeleteFromCommentPostLikes(Comment.idcomment, userData.uid);
            }
            else {
                const data = {
                    id_comment: Comment.idcomment,
                    id_user: userData.uid,
                    date_like: firestore.Timestamp.now()
                }
                await AddToCommentPostLikes(data);
            }
        }
        setIsLike(!isLike)
    }

    const addReplyComment = async () => {
        if (commentText == "") {
            Alert.alert("Vui lòng nhập bình luận !!");
        }
        else {
            const NewReplyComment = {
                id_comment: Comment.idcomment,
                id_post: Comment.id_post,
                id_user: userData.uid,
                comment_content: commentText,
                date_comment: firestore.Timestamp.now()
            }
            await addReplyPostCommentData(NewReplyComment);
            console.log("Thêm thành công");
        }
    }

    const textInputRef = useRef(null);

    const handleButtonPress = () => {
        textInputRef.current.focus();
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
                <Text style={styles.headerText}>Trả lời</Text>
            </View>

            <View style={styles.commentContainer}>
                <View style={styles.cardContainer}>
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            {userImage != "" && (
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
                            <Text style={styles.commentText}>{Comment.comment_content}</Text>
                        </View>
                        <View style={styles.actions}>
                            <MaterialCommunityIcons name={isLike ? 'thumb-up' : 'thumb-up-outline'} size={22} style={styles.likeIcon} color={isLike ? 'blue' : 'gray'} onPress={() => handleLikePress()} />
                            <Text style={styles.likeCount}>{commentLike}</Text>
                            <MaterialCommunityIcons name='comment-outline' size={22} onPress={() => handleButtonPress()} />
                        </View>
                    </View>
                    <View>
                        <FlatList
                            data={replyCommentData}
                            keyExtractor={(item) => item.idreply}
                            numColumns={1}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <Card item={item} />
                            )}
                            onEndReachedThreshold={0.1}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Nhập bình luận..."
                    ref={textInputRef}
                    value={commentText}
                    onChangeText={text => setCommentText(text)}
                />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={() => {
                        addReplyComment();
                    }}
                >
                    <Text style={styles.sendButtonText}>OK</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const Card = ({ item }) => {

    const userData = useSelector(state => state.user.userData);
    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('');
    const [isLike, setIsLike] = useState(false);
    const [replyCommentLike, setReplyCommentLike] = useState(0);

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
        const CheckIsLike = CheckUserLikeReplyComment(userData.uid, item.idreply, (data) => {
            setIsLike(data);
        });
        return CheckIsLike;
    }, [userData.uid, item.idreply])

    useEffect(() => {
        const commentPostLikeCount = getReplyPostCommentLikeCount(item.idreply, (data) => {
            setReplyCommentLike(data);
        })
        return commentPostLikeCount;
    }, [item.idreply])

    const handleLikePress = async () => {
        if (item.id_post) {
            if (isLike) {
                await DeleteFromReplyPostCommentLikes(item.idreply, userData.uid);
            }
            else {
                const data = {
                    id_reply: item.idreply,
                    id_user: userData.uid,
                    id_post: item.id_post,
                    date_like: firestore.Timestamp.now()
                }
                await AddToReplyPostCommentLikes(data);
            }
        }
        setIsLike(!isLike)
    }

    const formattedDate = moment(item.date_comment.toDate()).format('DD/MM/YYYY');

    return (
        <View style={styles.cardContainer}>
            <View key={item.idreply} style={styles.replyButton}>
                <View style={styles.replyHeader}>
                    {userImage && (
                        <Image
                            source={{ uri: userImage }}
                            style={styles.userImage}
                        />
                    )}
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.userName}>{userName}</Text>
                        <Text style={styles.replyDate}>{formattedDate}</Text>
                    </View>
                </View>
                <View style={styles.replyContent}>
                    <Text style={styles.replycommentText}>{item.comment_content}</Text>
                </View>
                <View style={styles.actions}>
                    <MaterialCommunityIcons name={isLike ? 'thumb-up' : 'thumb-up-outline'} size={22} style={styles.likeIcon} color={isLike ? 'blue' : 'gray'} onPress={() => handleLikePress()} />
                    <Text style={styles.likeCount}>{replyCommentLike}</Text>
                </View>
            </View>
        </View>
    )
}

export default ReplyCommentScreen