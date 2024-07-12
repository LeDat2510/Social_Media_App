import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, Alert, StatusBar } from "react-native";
import { styles } from "./LoginStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { getUserData } from "../../controllers/userControllers";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

const LoginScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const handleLogin = () => {
        if (email === "" || password === "") {
            setErrorMessage("Email hoặc Password rỗng");
            return;
        }
        else {
            setErrorMessage("")
            auth().signInWithEmailAndPassword(email, password)
                .then(async (userCredential) => {
                    const uid = userCredential.user.uid;
                    try {
                        const userData = await getUserData(uid);
                        dispatch(setUser({uid, ...userData}));
                        Alert.alert('Đăng nhập thành công');
                    } catch (error) {
                        setErrorMessage(error.message);
                    }
                }).catch(error =>
                    setErrorMessage(error.message)
                )
        }
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
                    <Text style={styles.greeting}>{'Chia sẻ mọi khoảnh khắc \n cùng với bạn'}</Text>
                    <View style={styles.errorMessage}>
                        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
                    </View>
                    <View style={styles.form}>
                        <View>
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
                    <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
                        <Text style={{ color: "#FFF", fontWeight: "500" }}>Đăng Nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }} onPress={() => navigation.navigate("Register")}>
                        <Text style={{ color: "#414959", fontSize: 13 }}>
                            Chưa có tài khoản ? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Đăng Ký</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default LoginScreen
