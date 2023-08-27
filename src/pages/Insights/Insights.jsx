import React, { useEffect, useState } from 'react'
import { Button, Dimensions } from 'react-native'
import { View } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { getExpenses } from '../../utils/requests'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { theme_color } from '../../theme/colors'
import { useNavigation } from '@react-navigation/native'
const month_names = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function Insights() {
    const [date, setDate] = useState(dayjs());
    const [ y_data, setYData ] = useState(Array(date.month()+1).fill(0));
    const userContext = useSelector(state=>state.userState);


    useEffect(()=>{
        getExpenses(date.year(), date.month(),  userContext.userInfo.token).then(response=>{
            console.log(response.data, "datd")
            var series = [...y_data];
            for (var month of response.data ){
                var index = dayjs(month.month).month();
                var expense = month.totalAmount;
                series[index] = parseInt(expense)
            }
            
            // const series = response.data.monthly_expenses.slice(0, date.getMonth()+1).map(i=>i.total_amount)
            // setXData(month_names.slice(0, response.data.length))
            
            // setYData(series)
            console.log(series, "serrr", month_names.slice(0, date.month()+1))

            setYData(series)
        }).catch(error=>{
            console.log("6666666", error)
            setLoading(false);
        })
    }, [])

    
  return (
    <View style={{flex:1, alignItems:'center', marginTop:30}} >
        <Text style={{ fontSize:18, fontWeight:'500', color:'grey', textAlign:'start', width:'90%' }} >Insights, untill {date.format('MMM')}</Text>
        <LineChart
            data={{
            labels: month_names.slice(0, date.month()+1),
            datasets: [
                {
                data: y_data
                }
            ]
            }}
            width={Dimensions.get("window").width - 30} // from react-native
            height={220}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
            backgroundColor: theme_color,
            backgroundGradientFrom: theme_color,
            backgroundGradientTo: theme_color,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
                borderRadius: 16
            },
            propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
            }
            }}
            bezier
            style={{
            marginVertical: 8,
            borderRadius: 16
            }}
        />


        {/* <View style={{ width:'100%', alignItems:'center' }}>   
            <Text>Download your expenses as pdf</Text>
            <View style={{display:'flex', flexDirection:'row', width:'90%', justifyContent:'space-around', marginTop:30}} >
                <Button title={startDate?dayjs(startDate).format('YYYY/MM/DD'):"Pick a start date"} onPress={()=>{
                    setStartDate(null);
                    setDatePickerVisibility(true)
                }} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={(date)=>{
                        setStartDate(date);
                        setDatePickerVisibility(false);
                    }}
                    onCancel={()=>{
                        setDatePickerVisibility(false);
                    }}
                />
                <Button title={endDate?dayjs(endDate).format('YYYY/MM/DD'):"Pick an end date"} onPress={()=>{
                    setEndDate(null);
                    setDatePickerVisibility2(true)
                }}  />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible2}
                    mode="date"
                    onConfirm={(date)=>{
                        setEndDate(date);
                        setDatePickerVisibility2(false);
                    }}
                    onCancel={()=>{
                        setDatePickerVisibility2(false)
                    }}
                />
            </View>

            <TouchableOpacity style={{
                width:'50%',
                height:50,
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:theme_color,
                elevation:2,
                marginTop:20,
                borderRadius:20
            }} onPress={()=>{
                navigation.navigate('PDF')
            }} >
                <Text>View and Download Pdf</Text>
            </TouchableOpacity>
        </View> */}
    </View>
  )
}

export default Insights