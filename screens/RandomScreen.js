import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RandomScreen({ navigation }) {
    const [groups, setGroups] = useState([]);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        loadParticipants();
    }, []);

    const loadParticipants = async () => {
        const data = await AsyncStorage.getItem("participants");
        if (data) setParticipants(JSON.parse(data));
    };

    const addGroup = () => {
        const newGroup = { id: Date.now().toString(), name: `그룹 ${groups.length + 1}`, count: 1 };
        setGroups([...groups, newGroup]);
    };

    const updateGroupName = (id, name) => setGroups(groups.map(g => (g.id === id ? { ...g, name } : g)));

    const updateGroupCount = (id, newCount) => {
        if (newCount < 1) return;
        const totalOther = groups.reduce((sum, g) => (g.id !== id ? sum + g.count : sum), 0);
        if (totalOther + newCount > participants.length) {
            Alert.alert("인원 초과", "참가자 수를 초과할 수 없습니다.");
            return;
        }
        setGroups(groups.map(g => (g.id === id ? { ...g, count: newCount } : g)));
    };

    const deleteGroup = (id) => setGroups(groups.filter(g => g.id !== id));

    // 🔹 랜덤 배정 + ResultScreen 이동
    const shuffleAndNavigate = () => {
        if (groups.length === 0) return Alert.alert("그룹 없음", "먼저 그룹을 추가해주세요.");

        const totalNeeded = groups.reduce((sum, g) => sum + g.count, 0);
        if (totalNeeded > participants.length) return Alert.alert("인원 부족", "참가자가 부족합니다.");

        const shuffled = [...participants].sort(() => Math.random() - 0.5);
        let index = 0;
        const assignment = groups.map(g => {
            const members = shuffled.slice(index, index + g.count);
            index += g.count;
            return { name: g.name, members };
        });

        // 🔹 ResultScreen으로 결과 전달
        navigation.navigate("ResultScreen", { assignment });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>랜덤 배정하기</Text>
            <Button title="그룹 추가" onPress={addGroup} />

            <FlatList
                data={groups}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.group}>
                        <TextInput style={styles.groupNameInput} value={item.name} onChangeText={(text) => updateGroupName(item.id, text)} />
                        <View style={styles.groupControls}>
                            <Button title="-" onPress={() => updateGroupCount(item.id, item.count - 1)} />
                            <TextInput style={styles.input} keyboardType="number-pad" value={item.count.toString()} onChangeText={(text) => updateGroupCount(item.id, parseInt(text) || 1)} />
                            <Button title="+" onPress={() => updateGroupCount(item.id, item.count + 1)} />
                            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteGroup(item.id)}>
                                <Text style={styles.deleteText}>삭제</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                style={{ marginTop: 20 }}
            />

            <Button title="랜덤 배정" onPress={shuffleAndNavigate} style={{ marginTop: 20 }} />
            <Text style={{ marginTop: 20 }}>총 참가자: {participants.length}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
    group: { marginVertical: 10 },
    groupNameInput: { fontSize: 18, borderWidth: 1, padding: 5, marginBottom: 5 },
    groupControls: { flexDirection: "row", alignItems: "center" },
    input: { borderWidth: 1, width: 50, textAlign: "center", marginHorizontal: 5, padding: 5 },
    deleteButton: { marginLeft: 10, backgroundColor: "red", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 },
    deleteText: { color: "white", fontWeight: "bold" },
});
