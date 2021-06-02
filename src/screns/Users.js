import React, {useState} from "react";
import axios from "axios";
import {Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useFocusEffect} from "@react-navigation/native";

const Users = ({navigation}) => {
    const [userData, setUserData] = useState([])
    const [result, setResult] = useState([])
    const [id, setId] = useState('')
    const [found, setFound] = useState(true)

    const api = axios.create({
        baseURL: 'http://localhost:3000/api/v1/users/'
    })

    const listUsers = async () => {
        const res = await api.get('', {})
        const {data} = res
        setUserData(data)
        setResult(data.results)
    }

    const deleteUser = async (userID) => {
        const res = await api.delete(userID, {})
        const {data} = res
        setUserData(data)
        setResult(data.results)
    }

    const getUser = async (userID) => {
        if (userID !== '') {
            const res = await api.get(userID, {})
            const {data} = res
            setUserData(data)
            setResult(data)
            if (data.length === 0) setFound(false)
            else setFound(true)
        }
        else{
            const res = await api.get(userID, {})
            const {data} = res
            setUserData(data)
            setResult(data.results)
            setFound(true)
        }
    }

    const deleteAllUsers = async () => {
        const res = await api.delete('', {})
        const {data} = res
        setUserData(data)
        setResult(data.results)
    }

    useFocusEffect(
        React.useCallback(() =>{
            listUsers()
        }, [])
    )

    const UserComponent = ({user, onPressAction}) => {
        return (
            <View>
                <TouchableOpacity style={styles.userComponent} onPress={onPressAction}>
                    <View>
                        <Text style={styles.title}>{user.name}</Text>
                        <Text style={styles.info}>{user.email}</Text>
                        <Text style={styles.info}>ID: {user.id}</Text>
                    </View>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => deleteUser(user.id)}>
                        <Image source={{uri: 'https://cdn.iconscout.com/icon/free/png-256/recycle-bin-1-461646.png'}} style={styles.deleteIcon} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addNew} onPress={() => navigation.navigate('AddUser')} >
                <Text style={{fontWeight: 'bold', color: '#fff'}}>Add new user</Text>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
                <Text style={styles.txt}>Search user by ID</Text>
                <TextInput  style={styles.input} value={id} onChangeText={text => {setId(text); getUser(text)}} />
            </View>
            {found === false?<Text style={styles.p}>User not found.</Text>:<Text style={styles.p}>Click/touch any user to edit it.</Text>}
            {found === false?<Text style={styles.p}>Try again with another ID.</Text>:<Text style={styles.p}>To delete a user, just click/touch the trash icon.</Text>}
            <FlatList data={result} renderItem={({item}) => <UserComponent user={item} onPressAction={() => navigation.navigate('UserInfo', {user: item})}/>}/>
            <TouchableOpacity style={styles.deleteAll} onPress={() => deleteAllUsers()} >
                <Text style={{fontWeight: 'bold', color: '#fff'}}>Delete all users</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Users
export {styles}

const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    userComponent: {
        paddingLeft: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        width: width - 50,
        borderWidth: 2,
        borderColor: '#f0f0f0',
        borderRadius: 6,
        height: 70,
        flexDirection: 'row'
    },

    title: {
        color: '#777',
        fontSize: 16,
        fontWeight: 'bold',
    },

    p: {
        marginTop: 5,
        color: '#999',
        fontWeight: 'bold',
    },

    info: {
        fontSize: 14,
        color: '#999'
    },

    deleteIcon: {
        tintColor: 'crimson',
        height: 25,
        width: 25
    },

    deleteButton: {
        backgroundColor: '#f0f0f0',
        height: 70,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6
    },

    txt: {
        color: '#999',
        fontSize: 14,
        fontWeight: 'bold',
        position: 'relative',
        top: 7,
        left: 15,
        zIndex: 1,
        backgroundColor: '#fff',
        alignSelf: 'flex-start'
    },

    input: {
        marginBottom: 10,
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#ccc',
        height: 40,
        width: width - 50,
        borderRadius: 4
    },

    inputContainer: {
        marginTop: 15,
        width: width - 50
    },

    deleteAll: {
        width: width,
        backgroundColor: 'crimson',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },

    addNew: {
        width: width,
        backgroundColor: 'dodgerblue',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },

    save: {
        bottom: 0,
        position: 'absolute',
        width: width,
        backgroundColor: 'dodgerblue',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },

    separator: {
        width: width - 50,
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },

    disabled: {
        bottom: 0,
        position: 'absolute',
        width: width,
        backgroundColor: '#bababa',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
