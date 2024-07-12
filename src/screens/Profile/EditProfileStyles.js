import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F6F2',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        borderBottomWidth: 2,
        backgroundColor: '#FFFFFF',
        paddingBottom: 10,
        paddingTop: 10,
    },
    title: {
        fontSize: 20,
        marginLeft: 10,
        color: '#4A4A4A',
    },
    profileContainer: {
        padding: 24,
        flexGrow: 1,
    },
    profileInfoContainer: {
        marginBottom: 24,
        flexGrow: 1,
    },
    profileImageContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 9999,
    },
    profileDetails: {
        flexGrow: 1,
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
    input: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
        marginBottom: 8,
    },
    inputControl: {
        height: 44,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: '500',
        color: '#222',
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#E9446A',
        borderColor: '#E9446A',
    },
    btnText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#fff',
    },
})