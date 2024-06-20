import { StyleSheet, Text, View,SafeAreaView,TextInput,TouchableOpacity, ActivityIndicator } from 'react-native'
import { Link,useRouter } from 'expo-router'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth,db } from "../firebase.js"
import { collection,setDoc,doc } from 'firebase/firestore'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Success from "../components/Success.jsx"
import Error from '../components/Error.jsx'

const Register = () => {
    const [userName,setUserName] = useState("") 
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)
    const [showPassword,setShowPassword] = useState(false)
    const [successMsg,setSuccessMsg] = useState(false)
    const [errMsg,setErrMsg] = useState("")
    const router = useRouter()

    const viewPassword = () => {
        setShowPassword(!showPassword)
    }

    const registerUser = async() => {
        if(userName === "" || email === "" || password === ""){
            alert("Enter your credentials")
            return;
        }
       try{
        setErrMsg("")
        setLoading(true)
        await createUserWithEmailAndPassword(auth,email,password)
        const user = auth.currentUser;
          if(user){
            const colRef = collection(db,"Users")
            const userDoc = doc(colRef,user.uid)
            await setDoc(userDoc,{
              username:userName,
              email:email,
              userId:user.uid
            })
            await AsyncStorage.setItem("userID",JSON.stringify(user.uid))
            await AsyncStorage.setItem("name",JSON.stringify(userName))
            await AsyncStorage.setItem("email",JSON.stringify(email))
            console.log("saved to local storage")
            setSuccessMsg(true)
            setTimeout(()=>{
              setSuccessMsg(false)
            },2000)
          }
          setUserName('')
          setEmail('')
          setPassword('')
          setTimeout(()=>{
              router.push("/")
          },1000)
       }catch(error){
        switch (error.code) {
            case 'auth/email-already-in-use':
              setErrMsg("Email Already In Use")
              setTimeout(() => {
                  setErrMsg('');
                }, 4000);
              break;
            case 'auth/invalid-email':
              setErrMsg("The email is incorrect")
              setTimeout(() => {
                setErrMsg('');
              }, 4000);
              break;
            case 'auth/weak-password':
              setErrMsg("Password should be 6 characters or more")
              setTimeout(() => {
                setErrMsg('');
              }, 4000);
              break;
            case 'auth/invalid-credential':
              setErrMsg("Wrong Email/Password")
              setTimeout(() => {
                setErrMsg('');
              }, 4000);
              break;
            default:
              setErrMsg("Check Your Internet Connection")
              setTimeout(() => {
                setErrMsg('');
              }, 4000);
        }
       }finally{
        setLoading(false)
       }
    }

  return (
    <SafeAreaView style={styles.container}>
        {successMsg && <Success/>}
        {errMsg !== "" && <Error errMsg={errMsg}/>}
      <View style={{width:250,padding:15}}>
        <View>
          <Text>Name</Text>
          <TextInput style={styles.textInput}  
          placeholder='Enter your name...'
          placeholderTextColor='#BEBFC5'
          onChangeText={setUserName}
          value={userName}
          />
        </View>
        <View style={{marginTop:10}}>
          <Text>Email</Text>
          <TextInput style={styles.textInput}  
          placeholder='Enter your email address...'
          placeholderTextColor='#BEBFC5'
          onChangeText={setEmail}
          value={email}
          keyboardType='email-address'
          />
        </View>
        <View style={{marginTop:10}}>
          <Text>Password</Text>
          <TextInput style={styles.textInput} 
          placeholder='Enter your password....'
          placeholderTextColor='#BEBFC5'
          onChangeText={setPassword}
          value={password}
          secureTextEntry={showPassword ? false : true}
          />
          { showPassword ? (
              <Ionicons onPress={viewPassword} 
              style={{position:"absolute",top:32,left:"85%"}} name="eye-off" size={23} color="black" />
          ) 
          : (
              <Ionicons 
              onPress={viewPassword} 
              style={{position:"absolute",top:32,left:"85%"}} name="eye" size={23} color="black" 
              />
          )}
        </View>
        <TouchableOpacity style={styles.signUpBtn} onPress={()=>registerUser()}>
          { loading ? (<ActivityIndicator color={"#FFFFFF"} size={27}/>)
          :
          (<Text style={{color:"#FFFFFF",textAlign:"center"}}>Sign Up</Text>)
          }
        </TouchableOpacity>
        <View style={{display:"flex",flexDirection:"row",marginTop:10}}>
          <Text>Already have an account?</Text>
          <Link style={{color:"#2666CF"}} href="/login"> Login</Link>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFFFFF"
    },
    signUpBtn: {
      padding: 10,
      backgroundColor: "#03C03C",
      borderRadius: 50,
      marginTop: 20
    },
    textInput: {
      position: "relative",
      padding: 10,
      borderRadius: 10,
      marginTop:8,
      backgroundColor: "#E5E4E2",
      color: "#000",
      placeholderTextColor: 'gray'
    }
})