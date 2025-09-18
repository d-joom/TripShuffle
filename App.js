import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "./screens/MainScreen";
import ParticipantScreen from "./screens/ParticipantScreen";
import RandomScreen from "./screens/RandomScreen";
import ResultScreen from "./screens/ResultScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ title: "TripShuffle" }} />
        <Stack.Screen name="ParticipantScreen" component={ParticipantScreen} options={{ title: "참가자 설정" }} />
        <Stack.Screen name="RandomScreen" component={RandomScreen} options={{ title: "랜덤 배정" }} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} options={{ title: "배정 결과" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
