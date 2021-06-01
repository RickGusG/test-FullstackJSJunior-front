import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'

const MainComponent = createStackNavigator()
const Navigators = () => {
    <MainComponent.Navigator>
        <MainComponent.Screen
            options={{headerShown: false}}
        />
    </MainComponent.Navigator>
}
