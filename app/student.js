import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'

const student = () => {
  
  return (
    <View>
      <Text>student</Text>
      <Link href="/modal">
       <Text>Open modal</Text>
      </Link>
    </View>
  )
}

export default student

const styles = StyleSheet.create({})