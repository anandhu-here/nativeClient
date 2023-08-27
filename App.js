// In App.js in a new project
import 'react-native-gesture-handler'

import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './src/redux/store';
import { verify } from './src/utils/requests';
import { getData } from './src/utils/asyncStorage';
import Login from './src/pages/Auth/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerNavigation from './src/layout/DrawerNavigation';
import { ActivityIndicator } from 'react-native';
import Signup from './src/pages/Auth/Signup';
const Stack = createStackNavigator();










function App() {
  const [isAuth, setAuth] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const  appContext = useSelector(state=>state.appState);
  const  userContext = useSelector(state=>state.userState);
  const dispatch = useDispatch();

  useEffect(()=>{

    AsyncStorage.getItem('token').then(token=>{
      if(token){
        verify({token:token}).then(response=>{
          dispatch({type:"LOGIN_OK", payload:response.data});
          setLoading(false)
          setAuth(true);
        }).catch(error=>{
          console.log(error, "error")
          dispatch({type:"LOGIN_FAILED", payload:null});
          setLoading(false)
          setAuth(false)
          
        })
      }
      else{
        setLoading(false)
        setAuth(false);
      }
    }).catch(error=>{
      setLoading(false);
      setAuth(false);
      console.log(error, "error")
    })
  }, [])

  useEffect(()=>{
    const {  userInfo } = userContext;
    if(userInfo){
      setAuth(true);
    }
    else{
      setAuth(false);
    }
  }, [userContext])


  return (
    <NavigationContainer>
      {
        loading?(
          <View style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
          }} >
            <ActivityIndicator />
          </View>
        ):(
          <Stack.Navigator>
            {isAuth ? (
                // Private screens
                <>
                  <Stack.Screen options={{headerShown:false}} name="Home" component={DrawerNavigation} />
                  {/* <Stack.Screen options={{headerShown:true}} name="PDF" component={DownloadPDF} /> */}
                </>
              ) : (
                // Public screens
                <>
                  <Stack.Screen options={{headerShown:false}} name="Login" component={Login} />
                  <Stack.Screen options={{headerShown:false}} name="Signup" component={Signup} />
                </>
              )}
            </Stack.Navigator>
        )
      }
    </NavigationContainer>
  );
}


function ReduxApp(){
  return(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default ReduxApp;