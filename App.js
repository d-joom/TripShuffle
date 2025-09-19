import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "./screens/MainScreen";
import ParticipantScreen from "./screens/ParticipantScreen";
import RandomScreen from "./screens/RandomScreen";
import ResultScreen from "./screens/ResultScreen";
import RandomPickScreen from "./screens/RandomPickScreen";
import PickResultScreen from "./screens/PickResultScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{ title: "TripShuffle" }} />
        <Stack.Screen name="Participant" component={ParticipantScreen} options={{ title: "참가자 설정" }} />
        <Stack.Screen name="Random" component={RandomScreen} options={{ title: "랜덤 배정" }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ title: "배정 결과" }} />
        <Stack.Screen name="RandomPick" component={RandomPickScreen} options={{ title: "랜덤 뽑기" }} />
        <Stack.Screen name="RandomPickResult" component={PickResultScreen} options={{ title: "뽑기 결과" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
