import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./screens/MainScreen";
import ParticipantScreen from "./screens/ParticipantScreen";
import RandomScreen from "./screens/RandomScreen";
import ResultScreen from "./screens/ResultScreen";
import DrawScreen from "./screens/DrawScreen";
import DrawResultScreen from "./screens/DrawResultScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Participant" component={ParticipantScreen} />
        <Stack.Screen name="Random" component={RandomScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Draw" component={DrawScreen} />
        <Stack.Screen name="DrawResult" component={DrawResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
