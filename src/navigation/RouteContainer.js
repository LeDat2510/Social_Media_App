import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'
import LoadingScreen from '../screens/Loading/LoadingScreen';
import { AppTabNavigator, AuthStack } from './AppContainer';

const RootContainer = () => {

    const [isLoading, setIsLoading] = useState(true);
    const userData = useSelector(state => state.user.userData);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <NavigationContainer>
            {userData ? <AppTabNavigator /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default RootContainer