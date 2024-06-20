import { SafeAreaView, StyleSheet, View, Text } from 'react-native'
import { onSnapshot, collection } from 'firebase/firestore'
import { useState,useEffect } from 'react'
import { db } from '../firebase'
import StudentCard from '../components/StudentCard'
import StaffHeader from '../components/StaffHeader'


const staff = () => {
  const [students,setStudents] = useState([])

  const fetchAllStudents = () => {
    const unsub = onSnapshot(collection(db,"Students"),(snapshot)=>{
      let list = []
      snapshot.forEach((doc)=>{
        list.push(doc.data())
      })
      setStudents(list)
    })

    return unsub;
  }
  useEffect(()=>{
    fetchAllStudents()
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <StaffHeader/>
        <StudentCard studentsList={students}/>
        {students.length === 0 && (
          <View style={{marginTop:25}}>
          <Text style={{color:"#8292AC",textAlign:"center",fontSize:18}}>No Students To Show</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default staff

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#FFFFFF",
  },
  content: {
    padding: 20
  }
})