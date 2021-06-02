import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "./Users";
import * as EmailValidator from "email-validator";
import axios from "axios";

const AddUser = ({navigation}) => {
    const [userData, setUserData] = useState([])
    const [result, setResult] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const api = axios.create({
        baseURL: 'http://localhost:3000/api/v1/users/'
    })

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

    const addUser = async () => {
        const res = await api.post('', userToSend, {})
        const {data} = res
        setUserData(data)
        setResult(results => [...results, ...data.results])
        await listUsers()
        navigation.replace('Users')
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.txt}>Name</Text>
                <TextInput autoCompleteType={"username"} style={styles.input} value={name} onChangeText={text => setName(text)} />
                <Text style={styles.txt}>Email</Text>
                <TextInput autoCompleteType={"email"} style={styles.input} value={email} onChangeText={text => setEmail(text)} />
                <Text style={styles.txt}>Password</Text>
                <TextInput autoCompleteType={"off"} secureTextEntry={true} style={styles.input} value={password} onChangeText={text => setPassword(text)} />
            </View>
            <TouchableOpacity disabled={EmailValidator.validate(email) === false|| name.trim() === '' || password.trim() === '' ? true : false}
                              style={EmailValidator.validate(email) === false|| name.trim() === '' || password.trim() === '' ? styles.disabled :styles.save}
                              onPress={() => addUser()}>
                {EmailValidator.validate(email) === false || name.trim() === '' || password.trim() === ''
                    ? <Text style={{fontWeight: 'bold', color: '#000'}}>Please enter a valid name, email and password</Text>
                    : <Text style={{fontWeight: 'bold', color: '#fff'}}>Save changes</Text>
                }
            </TouchableOpacity>
        </View>
    )
}

export default AddUser
