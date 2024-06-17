import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native'

const modal = () => {
    const { motivationLevel } = useLocalSearchParams()


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         {motivationLevel === "1" ? (
            <Text>No motivation at all.</Text>
         ):motivationLevel === "2" ? (
            <Text>Feeling less motivated today</Text>
         ):motivationLevel === "3" ? (
            <Text>A little motivated</Text>
         ):motivationLevel === "4" ? (
            <Text>Motivated enough</Text>
         ):motivationLevel === "5" ? (
            <Text>Fully Motivated</Text>
         ):""
        }
      </View>
    );
}

export default modal

const styles = StyleSheet.create({})