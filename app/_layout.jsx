import { View } from 'react-native';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack,useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const router = useRouter()

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: ""}} />
      <Stack.Screen name="login" options={{ 
        headerTitle: "",
        headerLeft: () => (
          <View style={{backgroundColor: "#E5E4E2",borderRadius: 30,padding: 5}}>
            <Ionicons name="chevron-back" size={30} color="black" onPress={()=>router.back()} />
          </View>
        )
        }} />
      <Stack.Screen name="register"  options={{ 
        headerTitle: "",
        headerLeft: () => (
          <View style={{backgroundColor: "#E5E4E2",borderRadius: 30,padding: 5}}>
            <Ionicons name="chevron-back" size={30} color="black" onPress={()=>router.back()} />
          </View>
        )
        }} />
        <Stack.Screen name="student"/>
        <Stack.Screen name="staff"/>
        <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
   
  );
}
