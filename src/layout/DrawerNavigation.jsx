
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Expenses from '../pages/Expenses/Expenses';
import Sidebar from './Sidebar';
import Insights from '../pages/Insights/Insights';
import Logout from '../pages/Auth/Logout';

const Drawer = createDrawerNavigator();



function HomeScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }

  function NotificationsScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
  

export default function DrawerNavigation() {
  return (
      <Drawer.Navigator drawerContent={props=><Sidebar {...props}/>} initialRouteName="Expenses">
        <Drawer.Screen name="Expenses" component={Expenses} />
        <Drawer.Screen name="Insights" component={Insights} />
        <Drawer.Screen name="Logout" component={Logout} />
      </Drawer.Navigator>
  );
}