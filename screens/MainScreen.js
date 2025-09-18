import React from "react";
import { View, Button, StyleSheet } from "react-native";

export default function MainScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Button title="참가자 설정" onPress={() => navigation.navigate("ParticipantScreen")} />
            <View style={{ height: 20 }} />
            <Button title="랜덤 배정하기" onPress={() => navigation.navigate("RandomScreen")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
