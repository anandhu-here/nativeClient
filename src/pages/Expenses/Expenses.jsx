import { View, Text, TouchableOpacity, Animated } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react';

import MonthPicker from 'react-native-month-year-picker';
import { theme_color } from '../../theme/colors';
import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { createExpense, getExpensesByMonth } from '../../utils/requests';
import { useSelector } from 'react-redux';
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const month_names = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const cats = ['Home', 'Shopping', 'Food']

const Expenses = () => {
    const [ date, setDate ] = useState(dayjs());
    const [ expenseData, setExpense ] = useState(null);
    const [show, setShow] = useState(false);
    const [ pickedMonth, setPickedMonth ] = useState(dayjs().month());
    const [ categories, setCat ] = useState({Home:'', Shopping:'', Food:''})

    const userContext = useSelector(state=>state.userState);
    const {userInfo} = userContext






    const getExpensedata = (date) =>{
        getExpensesByMonth(date.month()+1, date.year(), userContext.userInfo.token).then(response=>{
            // const series = response.data.map(i=>i.total_amount)
            setExpense(response.data);
            // getExpenses(date.year(), date.month(),  userContext.userInfo.token).then(response=>{
                
            //     var series = Array(date.month()+1).fill(0);
            //     for (var month of response.data ){
            //         var index = dayjs(month.month).month()+1;
            //         var expense = month.totalAmount;
            //         series[index] = expense
            //     }
            //     // const series = response.data.monthly_expenses.slice(0, date.getMonth()+1).map(i=>i.total_amount)
            //     // setXData(month_names.slice(0, response.data.length))
                
            //     // setYData(series)
            //     setExpYear(response.data.expenses);
            //     setYData(series)
            //     setLoading(false);
            // }).catch(error=>{

            //     setLoading(false);
            // })
        }).catch(error=>{
            console.log(error, "error")
            setLoading(false);
        })
    }



    useEffect(()=>{

        
        
        getExpensedata(date)

    }, [])

    const handleSubmit = () =>{
        var total_amount = 0;
        var expenses = [];
        const year = date.year();
        const month = String(date.month() + 1).padStart(2, '0'); // Adding 1 to the month index since it's zero-based
        const day = String(date.date()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        cats.map(cat=>{
            const value = categories[cat];
            if(value.length>0){
                total_amount+=parseInt(value);
                expenses.unshift({
                    amount: value,
                    category:cat,
                    date: formattedDate,
                    description:''
                })
            }
        })
        if(total_amount>0){
            createExpense(userContext.userInfo.user.id, expenses).then(response=>{
                setExpense(prev=>({
                    ...prev,
                    total:parseInt(prev.total)+total_amount
                }))
                setCat({Home:'', Shopping:'', Food:''})
    
            }).catch(error=>{
                console.log(error)
            })
        }
        else{
            alert('Enter the expenses first')
        }
    }

  return (
    <KeyboardAwareScrollView  keyboardShouldPersistTaps={'always'}
        style={{flex:1,  }}
        contentContainerStyle={{
            height:'100%',
            backgroundColor:'white'
        }}
        showsVerticalScrollIndicator={true}>
    {/* Your code goes here*/}
      <View style={{ flex: 1, alignItems: 'center', paddingTop: 20,  justifyContent: 'space-evenly' }}>
        <View style={{ display: 'flex',  flexDirection: 'row', flexWrap: 'wrap', width: '90%', justifyContent: 'center' }}>
          {month_names.map((mon, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setPickedMonth(index);
                getExpensesByMonth(index+1, date.year(), userContext.userInfo.token).then(response=>{
                    // const series = response.data.map(i=>i.total_amount)
                    setExpense(response.data);
                }).catch(error=>{
                    console.log(error)
                })
              }}
              style={{
                width: 50,
                height: 50,
                elevation: 5,
                borderRadius: 50,
                backgroundColor: pickedMonth === index ? theme_color : 'white',
                marginHorizontal: 10,
                marginVertical: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: pickedMonth === index ? 'white' : 'black' }}>{mon}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ display: 'flex', width: '100%',  flexDirection: 'row', justifyContent: 'space-around' }}>
        <View
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 4,
              justifyContent: 'space-between',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'row',
              width: '45%',
              height: 100,
              borderRadius: 15,
              elevation: 5,
              backgroundColor: theme_color,
            }}
          >
            <View>
              <Text style={{ marginLeft: 10, color: 'white', fontSize: 20 }}>Expenses</Text>
              <Text style={{ marginLeft: 10, color: 'white', fontSize: 17 }}>AED {expenseData?.total}</Text>
            </View>
            <View style={{ width: 30, height: 30, borderRadius: 100, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
              <MaterialIcons name="money-off" size={24} color="black" />
            </View>
          </View>
          <View
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 4,
              justifyContent: 'space-between',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'row',
              width: '45%',
              height: 100,
              borderRadius: 15,
              elevation: 5,
              backgroundColor: theme_color,
            }}
          >
            <View>
              <Text style={{ marginLeft: 10, color: 'white', fontSize: 20 }}>Balance</Text>
              <Text style={{ marginLeft: 10, color: 'white', fontSize: 17 }}>AED {userInfo?.user?.income - expenseData?.total}</Text>
            </View>
            <View style={{ width: 30, height: 30, borderRadius: 100, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
              <MaterialIcons name="attach-money" size={24} color="black" />
            </View>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            borderRadius: 15,
            justifyContent: 'center',
          }}
        >
          {cats.map((cat, index) => (
            <View
              key={index}
              style={{
                width: '90%',
                height: 65,
                display: 'flex',
                flexDirection: 'row',
                elevation:1,
                backgroundColor:'#F4F4F4',
                marginVertical: 5,
                borderRadius:15,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ width: '35%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 10 }}>
                <Text style={{ fontSize: 18, color: 'grey' }}>{cat}</Text>
              </View>
              <TextInput value={categories[cat]} onChangeText={text=>{
                setCat(prev=>({
                    ...prev,
                    [cat]:text
                }))
              }} style={{ position: 'relative', width: '60%', height: 50, marginRight: 10, borderRadius: 20, backgroundColor: 'white' }} />
              
            </View>
          ))}
          <TouchableOpacity onPress={()=>handleSubmit()} style={{width:'40%', height:50, justifyContent:'center',borderRadius:20,marginTop:20, alignItems:'center', backgroundColor:theme_color, elevation:1}} >
            <Text style={{ fontSize: 18, color: 'white' }}>Add expense</Text>
            </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Expenses