import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EFECF4"
    },
    header: {
        paddingTop: 20,
        paddingBottom: 16,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor:"#EBECF4",
        shadowOffset: { height: 5 } ,
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "500"
    },
    postHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "#454D65"
    },
    timestamp: {
        fontSize: 11,
        color: "#C4C6CE",
        marginTop: 4
    },
    post: {
        marginTop: 16,
        fontSize: 15,
        color: "#838899"
    },
    postImage: {
        width: undefined,
        height: 150,
        marginTop: 16
    },
    likeCount: {
        fontSize: 12,
        marginRight: 10,
        alignSelf: "center",
    },
    commentButton: {
        marginLeft: 5,
    },
    commentCount: {
        marginLeft: 5,
        fontSize: 12,
        alignSelf: "center",
    },
    postActions: {
        flexDirection: "row",
        marginTop: 5,
    },
});