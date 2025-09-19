import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RandomScreen({ navigation }) {
    const [participants, setParticipants] = useState([]);
    const [groups, setGroups] = useState([]);
    const [newGroupName, setNewGroupName] = useState("");

    useEffect(() => {
        loadParticipants();
        loadGroups();
    }, []);

    const loadParticipants = async () => {
        const stored = await AsyncStorage.getItem("participants");
        if (stored) setParticipants(JSON.parse(stored));
    };

    const loadGroups = async () => {
        const stored = await AsyncStorage.getItem("groups");
        if (stored) setGroups(JSON.parse(stored));
    };

    const saveGroups = async (data) => {
        setGroups(data);
        await AsyncStorage.setItem("groups", JSON.stringify(data));
    };

    const addGroup = () => {
        if (!newGroupName.trim()) return;
        const updated = [...groups, { id: Date.now().toString(), name: newGroupName, size: 1 }];
        setNewGroupName("");
        saveGroups(updated);
    };

    const removeGroup = (id) => {
        saveGroups(groups.filter(g => g.id !== id));
    };

    const changeGroupSize = (id, delta) => {
        const updated = groups.map(g => g.id === id ? { ...g, size: Math.max(1, g.size + delta) } : g);
        saveGroups(updated);
    };

    const changeGroupName = (id, name) => {
        const updated = groups.map(g => g.id === id ? { ...g, name } : g);
        saveGroups(updated);
    };

    const randomAssign = () => {
        if (participants.length === 0) return alert("참가자가 없습니다.");
        if (groups.length === 0) return alert("그룹이 없습니다. 먼저 그룹을 추가하세요.");
        const totalGroupSize = groups.reduce((sum, g) => sum + g.size, 0);
        if (totalGroupSize > participants.length) return alert("그룹 인원이 참가자를 초과합니다.");

        const shuffled = [...participants].sort(() => Math.random() - 0.5);
        let index = 0;
        const assigned = groups.map(g => {
            const members = shuffled.slice(index, index + g.size);
            index += g.size;
            return { ...g, members };
        });

        navigation.navigate("Result", { assigned });
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <TextInput placeholder="그룹 이름" value={newGroupName} onChangeText={setNewGroupName} style={styles.input} />
            <Button title="그룹 추가" onPress={addGroup} />

            <FlatList
                data={groups}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.group}>
                        <TextInput
                            value={item.name}
                            onChangeText={text => changeGroupName(item.id, text)}
                            style={[styles.input, { flex: 1 }]}
                        />
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Button title="-" onPress={() => changeGroupSize(item.id, -1)} />
                            <Text style={{ marginHorizontal: 5 }}>{item.size}</Text>
                            <Button title="+" onPress={() => changeGroupSize(item.id, 1)} />
                        </View>
                        <Button title="삭제" onPress={() => removeGroup(item.id)} />
                    </View>
                )}
            />

            <Button title="랜덤 배정" onPress={randomAssign} />
        </View>
    );
}

const styles = StyleSheet.create({
    input: { borderWidth: 1, borderColor: "#ccc", padding: 5, borderRadius: 5, marginVertical: 5 },
    group: { flexDirection: "row", alignItems: "center", marginVertical: 5 }
});
