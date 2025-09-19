import React from "react";
import { View, Button, StyleSheet } from "react-native";

export default function MainScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.buttonWrapper}>
                <Button
                    title="참가자 설정"
                    onPress={() => navigation.navigate("Participant")}
                />
            </View>
            <View style={styles.buttonWrapper}>
                <Button
                    title="랜덤 배정"
                    onPress={() => navigation.navigate("Random")}
                />
            </View>
            <View style={styles.buttonWrapper}>
                <Button
                    title="랜덤 뽑기"
                    onPress={() => navigation.navigate("RandomPick")}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,                   // 화면 전체 사용
        justifyContent: "center",   // 세로 중앙
        alignItems: "center",       // 가로 중앙
        backgroundColor: "#fff",    // 배경색
        padding: 20
    },
    buttonWrapper: {
        width: "80%",              // 버튼 너비
        marginVertical: 10         // 버튼 간격
    }
});
