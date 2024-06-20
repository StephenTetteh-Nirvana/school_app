import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useState, useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'

const StaffHeader = () => {
    const [userName,setUserName] = useState("")

    const fetchUserName = async() => {
        const parsedUserName = await AsyncStorage.getItem("name")
        if(parsedUserName !== null){
          const jsonValue = JSON.parse(parsedUserName)
          setUserName(jsonValue)
        }
      }
      
    useEffect(()=>{
      fetchUserName()
    },[])

  return (
    <View style={styles.container}>
      <Text style={{fontSize:25,fontWeight:'bold'}}>Students List</Text>
      <TouchableOpacity>
        <FontAwesome name="user-circle" size={35} color="black" />
        <Text style={{color:"#8292AC",marginTop:2,fontWeight:"bold"}}>{userName}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default StaffHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})