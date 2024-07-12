import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        backgroundColor: "#fff",
        justifyContent: 'center'
    },
    headerImg: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 10,
    },
    greeting: {
        marginTop: 32,
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center"
    },
    errorMessage: {
        height: 72,
        fontWeight: "bold",
        color: "#E9446A",
        marginHorizontal: 30,
        marginTop: 10,
        textAlign: "center"
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    back: {
        position: "absolute",
        top: 30,
        left: 25,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(21, 22, 48, 0.1)",
        alignItems: "center",
        justifyContent: "center"
    },
});