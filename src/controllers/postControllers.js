import firestore from '@react-native-firebase/firestore';

export const getAllPostData = (callback) => {
    try {
        const collectionRef = firestore().collection("Posts")
        return collectionRef.onSnapshot((snapShot) => {
            const post = []
            snapShot.forEach((doc) => {
                const data = doc.data();
                const idpost = doc.id;
                post.push({ idpost, ...data });
            })
            callback(post);
        })
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getUserData = (uid, callback) => {
    try {
        const useRef = firestore().collection('Users').doc(uid);

        return useRef.onSnapshot((useDoc) => {
            if (useDoc.exists) {
                const userData = useDoc.data();
                callback(userData);
            } else {
                console.log('Không tìm thấy người dùng với UID đã cho');
                callback(null);
            }
        });
    } catch (error) {
        console.log('Lỗi khi lấy thông tin người dùng:', error);
        callback(null);
    }
};

export const getAllPostDataWithUser = (uid, callback) => {
    try {
        const collectionRef = firestore().collection('Posts');

        return collectionRef.where('id_user', '==', uid)
            .onSnapshot((snapShot) => {
                const post = []
                snapShot.forEach((doc) => {
                    const data = doc.data();
                    const idpost = doc.id;
                    post.push({ idpost, ...data })
                })
                post.sort((a, b) => b.date_posted - a.date_posted);
                callback(post);
            })
    } catch (error) {
        console.log(error)
        return []
    }
}

export const CheckUserLike = (userId, idpost, callback) => {
    const favoriteRef = firestore().collection('PostLikes');
    return favoriteRef
        .where('id_user', '==', userId)
        .where('id_post', '==', idpost)
        .onSnapshot((querySnapshot) => {
            if (!querySnapshot.empty) {
                callback(true);
            }
            else {
                callback(false);
            }
        }, (error) => {
            console.log('Error checking favorite existence:', error);
            callback(false);
        });
}

export const getPostLikeCount = (idPost, callback) => {
    try {
        const collectionRef = firestore().collection("PostLikes");
        const query = collectionRef.where("id_post", "==", idPost);

        return query.onSnapshot((querySnapshot) => {
            const count = querySnapshot.size;
            callback(count);
        });
    } catch (error) {
        console.log(error);
        return;
    }
};

export const getPostCommentCount = (idBlog, callback) => {
    try {
        const collectionRef = firestore().collection("PostComments");
        const query = collectionRef.where("id_post", "==", idBlog);

        return query.onSnapshot((querySnapshot) => {
            const count = querySnapshot.size;
            callback(count);
        });
    } catch (error) {
        console.log(error);
        return;
    }
};

export const getReplyPostCommentCount = (idPost, callback) => {
    try {
        const collectionRef = firestore().collection("ReplyPostComments");
        const query = collectionRef.where("id_post", "==", idPost);

        return query.onSnapshot((querySnapshot) => {
            const count = querySnapshot.size;
            callback(count);
        });
    } catch (error) {
        console.log(error);
        return;
    }
};

export const DeleteFromPostLikes = async (idPost, userId) => {
    try {
        const collectionRef = firestore().collection('PostLikes')
        const query = await collectionRef.where('id_post', '==', idPost).where('id_user', '==', userId).get();
        if (!query.empty) {
            query.forEach((doc) => {
                doc.ref.delete();
            })
            console.log('Đã xóa dữ liệu thành công');
        } else {
            console.log('Không tìm thấy dữ liệu cần xóa');
        }

    } catch (error) {
        console.error('Lỗi khi xóa dữ liệu:', error);
    }
}

export const AddToPostLikes = async (data) => {
    try {
        const FavoriteRef = firestore().collection('PostLikes');
        await FavoriteRef.add(data);
        console.log('Thêm vào bảng thành công ');
    } catch (error) {
        console.error('Lỗi khi thêm vào bảng:', error);
    }
}

export const getAllCommentData = (idpost, callback) => {
    try {
        const collectionRef = firestore().collection("PostComments");
        return collectionRef.where("id_post", "==", idpost).onSnapshot((snapShot) => {
            const comment = []
            snapShot.forEach((doc) => {
                const data = doc.data();
                const idcomment = doc.id;
                comment.push({ idcomment, ...data });
            })
            callback(comment);
        })
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const CheckUserLikeComment = (userId, idComment, callback) => {
    try {
        const favoriteRef = firestore().collection('CommentPostLikes');
        return favoriteRef
            .where('id_user', '==', userId)
            .where('id_comment', '==', idComment)
            .onSnapshot((querySnapshot) => {
                if (!querySnapshot.empty) {
                    callback(true);
                }
                else {
                    callback(false);
                }
            })
    } catch (error) {
        console.log('Lỗi khi kiểm tra:', error);
        callback(false);
    }
}

export const getReplyCommentCount = (idComment, callback) => {
    try {
        const collectionRef = firestore().collection("ReplyPostComments");
        const query = collectionRef.where("id_comment", "==", idComment);

        return query.onSnapshot((querySnapshot) => {
            const count = querySnapshot.size;
            callback(count);
        });
    } catch (error) {
        console.log(error);
        return;
    }
};

export const getCommentPostLikeCount = (idComment, callback) => {
    try {
        const collectionRef = firestore().collection("CommentPostLikes");
        const query = collectionRef.where("id_comment", "==", idComment);
        return query.onSnapshot((querySnapshot) => {
            const count = querySnapshot.size;
            callback(count);
        });
    } catch (error) {
        console.log(error);
        return;
    }
};

export const addCommentData = async (commentData) => {
    try {
        const collectionRef = firestore().collection('PostComments');
        await collectionRef.add(commentData);
        console.log('Đã thêm comment mới vào Firestore');
    } catch (error) {
        console.error('Lỗi khi thêm comment mới vào Firestore:', error);
    }
}

export const AddToCommentPostLikes = async (data) => {
    try {
        const FavoriteRef = firestore().collection('CommentPostLikes');
        await FavoriteRef.add(data);
        console.log('Thêm vào bảng thành công ');
    } catch (error) {
        console.error('Lỗi khi thêm vào bảng:', error);
    }
}

export const DeleteFromCommentPostLikes = async (idComment, userId) => {
    try {
        const collectionRef = firestore().collection('CommentPostLikes')
        const query = await collectionRef.where('id_comment', '==', idComment).where('id_user', '==', userId).get();
        if (!query.empty) {
            query.forEach((doc) => {
                doc.ref.delete();
            })
            console.log('Đã xóa dữ liệu thành công');
        } else {
            console.log('Không tìm thấy dữ liệu cần xóa');
        }

    } catch (error) {
        console.error('Lỗi khi xóa dữ liệu:', error);
    }
}

export const getAllReplyPostComment = (idcomment, callback) => {
    try {
        const collectionRef = firestore().collection("ReplyPostComments");
        return collectionRef.where("id_comment", "==", idcomment).onSnapshot((snapShot) => {
            const comment = []
            snapShot.forEach((doc) => {
                const data = doc.data();
                const idreply = doc.id;
                comment.push({ idreply, ...data });
            })
            callback(comment);
        })
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const addReplyPostCommentData = async (commentData) => {
    try {
        const collectionRef = firestore().collection('ReplyPostComments');
        await collectionRef.add(commentData);
        console.log('Đã thêm comment mới vào Firestore');
    } catch (error) {
        console.error('Lỗi khi thêm comment mới vào Firestore:', error);
    }
}

export const CheckUserLikeReplyComment = (userId, idReply, callback) => {
    try {
        const favoriteRef = firestore().collection('ReplyPostCommentLikes');
        return favoriteRef
            .where('id_user', '==', userId)
            .where('id_reply', '==', idReply)
            .onSnapshot((querySnapshot) => {
                if (!querySnapshot.empty) {
                    callback(true);
                }
                else {
                    callback(false);
                }
            })
    } catch (error) {
        console.log('Error checking favorite existence:', error);
        callback(false);
    }
}

export const getReplyPostCommentLikeCount = (idReply, callback) => {
    try {
        const collectionRef = firestore().collection("ReplyPostCommentLikes");
        const query = collectionRef.where("id_reply", "==", idReply);
        return query.onSnapshot((querySnapshot) => {
            const count = querySnapshot.size;
            callback(count);
        });
    } catch (error) {
        console.log(error);
        return;
    }
};

export const DeleteFromReplyPostCommentLikes = async (idReply, userId) => {
    try {
        const collectionRef = firestore().collection('ReplyPostCommentLikes')
        const query = await collectionRef.where('id_reply', '==', idReply).where('id_user', '==', userId).get();
        if (!query.empty) {
            query.forEach((doc) => {
                doc.ref.delete();
            })
            console.log('Đã xóa dữ liệu thành công');
        } else {
            console.log('Không tìm thấy dữ liệu cần xóa');
        }

    } catch (error) {
        console.error('Lỗi khi xóa dữ liệu:', error);
    }
}

export const AddToReplyPostCommentLikes = async (data) => {
    try {
        const FavoriteRef = firestore().collection('ReplyPostCommentLikes');
        await FavoriteRef.add(data);
        console.log('Thêm vào bảng thành công ');
    } catch (error) {
        console.error('Lỗi khi thêm vào bảng:', error);
    }
}

export const getAllUsersExceptCurrent = (currentUserId, callback) => {
    try {
        const usersRef = firestore().collection('Users');
        
        return usersRef.onSnapshot((snapshot) => {
            if (!snapshot.empty) {
                const users = snapshot.docs
                    .map(doc => ({ id: doc.id, ...doc.data() }))
                    .filter(user => user.id !== currentUserId);
                
                callback(users);
            } else {
                console.log('Không tìm thấy người dùng nào');
                callback([]);
            }
        });
    } catch (error) {
        console.log('Lỗi khi lấy thông tin người dùng:', error);
        callback([]);
    }
};

