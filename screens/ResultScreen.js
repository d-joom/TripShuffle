import React, { useState } from "react";
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from "react-native";

export default function ResultScreen({ route }) {
    const { assigned } = route.params;
    const [revealedIndex, setRevealedIndex] = useState(assigned.map(() => 0));

    const revealNext = (groupIdx) => {
        setRevealedIndex(prev =>
            prev.map((val, idx) => (idx === groupIdx ? Math.min(val + 1, assigned[idx].members.length) : val))
        );
    };

    const revealAll = () => setRevealedIndex(assigned.map(g => g.members.length));

    return (
        <View style={styles.container}>
            <Button title="Skip" onPress={revealAll} />
            <FlatList
                data={assigned}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    <View style={styles.groupBlock}>
                        <Text style={styles.groupName}>{item.name}</Text>
                        <TouchableOpacity onPress={() => revealNext(index)} style={styles.membersContainer}>
                            {item.members.map((m, idx) =>
                                idx < revealedIndex[index] ? (
                                    <Text key={idx} style={styles.member}>- {m.name}</Text>
                                ) : (
                                    <Text key={idx} style={styles.hiddenMember}>- ???</Text>
                                )
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    groupBlock: { marginBottom: 15 },
    groupName: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
    membersContainer: { padding: 10, backgroundColor: "#f0f0f0", borderRadius: 8 },
    member: { marginLeft: 10, marginTop: 2, fontSize: 16 },
    hiddenMember: { marginLeft: 10, marginTop: 2, fontSize: 16, color: "#ccc" },
});
