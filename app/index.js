import { Link,useRouter } from 'expo-router'
import { useState,useEffect } from 'react'
import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { doc,getDoc,updateDoc } from 'firebase/firestore'
import { auth,db } from '../firebase'
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Error from '../components/Error'
import Loading from '../components/Loading'


const home = () => {
  const [user,setUser] = useState("")
  const [errMsg,setErrMsg] = useState("")
  const [role,setRole] = useState("")
  const [loading,setLoading] = useState(false)
  const router = useRouter()

  const setUserRole = async(userRole) => {
  try{
    console.log(userRole)
    setLoading(true)
    if(user){
      const docRef = doc(db,"Users",user)
      await updateDoc(docRef,{
        role:userRole
      })
      await navigateUserToRole(docRef)
      console.log("document updated with success")
    }else{
      console.log("user is null")
    }
  }catch(error){
    alert(error)
  }finally{
    setLoading(false)
  }
  }

  const navigateUserToRole = async(docRef) => {
    const docData = await getDoc(docRef)
    const userRole = docData.data().role
    if(userRole == "Student"){
      await AsyncStorage.setItem("role",JSON.stringify(userRole))
      await fetchUserRole()
      router.push("/student")
    }else if(userRole === "Staff"){
      await AsyncStorage.setItem("role",JSON.stringify(userRole))
      await fetchUserRole()
      router.push("/staff")
    }
  }

  const logOut = async() => {
    setLoading(true)
    await signOut(auth)
    .then(async()=>{
      router.push("/login")
      await AsyncStorage.setItem("userID",JSON.stringify(null))
      await AsyncStorage.setItem("role",JSON.stringify(null))
      setUser(null)
      setRole(null)
      setLoading(false)
      console.log("logout successful")
    }).catch((error)=>{
      setLoading(false)
      setErrMsg("Check Your Internet Connection")
      console.log(error)
    })
  }


  const fetchUser = async() => {
    const userJsonValue = await AsyncStorage.getItem("userID");
    if (userJsonValue != null ) {
         const parsedUserID = JSON.parse(userJsonValue)
         setUser(parsedUserID)
    }else{
        setUser(null)
        console.log("no data")
    }
}

const fetchUserRole = async() => {
  const roleJsonValue = await AsyncStorage.getItem("role");
  if (roleJsonValue != null ) {
       const parsedUserRole = JSON.parse(roleJsonValue)
       setRole(parsedUserRole)
  }else{
      setRole(null)
      console.log("no data")
  }
}
useEffect(()=>{
    fetchUser()
    fetchUserRole()
},[])

  return (
    <SafeAreaView style={styles.container}>
      {errMsg !== "" && <Error errMsg={errMsg}/>}
      {loading && <Loading/>}
      <View>
        <View>
         <Text style={{fontSize: 25}}>Welcome To 
          <Text style={{fontWeight: 'bold',color: "red",fontStyle: "italic"}}> EDULINK</Text>
         </Text>
        </View>
        { user !== null ? (
      <>
        { role !== null ? (
          <View>
            <Text style={{marginTop:25,fontSize:15}}>You are using this app as a 
              <Text style={{fontWeight:"bold"}}> {role}</Text>
            </Text>
            { role === "Student" ? (
                <TouchableOpacity style={styles.roleBtn} onPress={()=>router.push("/student")}>
                  <Text style={{textAlign:"center"}}>Set Motivation</Text>
                </TouchableOpacity>
            )
            : role === "Staff" ? (
                <TouchableOpacity style={styles.roleBtn} onPress={()=>router.push("/staff")}>
                  <Text style={{textAlign:"center"}}>View Dashboard</Text>
                </TouchableOpacity>
            )
            : ""
            }
          </View>
        ): (
        <>
        <Text style={{color: "#C0C0C0",marginTop:8,fontSize:18}}>Who is using this app? 🤔</Text>
        <View style={{display:"flex",flexDirection: "row",marginLeft:20,marginTop:10}}>
            <TouchableOpacity style={styles.firstImageContainer} onPress={()=>setUserRole("Student")}>
              <Image style={styles.image} source={require("../assets/images/student.jpg")}/>
              <Text style={{textAlign: "center"}}>STUDENT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondImageContainer} onPress={()=>setUserRole("Staff")}>
              <Image style={styles.image} source={require("../assets/images/staff.jpg")}/>
              <Text style={{textAlign: "center"}}>STAFF</Text>
            </TouchableOpacity>
        </View>
        </>
        )
        }
        <TouchableOpacity style={styles.logOutBtn} onPress={()=>logOut()}>
          <Ionicons style={{marginLeft:55}} name="exit" size={27} color="#FFFFFF" />
          <Text style={{textAlign:"center",fontSize:20,color:"#FFFFFF"}}>LogOut</Text>
        </TouchableOpacity>
      </>
        )
        :
        (
          <View style={{marginTop:15}}>
              <View style={{borderColor:"#000",borderWidth:1,borderRadius:30,padding:8}}>
                <Link href="/login">
                  <Text style={{textAlign:'center'}}>Login</Text>
                </Link>
              </View>
              <View style={{borderColor:"#000",borderWidth:1,borderRadius:30,marginTop:10,padding:8}}>
              <Link href="/register">
                <Text style={{textAlign:"center"}}>Register</Text>
              </Link>
              </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default home

const styles = StyleSheet.create({
  container: {
  flex:1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#FFFFFF"
  },
  firstImageContainer: {
    borderRadius: "50%",
    marginTop:10,
    width: 80,
    height: 80
  },
  secondImageContainer: {
    borderRadius: "50%",
    marginTop:10,
    marginLeft:35,
    width: 80,
    height: 80
  },
  image: {
    width: "100%",
    height:"100%",
    borderRadius: "50%",
    resizeMode: "cover"
  },
  roleBtn: {
    padding:10,
    backgroundColor:"#F5F5F5",
    borderRadius:50,
    marginTop:15
  },
  logOutBtn: {
    display:"flex",
    flexDirection:"row",
    padding:10,
    backgroundColor:"red",
    borderRadius:50,
    marginTop:45
  }
})