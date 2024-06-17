import { StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const Success = () => {
  return (
        <View style={styles.container}>
            <View style={{display:"flex",flexDirection:"row"}}>
            <AntDesign name="checkcircle" size={24} color="green" />
            <Text style={{fontSize:17,marginLeft:10}}>Account created successfully.</Text>
            </View>
        </View>
  )
}

export default Success

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top:30,
        backgroundColor: "#F5F5F5",
        padding: 30,
        borderRadius: 10,
        zIndex: 999,
        borderLeftColor: "green"
    }
})