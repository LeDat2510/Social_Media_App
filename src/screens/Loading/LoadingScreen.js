import React from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import { styles } from "./LoadingStyles";

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                alt=""
                resizeMode="contain"
                style={styles.headerImg}
                source={require('../../assets/logo.png')}
            />
            <Text style={{marginBottom: 10, marginTop: 10}}>Đang tải. Xin vui lòng đợi ...</Text>
            <ActivityIndicator size="large"></ActivityIndicator>
        </View>
    )
}

export default LoadingScreen
