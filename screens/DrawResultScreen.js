import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import HeaderBar from "../components/HeaderBar";

export default function DrawResultScreen({ route }) {
    const { picked } = route.params;

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <HeaderBar showBack={true} />
            <FlatList
                data={picked}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 20 },
    card: {
        backgroundColor: "#f1f1f1",
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        alignItems: "center",
    },
    name: { fontSize: 16, fontWeight: "600" },
});
