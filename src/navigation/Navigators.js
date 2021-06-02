import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Users from "../screns/Users";
import Home from "../screns/Home";
import UserInfo from "../screns/UserInfo";
import AddUser from "../screns/AddUser";

const Stack = createStackNavigator()
const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="home">
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                <Stack.Screen name="Users" component={Users}/>
                <Stack.Screen name="UserInfo" component={UserInfo} options={{headerTitle: 'Edit User'}}/>
                <Stack.Screen name="AddUser" component={AddUser} options={{headerTitle: 'Add User'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator
