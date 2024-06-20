import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import Error from '../components/Error'
import AsyncStorage from '@react-native-async-storage/async-storage'

const student = () => {
  const motivationLevels = [1,2,3,4,5]
  const [loading,setLoading] = useState(false)
  const [user,setUser] = useState("")
  const [errMsg,setErrMsg] = useState("")
  const [motivation,setMotivation] = useState(null)
  const router = useRouter()

  const setMotivationLevel = async(motivationLevel) => {
    try{
      setLoading(true)
      const parsedUserName = await AsyncStorage.getItem("name")
      const jsonUser = JSON.parse(parsedUserName)
      const parsedEmail = await AsyncStorage.getItem("email")
      const jsonEmail = JSON.parse(parsedEmail)
      const colRef = doc(db,"Students",user)
      await setDoc(colRef,{
        motivation: motivationLevel,
        username: jsonUser,
        email: jsonEmail
      })
      await RetrieveUserInfo()
      router.push({pathname: 'modal', params: {motivationLevel} })
    }catch(error){
      console.log(error)
      setErrMsg("Check Your Internet Connection")
    }finally{
      setLoading(false)
    }
  }
  
  const RetrieveUserInfo = async() =>{
    setLoading(true)
    try{
      const parsedUserID = await AsyncStorage.getItem("userID")
      const jsonValue = JSON.parse(parsedUserID)
      setUser(jsonValue)
      const docRef = doc(db,"Students",jsonValue)
      const docData = await getDoc(docRef)
      if(docData.exists()){
        const motivation = docData.data().motivation
        setMotivation(motivation)
      }
    }catch(error){
      console.log(error)
      setErrMsg("Check Your Internet Connection")
    }finally{
      setLoading(false)
    }
  }
  
  useEffect(()=>{
    RetrieveUserInfo()
  },[])
  
  return (
    <SafeAreaView style={styles.container}>
      {loading ? 
      (<Loading/>)
      : (
      <>
        {errMsg !== "" && <Error errMsg={errMsg}/>}
        {motivation !== null ? (
          <View>
            <Text style={{fontSize:17}}>Your previous motivation was:</Text>
            {motivation === 1 ? (
            <Text style={styles.text}>No motivation at all 😔</Text>
            ):motivation === 2 ? (
              <Text style={styles.text}>Feeling less motivated today 😑</Text>
            ):motivation === 3 ? (
              <Text style={styles.text}>A little motivated 🙂</Text>
            ):motivation === 4 ? (
              <Text style={styles.text}>Motivated enough 🤪</Text>
            ):motivation === 5 ? (
              <Text style={styles.text}>Fully Motivated 🤩</Text>
            ):""
            }
            <TouchableOpacity style={styles.newMotivationBtn} onPress={()=>setMotivation(null)}>
              <Text style={{color:"#FFFFFF",textAlign:"center"}}>Set New Motivation</Text>
            </TouchableOpacity>
          </View>
        )
        :
        (
        <View style={{position:"absolute",top:"40%"}}>
          <View>
           <Text style={{fontSize:20}}>How motivated are we feeling today ?</Text>
          </View>
          <View>
            <FlatList 
            data={motivationLevels}
            renderItem={({ item })=> (
              <TouchableOpacity style={styles.motivationBtn} onPress={()=>setMotivationLevel(item)}>
                <Text style={{color:"white",fontSize:17,margin:"auto"}}>{item}</Text>
              </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
          />
          </View>
        </View>
        )}
      </>
      )
    }
    </SafeAreaView>
  )
}

export default student

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    display: "flex",
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  text: {
    marginTop:10,
    fontSize:20,
    fontWeight: "bold"
  },
  motivationBtn: {
    width: 50,
    height: 50, 
    backgroundColor: "#2666CF",
    padding: 6,
    borderRadius: 50,
    marginTop: 15,
    marginLeft: 7
  },
  newMotivationBtn: {
    backgroundColor: "#2666CF",
    borderRadius: 50,
    padding: 8,
    marginTop:15
  }
})