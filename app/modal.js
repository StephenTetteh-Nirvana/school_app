import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native'

const modal = () => {
    const { motivationLevel } = useLocalSearchParams()


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         {motivationLevel === "1" ? (
            <Text style={styles.text}>No motivation at all 😔</Text>
         ):motivationLevel === "2" ? (
            <Text style={styles.text}>Feeling less motivated today 😑</Text>
         ):motivationLevel === "3" ? (
            <Text style={styles.text}>A little motivated 🙂</Text>
         ):motivationLevel === "4" ? (
            <Text style={styles.text}>Motivated enough 🤪</Text>
         ):motivationLevel === "5" ? (
            <Text style={styles.text}>Fully Motivated 🤩</Text>
         ):""
        }
      </View>
    );
}

export default modal

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: "bold"
    }
})