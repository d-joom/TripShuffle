import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import HeaderBar from "../components/HeaderBar";

export default function ParticipantScreen({ navigation }) {
    const [participants, setParticipants] = useState([]);
    const [name, setName] = useState("");

    const addParticipant = () => {
        if (name.trim()) {
            setParticipants([...participants, { id: Date.now().toString(), name }]);
            setName("");
        }
    };

    const removeParticipant = (id) => {
        setParticipants(participants.filter((p) => p.id !== id));
    };

    return (
        <View style={styles.container}>
            <HeaderBar showBack={true} />

            <View style={styles.inputRow}>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="이름 입력"
                    style={styles.input}
                />
                <Button title="추가" onPress={addParticipant} />
            </View>

            <FlatList
                data={participants}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.name}</Text>
                        <Button title="삭제" onPress={() => removeParticipant(item.id)} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 16 },
    inputRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        flex: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
});
