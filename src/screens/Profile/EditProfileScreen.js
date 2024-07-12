import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImageCropPicker from 'react-native-image-crop-picker'
import storage from '@react-native-firebase/storage'
import { useDispatch, useSelector } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getUserData } from '../../controllers/postControllers'
import { setUser } from '../../store/userSlice'
import { updateUserData } from '../../controllers/userControllers'
import { styles } from './EditProfileStyles'

const EditProfileScreen = () => {

    const userData = useSelector(state => state.user.userData);
    const uid = userData.uid;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [userImage, setUserImage] = useState('');
    const [userName, setUserName] = useState('');
    const [userNewName, setUserNewName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');

    const openImagePicker = () => {
        ImageCropPicker.openPicker({
            mediaType: 'photo',
            cropping: true,
            includeBase64: false,
            includeExif: true,
        })
            .then(async (image) => {
                const source = image.path;
                const ImageUrl = await uploadImageToFirebaseStorage(source)
                setUserImage(ImageUrl);
            })
            .catch((error) => {
                console.log('ImagePicker Error: ', error);
            });
    };

    const uploadImageToFirebaseStorage = async (imagePath) => {
        const imageFileName = imagePath.substring(imagePath.lastIndexOf('/') + 1);
        const reference = storage().ref(`images/users/${imageFileName}`);

        await reference.putFile(imagePath);

        const imageUrl = await reference.getDownloadURL();
        return imageUrl;
    };

    useFocusEffect(
        useCallback(() => {
            const fetchUserData = () => {
                getUserData(userData.uid, (data) => {
                    if (data) {
                        setUserImage(data.user_image);
                        setUserName(data.user_name);
                        setUserNewName(data.user_name)
                        setEmail(data.email);
                        setDescription(data.description);
                    }
                });
            };
            fetchUserData();
            return () => { };
        }, [userData.uid])
    );

    const handleUpdateUserData = async () => {
        if (userNewName == '') {
            Alert.alert('Vui lòng nhập tên người dùng')
        }
        else {
            const newData = {
                user_name: userNewName,
                email: email,
                user_image: userImage,
                description: description
            };
            await updateUserData(userData.uid, newData);
            dispatch(setUser({ uid, ...newData }));
            navigation.goBack();
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="arrow-left" size={32} strokeWidth={4.5} color={'#4A4A4A'} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
                <Text style={styles.title}>Sửa thông tin</Text>
            </View>
            <View style={styles.profileContainer}>
                <View style={styles.profileInfoContainer}>
                    <View style={styles.profileImageContainer}>
                        {userImage && (
                            <TouchableOpacity onPress={openImagePicker}>
                                <Image source={{ uri: userImage }} style={styles.profileImage} />
                            </TouchableOpacity>
                        )}
                        <View style={styles.profileDetails}>
                            <Text style={styles.userName}>{userName}</Text>
                            <Text style={styles.userEmail}>{email}</Text>
                        </View>
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Tên người dùng: </Text>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={userNewName}
                            onChangeText={Text => setUserNewName(Text)}
                            placeholderTextColor="#6b7280"
                            style={styles.inputControl} />
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Email: </Text>
                        <TextInput
                            editable={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            value={email}
                            onChangeText={Text => setEmail(Text)}
                            placeholderTextColor="#6b7280"
                            style={styles.inputControl} />
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Mô tả bản thân: </Text>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={description}
                            onChangeText={Text => setDescription(Text)}
                            placeholderTextColor="#6b7280"
                            style={styles.inputControl} />
                    </View>

                    <View style={{ marginVertical: 24 }}>
                        <TouchableOpacity
                            onPress={() => {
                                handleUpdateUserData();
                            }}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>Lưu thông tin</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default EditProfileScreen