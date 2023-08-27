import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeData = async (token, userInfo) => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('userInfo', userInfo);
    } catch (e) {
      // saving error
    }
  };


export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? value : null;
    } catch (e) {
      // error reading value
    }
  };