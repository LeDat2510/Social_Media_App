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
    headerText: {
        fontSize: 20,
        marginLeft: 10,
        color: '#4A4A4A',
        flex: 1,
    },
    commentContainer: {
        marginBottom: 10,
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10,
    },
    inputContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f2f2f2',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    sendButton: {
        backgroundColor: '#E9446A',
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
        alignItems: 'center',
    },

    // Card styles
    sendButtonText: {
        color: 'white',
        fontSize: 16,
    },
    cardContainer: {
        paddingHorizontal: 4,
        flex: 1,
    },
    card: {
        marginTop: 10,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImage: {
        width: 50,
        height: 50,
        resizeMode: "cover",
        marginRight: 10,
        borderRadius: 9999,
    },
    headerTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 2,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 16,
        color: 'gray',
        marginTop: 3,
        marginLeft: 10,
    },
    commentContent: {
        marginTop: 10,
        marginLeft: 60,
    },
    commentText: {
        fontSize: 18,
    },
    actions: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 60,
    },
    likeIcon: {
        marginRight: 10,
    },
    likeCount: {
        marginRight: 15,
    },
    replyButton: {
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: 'white',
        marginLeft: 60,
    },
    replyText: {
        color: 'blue',
    },
});
