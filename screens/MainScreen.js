import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import HeaderBar from "../components/HeaderBar";

export default function MainScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <HeaderBar showBack={false} />

            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.navigate("Participant")}
                >
                    <Text style={styles.btnText}>참가자 설정</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.navigate("Random")}
                >
                    <Text style={styles.btnText}>랜덤 그룹 배정</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.navigate("Draw")}
                >
                    <Text style={styles.btnText}>랜덤 뽑기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    content: { flex: 1, justifyContent: "center", alignItems: "center" },
    btn: {
        backgroundColor: "#4CAF50",
        padding: 16,
        marginVertical: 10,
        borderRadius: 10,
        width: 200,
        alignItems: "center",
    },
    btnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
