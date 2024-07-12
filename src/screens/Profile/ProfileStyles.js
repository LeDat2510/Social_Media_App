import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F6F2',
    },
    header: {
        backgroundColor: '#FCFCFB',
        paddingVertical: 20,
        paddingHorizontal: 24,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    profileImageContainer: {
        position: 'relative',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 9999,
    },
    profileDetails: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        marginTop: 12,
        paddingLeft: 16,
    },
    userName: {
        fontSize: 28,
        fontWeight: 'bold',
        lineHeight: 32,
        color: '#4A4A4A',
        marginBottom: 6,
    },
    userEmail: {
        marginLeft: 2,
        fontSize: 15,
        fontWeight: '600',
        color: '#767676',
    },
    description: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 18,
        color: '#778599',
        marginLeft: 10,
        marginBottom: 10,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    actionButton: {
        flex: 1,
        margin: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    actionButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 32,
        color: '#4A4A4A',
        marginBottom: 6,
        alignSelf: 'center',
    },
    cardContainer: {
        flex: 1,
        backgroundColor: "#EFECF4"
    },
    cardHeader: {
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
    }
});
