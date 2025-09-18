import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function ResultScreen({ route }) {
    const { assignment } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>배정 결과</Text>
            {assignment.map((g, idx) => (
                <View key={idx} style={styles.group}>
                    <Text style={styles.groupName}>{g.name}</Text>
                    {g.members.map((p, i) => (
                        <Text key={i} style={styles.member}>- {p.name}</Text>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
    group: { marginBottom: 20 },
    groupName: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
    member: { fontSize: 16, marginLeft: 10 },
});
