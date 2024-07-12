import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LoginScreen from '../screens/Login/LoginScreen'
import HomeScreen from '../screens/Home/HomeScreen'
import RegisterScreen from '../screens/Register/RegisterScreen'
import MessageScreen from '../screens/Message/MessageScreen'
import ProfileScreen from '../screens/Profile/ProfileScreen'
import NotificationScreen from '../screens/Notification/NotificationScreen'
import PostScreen from '../screens/Post/PostScreen'
import CommentScreen from '../screens/Comment/CommentScreen'
import EditProfileScreen from '../screens/Profile/EditProfileScreen'
import ReplyCommentScreen from '../screens/Comment/ReplyCommentScreen'
import MessageDetailScreen from '../screens/Message/MessageDetailScreen'
import EditPostScreen from '../screens/Post/EditPostScreen'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
);

const HomeStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Comment" component={CommentScreen} />
        <Stack.Screen name="ReplyComment" component={ReplyCommentScreen} />
    </Stack.Navigator>
);

const MessageStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Message" component={MessageScreen} />
        <Stack.Screen name="MessageDetail" component={MessageDetailScreen} />
    </Stack.Navigator>
);

const ProfileStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="EditPost" component={EditPostScreen} />
        <Stack.Screen name="Comment" component={CommentScreen} />
        <Stack.Screen name="ReplyComment" component={ReplyCommentScreen} />
    </Stack.Navigator>
);


const AppTabNavigator = () => (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#161F3D",
        tabBarInactiveTintColor: "#B8BBC4",
    }}
    >
        <Tab.Screen name="HomeButton" component={HomeStack}
            options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} /> }}
        />
        <Tab.Screen name="MessageButton" component={MessageStack}
            options={{ tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles" color={color} size={size} /> }}
        />
        <Tab.Screen name="PostButton" component={PostScreen}
            options={{
                tabBarIcon: () => <Ionicons name="add-circle" color="#E9446A" size={48} 
                style={{
                    shadowColor: "#E9446A",
                    shadowOffset: { width: 0, height: 0 },
                    shadowRadius: 10,
                    shadowOpacity: 0.3
                }} 
                />
            }}
        />
        <Tab.Screen name="NotificationButton" component={NotificationScreen}
            options={{ tabBarIcon: ({ color, size }) => <Ionicons name="notifications" color={color} size={size} /> }}
        />
        <Tab.Screen name="ProfileButton" component={ProfileStack}
            options={{ tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} /> }}
        />
    </Tab.Navigator>
)

export { AppTabNavigator, AuthStack }