import firestore from '@react-native-firebase/firestore';

export const getUserData = async (uid) => {
    try {
        const userDocument = await firestore().collection('Users').doc(uid).get();
        if (userDocument.exists) {
            return userDocument.data();
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateUserData = async (uid, NewDataUser) => {
    try {
        const useRef = firestore().collection('Users').doc(uid);
        await useRef.update(NewDataUser);
    } catch (error) {
        console.log('Lỗi khi cập nhật thông tin người dùng:', error);
    }
}

export const AddNewPost = async (NewPost) => {
    try {
        const postDocument = firestore().collection('Posts');
        await postDocument.add(NewPost);
        console.log('Đã thêm dữ liệu thành công');
    } catch (error) {
        console.error('Lỗi khi thêm dữ liệu:', error);
    }
} 

export const updatePostData = async (idpost, NewPostData) => {
    try {
        const useRef = firestore().collection('Posts').doc(idpost);
        await useRef.update(NewPostData);
    } catch (error) {
        console.log('Lỗi khi cập nhật thông tin blog:', error);
    }
}

export const deletePostData = async (uid) => {
    try {
        const FoodRef = firestore().collection('Posts').doc(uid);
        FoodRef.delete();
    } catch (error) {
        console.log('Lỗi khi xóa thông tin món ăn:', error)
    }
}
