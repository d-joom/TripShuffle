import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderBar from "../components/HeaderBar";

export default function DrawScreen({ navigation }) {
    const [count, setCount] = useState("1");
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await AsyncStorage.getItem("participants");
        if (data) setParticipants(JSON.parse(data));
    };

    const draw = () => {
        const num = parseInt(count);
        if (participants.length === 0) {
            alert("참가자를 먼저 추가하세요!");
            return;
        }
        if (num <= 0 || num > participants.length) {
            alert("올바른 숫자를 입력하세요!");
            return;
        }

        const shuffled = [...participants].sort(() => Math.random() - 0.5);
        const picked = shuffled.slice(0, num);

        navigation.navigate("DrawResult", { picked });
    };

    return (
        <View style={styles.container}>
            <HeaderBar canGoBack={true} />
            <Text style={styles.title}>몇 명을 뽑을까요?</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={count}
                onChangeText={setCount}
            />
            <TouchableOpacity style={styles.mainButton} onPress={draw}>
                <Text style={styles.mainButtonText}>랜덤 뽑기</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
    title: { fontSize: 18, marginBottom: 20, fontWeight: "600" },
    input: {
        width: 80,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 8,
        textAlign: "center",
        fontSize: 16,
        marginBottom: 20,
    },
    mainButton: {
        backgroundColor: "#007bff",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: "center",
    },
    mainButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
