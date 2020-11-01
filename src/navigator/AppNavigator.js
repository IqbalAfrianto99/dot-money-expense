import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

// Containers

import MainScreen from '../containers/MainScreen';
import AddScreen from '../containers/AddScreen';

const Stack = createStackNavigator();

function Main() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
                <Stack.Screen 
                    name="Add" 
                    component={AddScreen} 
                    options={{ 
                        title: '',
                        headerStyle:{
                            elevation: 0,
                            shadowOpacity: 0,
                            borderBottomWidth: 0
                        } 
                    }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Main;