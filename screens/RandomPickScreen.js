import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderBar from "../components/HeaderBar";

export default function RandomPickScreen({ navigation }) {
    const [participants, setParticipants] = useState([]);
    const [pickCount, setPickCount] = useState(1);

    useEffect(() => {
        loadParticipants();
    }, []);

    const loadParticipants = async () => {
        const stored = await AsyncStorage.getItem("participants");
        if (stored) setParticipants(JSON.parse(stored));
    };

    const randomPick = () => {
        if (participants.length === 0) return alert("참가자가 없습니다.");
        if (pickCount > participants.length) return alert("인원이 부족합니다.");

        const shuffled = [...participants].sort(() => Math.random() - 0.5);
        const pickedList = shuffled.slice(0, pickCount);

        navigation.navigate("RandomPickResult", { picked: pickedList });
    };

    return (
        <View style={styles.container}>
            <HeaderBar showBack={true} />
            <Text>뽑을 인원 수:</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={String(pickCount)}
                onChangeText={text => setPickCount(Number(text))}
            />
            <Button title="뽑기" onPress={randomPick} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 5, marginVertical: 10, borderRadius: 5, width: 80 }
});
