import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        borderBottomWidth: 2,
        backgroundColor: '#FFFFFF',
        paddingBottom: 10,
        paddingTop: 10,
    },
    backButton: {
        padding: 2,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'white',
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16,
    },
    headerText: {
        fontSize: 20,
        color: '#4A4A4A',
        flex: 1,
    },
});