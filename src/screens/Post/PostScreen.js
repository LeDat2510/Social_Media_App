import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import { styles } from "./PostStyles";
import { useSelector } from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImageCropPicker from 'react-native-image-crop-picker';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore'
import { AddNewPost } from "../../controllers/userControllers";

const PostScreen = () => {
    const navigation = useNavigation();
    const userData = useSelector(state => state.user.userData);
    const [postContent, setPostContent] = useState("");
    const [postImage, setPostImage] = useState("");

    const uploadImageToFirebaseStorage = async (imagePath) => {
        const imageFileName = imagePath.substring(imagePath.lastIndexOf('/') + 1);
        const reference = storage().ref(`images/Posts/${imageFileName}`);

        await reference.putFile(imagePath);

        const imageUrl = await reference.getDownloadURL();
        return imageUrl;
    };

    const openImagePicker = async () => {
        try {
            const image = await ImageCropPicker.openPicker({
                mediaType: 'photo',
                cropping: true,
                includeBase64: false,
                includeExif: true,
            });

            const imagePath = image.path;
            const imageUrl = await uploadImageToFirebaseStorage(imagePath);
            setPostImage(imageUrl);
            console.log(imageUrl);

        } catch (error) {
            console.log('ImagePicker Error: ', error);
        }
    };

    const clearData = () => {
        setPostContent("");
        setPostImage("");
    }

    const SavePostData = async () => {
        if (!postImage) {
            Alert.alert('Vui lòng chọn hình ảnh cho bài đăng');
            return;
        }
        else {
            const NewPost = {
                id_user: userData.uid,
                post_content: postContent,
                post_image: postImage,
                date_posted: firestore.Timestamp.now()
            }
            const hasNullValues = Object.values(NewPost).some(value => 
                value === null || value === undefined 
            );

            if (hasNullValues) {
                Alert.alert('Vui lòng kiểm tra lại từng thông tin !!');
                return;
            }
            else 
            {
                await AddNewPost(NewPost);
                Alert.alert('Thêm bài viết thành công !!');
                clearData();
                navigation.goBack();
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={32} color="black"></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={SavePostData}>
                        <Text style={{ fontWeight: "500", fontSize: 20, color: "black" }}>Đăng Bài</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Image source={{ uri: userData.user_image }} style={styles.avatar}></Image>
                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        style={{ flex: 1 }}
                        placeholder="Hãy viết gì đó ..."
                        value={postContent}
                        onChangeText={setPostContent}
                    ></TextInput>
                </View>
                <TouchableOpacity style={styles.photo} onPress={openImagePicker}>
                    <Ionicons name="camera" size={32} color="black"></Ionicons>
                </TouchableOpacity >
                <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
                    {
                        postImage && <Image source={{ uri: postImage }} style={{ width: "100%", height: "100%", borderRadius: 10, resizeMode: "cover" }}></Image>
                    }
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

export default PostScreen
