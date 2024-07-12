import React, { useState } from "react";
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Alert, StatusBar } from "react-native";
import { styles } from "./RegisterStyles";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import Ionicons from 'react-native-vector-icons/Ionicons'

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const DefaultImage = "https://firebasestorage.googleapis.com/v0/b/sm-app-6c561.appspot.com/o/User%2Flogo_user.jpg?alt=media&token=430d52fd-0d88-41ae-ad40-84de4d441b91"

    const handleRegister = () => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                const { user } = response;
                const userID = user.uid;

                const userref = firestore().collection('Users').doc(userID);

                userref.set({
                    user_name: username,
                    email: email,
                    user_image: DefaultImage,
                    date_created: firestore.Timestamp.now(),
                    description: '',
                    role: false
                })
                console.log('User account created & signed in!');
                Alert.alert('Đăng ký thành công')
                navigation.navigate("Login")
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setErrorMessage('That email address is already in use!');
                }
                if (error.code === 'auth/invalid-email') {
                    setErrorMessage('That email address is invalid!')
                }
            });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <StatusBar barStyle="light-content"></StatusBar>
                <View style={styles.container}>
                    <Image
                        alt=""
                        resizeMode="contain"
                        style={styles.headerImg}
                        source={require('../../assets/logo.png')}
                    />
                    <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-circle" size={35} color="black"></Ionicons>
                    </TouchableOpacity>
                    <Text style={styles.greeting}>{'Chia sẻ mọi khoảnh khắc \n cùng với bạn'}</Text>
                    <View style={styles.errorMessage}>
                        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
                    </View>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.inputTitle}>Tên người dùng:</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                onChangeText={username => setUsername(username)}
                                value={username}>
                            </TextInput>
                        </View>
                        <View style={{ marginTop: 32 }}>
                            <Text style={styles.inputTitle}>Email:</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                onChangeText={email => setEmail(email)}
                                value={email}>
                            </TextInput>
                        </View>
                        <View style={{ marginTop: 32 }}>
                            <Text style={styles.inputTitle}>Mật Khẩu:</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry
                                autoCapitalize="none"
                                onChangeText={password => setPassword(password)}
                                value={password}>
                            </TextInput>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => handleRegister()}>
                        <Text style={{ color: "#FFF", fontWeight: "500" }}>Đăng ký</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }} onPress={() => navigation.navigate("Login")}>
                        <Text style={{ color: "#414959", fontSize: 13 }}>
                            Đã có tài khoản ? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Đăng nhập</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

export default RegisterScreen
