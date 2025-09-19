import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function ParticipantScreen() {
    const [participants, setParticipants] = useState([]);
    const [newName, setNewName] = useState("");

    useEffect(() => {
        loadParticipants();
    }, []);

    const loadParticipants = async () => {
        const stored = await AsyncStorage.getItem("participants");
        if (stored) setParticipants(JSON.parse(stored));
    };

    const saveParticipants = async (data) => {
        setParticipants(data);
        await AsyncStorage.setItem("participants", JSON.stringify(data));
    };

    const addParticipant = () => {
        if (!newName.trim()) return;
        const updated = [...participants, { id: Date.now().toString(), name: newName, image: null }];
        setNewName("");
        saveParticipants(updated);
    };

    const removeParticipant = (id) => {
        const updated = participants.filter(p => p.id !== id);
        saveParticipants(updated);
    };

    const pickImage = async (id) => {
        const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.5 });
        if (!result.canceled) {
            const updated = participants.map(p => p.id === id ? { ...p, image: result.assets[0].uri } : p);
            saveParticipants(updated);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="이름 입력"
                value={newName}
                onChangeText={setNewName}
                style={styles.input}
            />
            <Button title="추가" onPress={addParticipant} />
            <FlatList
                data={participants}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.participant}>
                        <TouchableOpacity onPress={() => pickImage(item.id)}>
                            <Image source={item.image ? { uri: item.image } : require("../assets/default.png")} style={styles.image} />
                        </TouchableOpacity>
                        <Text style={styles.name}>{item.name}</Text>
                        <Button title="삭제" onPress={() => removeParticipant(item.id)} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 5, marginVertical: 10, borderRadius: 5 },
    participant: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
    image: { width: 40, height: 40, borderRadius: 20, marginRight: 10, backgroundColor: "#ccc" },
    name: { flex: 1 }
});
