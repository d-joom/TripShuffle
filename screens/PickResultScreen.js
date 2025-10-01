import React, { useState } from "react";
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from "react-native";
import HeaderBar from "../components/HeaderBar";

export default function RandomPickResultScreen({ route }) {
    const { picked } = route.params;
    const [revealedCount, setRevealedCount] = useState(0);

    const revealNext = () => setRevealedCount(prev => Math.min(prev + 1, picked.length));
    const revealAll = () => setRevealedCount(picked.length);

    return (
        <View style={styles.container}>
            <HeaderBar showBack={true} />
            <Button title="Skip" onPress={revealAll} />
            <FlatList
                data={picked}
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={revealNext} style={styles.itemContainer}>
                        <Text style={styles.name}>{index < revealedCount ? item.name : "???"}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    itemContainer: { padding: 15, borderBottomWidth: 1, borderColor: "#ccc" },
    name: { fontSize: 18 }
});
