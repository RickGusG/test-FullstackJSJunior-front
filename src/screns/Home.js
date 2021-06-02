import React from 'react';
import {Button, StyleSheet, Text, View} from "react-native";

const Home = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to my test project!</Text>
            <Button title={'press me to start!'} onPress={() => navigation.navigate('Users')} />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#777',
        marginBottom: 20
    }
});
