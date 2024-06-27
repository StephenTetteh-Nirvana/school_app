import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={styles.container}>
       <View style={styles.loadingBox}>
           <ActivityIndicator color="#000" size={30}/>
       </View>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F5F5F5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top:0,
    left: 0,
    zIndex:999,
    opacity: 0.6
    },
})