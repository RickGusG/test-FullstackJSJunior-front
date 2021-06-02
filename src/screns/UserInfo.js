import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useRoute} from '@react-navigation/native';
import axios from "axios";
import * as EmailValidator from 'email-validator';
import {styles} from "./Users";

const UserInfo = ({navigation}) =>{
    const [userData, setUserData] = useState([])
    const [result, setResult] = useState([])
    const {params} = useRoute()
    const [name, setName] = useState(params.user.name)
    const [email, setEmail] = useState(params.user.email)
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [password, setPassword] = useState(params.user.password)

    const api = axios.create({
        baseURL: 'http://localhost:3000/api/v1/users/'
    })

    useEffect(() => {
        if(newPassword !== '' && confirmNewPassword !== '') {
            if(newPassword === confirmNewPassword) setPassword(newPassword)
        }
    }, [newPassword, confirmNewPassword])

    const userToSend = {
        name,
        email,
        password
    }

    const listUsers = async () => {
        const res = await api.get('', {})
        const {data} = res
        setUserData(data)
        setResult(results => [...results, ...data.results])
    }

    const updateUser = async (userID) => {
        const res = await api.put(userID, userToSend, {})
        const {data} = res
        setUserData(data)
        setResult(data.results)
        await listUsers()
        navigation.replace('Users')
    }

    const saveChangesPress = () => {
        if(newPassword !== confirmNewPassword) {
            alert("Error: Passwords don't match.")
        }
        else {
            updateUser(params.user.id)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.txt}>Name</Text>
                <TextInput autoCompleteType={"username"} style={styles.input} value={name} onChangeText={text => setName(text)} />
                <Text style={styles.txt}>Email</Text>
                <TextInput autoCompleteType={"email"} style={styles.input} value={email} onChangeText={text => setEmail(text)} />
                <Text style={styles.txt}>New password</Text>
                <TextInput autoCompleteType={"off"} secureTextEntry={true} style={styles.input} value={newPassword} onChangeText={text => setNewPassword(text)} />
                <Text style={styles.txt}>Confirm password</Text>
                <TextInput autoCompleteType={"off"} secureTextEntry={true} style={styles.input} value={confirmNewPassword} onChangeText={text => setConfirmNewPassword(text)} />
            </View>
            <TouchableOpacity disabled={EmailValidator.validate(email) === false ? true : false} style={EmailValidator.validate(email) === false ? styles.disabled :styles.save} onPress={() => saveChangesPress()}>
                {EmailValidator.validate(email) === false ? <Text style={{fontWeight: 'bold', color: '#000'}}>Please enter a valid email</Text> : <Text style={{fontWeight: 'bold', color: '#fff'}}>Save changes</Text>}
            </TouchableOpacity>
        </View>
    )
}

export default UserInfo
