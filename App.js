import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {LogBox} from 'react-native';

import Home from './src/views/Home';
import Form from './src/views/Form';
import ClientDetails from './src/views/ClientDetails';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Stack = createNativeStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent: '#0655BF',
  },
};

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: theme.colors.surface,
            headerTitleStyle: {
              fontWeight: '900',
            },
            headerTitleAlign: 'center',
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Form" component={Form} />
          <Stack.Screen
            name="ClientDetails"
            component={ClientDetails}
            options={{title: 'Client Details'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
