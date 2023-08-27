import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import React from 'react'
import { Text, View } from 'react-native'
import Animated from 'react-native-reanimated'
import DrawerHead from './DrawerHead'
import { TouchableOpacity } from 'react-native'

function Sidebar({...props}) {
  return (
    <DrawerContentScrollView {...props} >
        <DrawerHead />
        <DrawerItemList {...props}/>
        
    </DrawerContentScrollView>
  )
}

export default Sidebar