import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';
import RootContainer from './src/navigation/RouteContainer';
import { PaperProvider } from 'react-native-paper';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <PaperProvider>
                    <RootContainer />
                </PaperProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;