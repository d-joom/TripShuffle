import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function ParticipantScreen() {
    const [name, setName] = useState("");
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        loadParticipants();
    }, []);

    const loadParticipants = async () => {
        const data = await AsyncStorage.getItem("participants");
        if (data) setParticipants(JSON.parse(data));
    };

    const saveParticipants = async (list) => {
        await AsyncStorage.setItem("participants", JSON.stringify(list));
    };

    const addParticipant = () => {
        if (!name) return;
        const newParticipant = {
            id: Date.now().toString(),
            name,
            image: null,
        };
        const newList = [...participants, newParticipant];
        setParticipants(newList);
        saveParticipants(newList);
        setName("");
    };

    const pickImage = async (id) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const newList = participants.map((p) =>
                p.id === id ? { ...p, image: result.assets[0].uri } : p
            );
            setParticipants(newList);
            saveParticipants(newList);
        }
    };

    const deleteParticipant = (id) => {
        const newList = participants.filter((p) => p.id !== id);
        setParticipants(newList);
        saveParticipants(newList);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>참가자 추가</Text>
            <View style={styles.addContainer}>
                <TextInput
                    placeholder="이름 입력"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
                <Button title="추가" onPress={addParticipant} />
            </View>

            <FlatList
                data={participants}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.participant}>
                        <TouchableOpacity onPress={() => pickImage(item.id)}>
                            {item.image ? (
                                <Image source={{ uri: item.image }} style={styles.image} />
                            ) : (
                                <View style={styles.defaultImage} />
                            )}
                        </TouchableOpacity>
                        <Text style={styles.nameText}>{item.name}</Text>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => deleteParticipant(item.id)}
                        >
                            <Text style={styles.deleteButtonText}>삭제</Text>
                        </TouchableOpacity>
                    </View>
                )}
                style={{ marginTop: 20, width: "100%" }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, marginBottom: 10, textAlign: "center" },
    addContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
    input: { flex: 1, borderWidth: 1, padding: 8, marginRight: 10 },
    participant: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
    image: { width: 40, height: 40, borderRadius: 20 },
    defaultImage: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#ccc" },
    nameText: { flex: 1, marginLeft: 10 },
    deleteButton: { backgroundColor: "red", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 },
    deleteButtonText: { color: "white", fontWeight: "bold" },
});
