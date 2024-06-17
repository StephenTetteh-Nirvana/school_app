import { StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const Error = ({errMsg}) => {
  return (
        <View style={styles.container}>
            <View style={{display:"flex",flexDirection:"row"}}>
            <MaterialIcons name="dangerous" size={24} color="red" />
            <Text style={{fontSize:17,marginLeft:10}}>{errMsg}</Text>
            </View>
        </View>
  )
}

export default Error

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top:30,
        backgroundColor: "#F5F5F5",
        padding: 30,
        borderRadius: 10,
        zIndex: 999,
        borderLeftColor: "green",
    }
})