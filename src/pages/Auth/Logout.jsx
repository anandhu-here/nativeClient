import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN_FAILED } from '../../redux/types';

const Logout = () => {
    const dispatch = useDispatch();
    const logout = async() =>{
        const value = await AsyncStorage.removeItem('token');
        const value_ = await AsyncStorage.removeItem('user');
        dispatch({type:LOGIN_FAILED, payload:null});
    }
    useEffect(()=>{
        logout()
    } , [])

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}} >
        <ActivityIndicator size={100} />
        <Text>Logging out</Text>
    </View>
  )
}

export default Logout