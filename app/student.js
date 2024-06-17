import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Link, useRouter } from 'expo-router'

const student = () => {
  const motivationLevels = [1,2,3,4,5]
  const router = useRouter()

  const setMotivation = (motivationLevel) => {
    router.push({pathname: 'modal', params: {motivationLevel} })
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={{position:"absolute",top:"40%"}}>
        <View>
         <Text style={{fontSize:20}}>How motivated are we feeling today ?</Text>
        </View>
        <View>
          <FlatList 
          data={motivationLevels}
          renderItem={({ item })=> (
            <TouchableOpacity style={styles.motivationBtn} onPress={()=>setMotivation(item)}>
              <Text style={{color:"white",fontSize:17,margin:"auto"}}>{item}</Text>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
        />
        </View>
      </View>
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
  motivationBtn: {
    width: 50,
    height: 50, 
    backgroundColor: "#2666CF",
    padding: 6,
    borderRadius: 50,
    marginTop: 15,
    marginLeft: 7
  }
})