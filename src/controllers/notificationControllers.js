import firestore from '@react-native-firebase/firestore';

export const getAllNotificationData = (uid, callback) => {
    try {
        const collectionRef = firestore().collection("Notifications").where('id_user', '==', uid)
        return collectionRef.onSnapshot((snapShot) => {
            const post = []
            snapShot.forEach((doc) => {
                const data = doc.data();
                const idnotifi = doc.id;
                post.push({ idnotifi, ...data });
            })
            callback(post);
        })
    } catch (error) {
        console.log(error);
        return [];
    }
}
export const AddToNotification = async (data) => {
    try {
        const FavoriteRef = firestore().collection('Notifications');
        await FavoriteRef.add(data);
        console.log('Thêm vào bảng thành công ');
    } catch (error) {
        console.error('Lỗi khi thêm vào bảng:', error);
    }
}

export const DeleteLikePostFromNotification = async (idPost, userId) => {
    try {
        const collectionRef = firestore().collection('Notifications')
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

export const DeleteLikeCommentFromNotification = async (idComment, userId) => {
    try {
        const collectionRef = firestore().collection('Notifications')
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