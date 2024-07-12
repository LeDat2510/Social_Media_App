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
    },
    cardContainer: {
        paddingHorizontal: 4,
        flex: 1,
    },
    card: {
        borderWidth: 0.5,
        borderColor: '#f2f2f2',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#f2f2f2',
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
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 16,
        color: 'gray',
        marginLeft: 10,
    },
    commentContent: {
        marginTop: 10,
        marginLeft: 52,
    },
    commentText: {
        fontSize: 18,
        marginLeft: 10,
    },
    replycommentText: {
        fontSize: 18,
        marginLeft: 2,
    },
    actions: {
        marginTop: 20,
        marginLeft: 63,
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeIcon: {
        marginRight: 10,
    },
    likeCount: {
        marginRight: 30,
    },
    replyButton: {
        marginTop: 10,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginLeft: 20,
    },
    replyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    replyDate: {        
        fontSize: 16,
        color: 'gray',
        marginLeft: 10,
    },
    replyContent: {
        marginTop: 10,
        marginLeft: 60,
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
    sendButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
