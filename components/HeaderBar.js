// components/HeaderBar.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HeaderBar({ showBack = false }) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {showBack ? (
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backText}>◀</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.backPlaceholder} />
            )}

            {/* 로고 */}
            <Image
                source={require("../assets/logo.png")} // 로고 이미지 경로 확인!
                style={styles.logo}
                resizeMode="contain"
            />

            {/* 우측 자리 비움 (정렬 맞추기) */}
            <View style={styles.backPlaceholder} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    backButton: {
        width: 40,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    backText: {
        fontSize: 20,
    },
    backPlaceholder: {
        width: 40, // 좌/우 균형 맞추려고
    },
    logo: {
        height: 40,
        flex: 1,
        resizeMode: "contain",
    },
});
