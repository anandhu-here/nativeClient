import React, { useState } from 'react'
import { ActivityIndicator, Button, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { theme_color } from '../../theme/colors'
import { login } from '../../utils/requests';
import { storeData } from '../../utils/asyncStorage';
import { useDispatch } from 'react-redux';
import { LOGIN_FAILED, LOGIN_OK } from '../../redux/types';
import { useNavigation } from '@react-navigation/native';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation()

    const handleLogin = async() =>{
        setLoading(true);
        login({email, password})
            .then(response=>{
                const {token, user} = response.data;
                storeData(token, user);
                dispatch({type:LOGIN_OK, payload:response.data});
                setLoading(false);
            })
            .catch(error=>{
                console.log(error, "error");
                dispatch({type:LOGIN_FAILED, payload:null});
                setLoading(false)
            })
    }

  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} >
        <View style={{flex:1, justifyContent:'center', alignItems:"center"}} >
            
            <View style={{flex:1, justifyContent:'center', alignItems:'center', width:'90%'}} >
                <Text style={{fontSize:18, color:"grey", textAlign:"left", width:'88%', marginVertical:10, fontWeight:'600'}} >LOGIN</Text>
                <Text style={{fontSize:15, color:"grey", textAlign:"left", width:'88%', marginVertical:1, fontWeight:'600'}} >Don't have an account yet?</Text>
                <TouchableOpacity style={{marginBottom:15, alignSelf:'flex-start', marginLeft:'6%'}} onPress={()=>{
                    navigation.navigate('Signup')
                }} >
                    <Text style={{color: theme_color, fontSize:17, fontWeight:"700"}} >Signup</Text>
                </TouchableOpacity>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text=>setEmail(text)}
                    style={{ width:'90%', height:50, elevation:1, backgroundColor:'white', paddingLeft:5, marginVertical:3, borderRadius:5 }}
                />
                <TextInput
                    value={password}
                    placeholder='Password'
                    onChangeText={text=>setPassword(text)}
                    style={{ width:'90%', height:50, elevation:1, backgroundColor:'white', paddingLeft:5, marginVertical:3, borderRadius:5 }}
                />
                <TouchableOpacity onPress={()=>handleLogin()} style={{marginTop:20, width:'40%', justifyContent:'center', alignItems:'center', backgroundColor:"black", height:50, borderRadius:10}} >
                    {
                        loading?(<ActivityIndicator />):(<Text style={{color:'white'}} >LOGIN</Text>)
                    }
                </TouchableOpacity>
                
                <TouchableOpacity style={{marginTop:15}}  >
                    <Text style={{color: theme_color,}} >Forgot password?</Text>
                </TouchableOpacity>
            </View>
        </View>
    </TouchableWithoutFeedback>
  )
}

export default Login