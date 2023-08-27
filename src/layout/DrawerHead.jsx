import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { useSelector } from 'react-redux'

const DrawerHead = () => {
    const userContext = useSelector(state=>state.userState);
    const {userInfo}  = userContext;
  return (
    <View style={{
        display:'flex',
        height:100,
        width:"100%",
        flexDirection:'row',
        paddingHorizontal:10,
        alignItems:'center'
    }} >
      <View style={{width:60, height:60}} >
        <Image style={{width:'100%', height:'100%', objectFit:'contain', borderRadius:100}} source={require('./avatar.jpg')} />
      </View>
      <View style={{width:'auto',paddingLeft:10, height:60, justifyContent:'center'}} >
        <Text style={{fontSize:16}} >{userInfo?.user?.firstname} {userInfo?.user?.lastname}</Text>
        <Text style={{fontSize:13, color:'grey'}}>{userInfo?.user?.email}</Text>
      </View>
    </View>
  )
}

export default DrawerHead