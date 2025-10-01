import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderBar from "../components/HeaderBar";

export default function RandomScreen({ navigation }) {
    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [groupSize, setGroupSize] = useState("2");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await AsyncStorage.getItem("groups");
        if (data) setGroups(JSON.parse(data));
    };

    const saveData = async (data) => {
        setGroups(data);
        await AsyncStorage.setItem("groups", JSON.stringify(data));
    };

    const addGroup = () => {
        if (!groupName.trim()) return;
        const newGroup = {
            id: Date.now().toString(),
            name: groupName,
            size: parseInt(groupSize),
        };
        saveData([...groups, newGroup]);
        setGroupName("");
        setGroupSize("2");
    };

    const removeGroup = (id) => {
        saveData(groups.filter((g) => g.id !== id));
    };

    const randomize = async () => {
        const participantsData = await AsyncStorage.getItem("participants");
        if (!participantsData) return;
        const participants = JSON.parse(participantsData);

        if (groups.length === 0 || participants.length === 0) {
            alert("참가자와 그룹을 먼저 설정하세요!");
            return;
        }

        const totalCapacity = groups.reduce((sum, g) => sum + g.size, 0);
        if (participants.length > totalCapacity) {
            alert("참가자 수가 그룹 수용 인원보다 많습니다!");
            return;
        }

        // 랜덤 섞기
        const shuffled = [...participants].sort(() => Math.random() - 0.5);
        let index = 0;
        const results = groups.map((g) => {
            const members = shuffled.slice(index, index + g.size);
            index += g.size;
            return { ...g, members };
        });

        navigation.navigate("Result", { results });
    };

    const renderItem = ({ item }) => (
        <View style={styles.groupCard}>
            <Text style={styles.groupText}>
                {item.name} ({item.size}인)
            </Text>
            <TouchableOpacity onPress={() => removeGroup(item.id)}>
                <Text style={styles.delete}>✕</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <HeaderBar showBack={true} />
            <View style={styles.inputRow}>
                <TextInput
                    value={groupName}
                    onChangeText={setGroupName}
                    placeholder="그룹 입력"
                    style={styles.input}
                />
                <TextInput
                    value={groupSize}
                    onChangeText={setGroupSize}
                    placeholder="인원"
                    keyboardType="numeric"
                    style={[styles.input, { width: 60, marginLeft: 8 }]}
                />
                <TouchableOpacity style={styles.addButton} onPress={addGroup}>
                    <Text style={styles.addButtonText}>추가</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={groups}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                style={styles.list}
            />

            <TouchableOpacity style={styles.mainButton} onPress={randomize}>
                <Text style={styles.mainButtonText}>랜덤 그룹 배정</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 20 },
    inputRow: { flexDirection: "row", marginBottom: 20 },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
    addButton: {
        backgroundColor: "#007bff",
        borderRadius: 8,
        paddingHorizontal: 15,
        justifyContent: "center",
        marginLeft: 10,
    },
    addButtonText: { color: "#fff", fontWeight: "600" },
    list: { marginTop: 10 },
    groupCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
    },
    groupText: { fontSize: 16, fontWeight: "500" },
    delete: { fontSize: 18, color: "red", paddingHorizontal: 10 },
    mainButton: {
        marginTop: 20,
        backgroundColor: "#007bff",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    mainButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
