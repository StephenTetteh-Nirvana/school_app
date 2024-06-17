import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { Link,useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Error from '../components/Error'

const login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [showPassword,setShowPassword] = useState(false)
    const [errMsg,setErrMsg] = useState('')
    const [loading,setLoading] = useState(false)
    const router = useRouter()


    const viewPassword = () => {
        setShowPassword(!showPassword)
    }

    const loginUser = async() => {
        if(email === "" || password === ""){
            alert("Enter your email and password")
            return;
        }
        try{
           setLoading(true)
           await signInWithEmailAndPassword(auth,email,password)
           const user = auth.currentUser;
           if(user){
                await AsyncStorage.setItem("userID",JSON.stringify(user.uid))
                console.log("userID replaced")
                setEmail('')
                setPassword('')
                router.push("/")
           }
        }catch(error){
            console.log(error)
            switch (error.code) {
                case 'auth/invalid-email':
                    setErrMsg("Invalid Email")
                    setTimeout(() => {
                        setErrMsg('');
                      }, 4000);
                  break;
                case 'auth/wrong-password':
                  setErrMsg("Incorrect Password")
                  setTimeout(() => {
                    setErrMsg('');
                  }, 4000);
                  break;
                case 'auth/user-not-found':
                setErrMsg("Account does not exist")
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
        {errMsg !== "" && <Error errMsg={errMsg}/>}
        <View style={{width:250,padding:15}}>
           <View>
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
           <TouchableOpacity style={styles.submitBtn} onPress={()=>loginUser()}>
           { loading ? (<ActivityIndicator color={"#FFFFFF"} size={27}/>)
            :
            (<Text style={{color:"#FFFFFF",textAlign:"center"}}>Sign In</Text>)
            }
           </TouchableOpacity>
           <View style={{display:"flex",flexDirection:"row",marginTop:10}}>
              <Text>Don't have an account?</Text>
              <Link style={{color:"#2666CF"}} href="/register"> Register</Link>
           </View>
        </View>

    </SafeAreaView>
  )
}

export default login

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF"
    },
    submitBtn: {
       padding: 10,
       backgroundColor: "#2666CF",
       borderRadius: 50,
       marginTop: 20
    },
    textInput: {
        padding: 10,
        borderRadius: 10,
        marginTop:8,
        backgroundColor: "#E5E4E2",
        color: "#000",
        placeholderTextColor: 'gray'
    }
})