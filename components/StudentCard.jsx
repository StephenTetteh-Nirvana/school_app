import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';

const StudentCard = ({studentsList}) => {

  const displayMessage = (motivation) => {
    switch(motivation) {
      case 1:
        alert("This student is feeling No motivation at all 😔")
      break;
      case 2:
        alert("This student is feeling less motivated today 😑")
      break;
      case 3:
        alert("This student is feeling A little motivated 🙂")
      break;
      case 4:
        alert("This student is feeling Motivated enough 🤪")
      break;
      case 5:
        alert("This student is feeling Fully Motivated 🤩")
      break;
    }
  }


  return (
    <View style={styles.container}>
      <FlatList
       data={studentsList}
       renderItem={({ item })=> (
        <TouchableOpacity style={styles.card} onPress={()=>displayMessage(item.motivation)}>
          <View style={{flexDirection: "row"}}>
            <View>
              <FontAwesome5 name="user-alt" size={27} color="black" />
            </View>
            <View style={{marginLeft:10}}>
              <Text style={{fontSize:17}}>{item.username}</Text>
              <Text style={{color:"#8292AC"}}>{item.email}</Text>
            </View>
          </View>
          <View style={styles.motivationBox}>
            <Text style={{margin:"auto",color:"#FFFFFF"}}>{item.motivation}</Text>
          </View>
        </TouchableOpacity>
       )}
      />
    </View>
  )
}

export default StudentCard

const styles = StyleSheet.create({
    container: {
      backgroundColor: "white"
    },
    card: {
      backgroundColor: "#F5F5F5",
      borderRadius: 10,
      marginTop:15,
      padding:20,
      flexDirection: "row",
      justifyContent: "space-between"
    },
    motivationBox: {
      backgroundColor: "#8292AC",
      width: 40,
      height: 40,
      borderRadius: 50
    }
})