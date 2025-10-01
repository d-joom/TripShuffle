import React, { useState } from "react";
import { View, Text, Button } from "react-native";

interface Group {
    name: string;
    participants: string[];
}

const groups: Group[] = [
    { name: "A조", participants: ["철수", "영희", "민수"] },
    { name: "B조", participants: ["지수", "준호", "수빈"] },
];

export default function RandomRevealScreen() {
    const [revealed, setRevealed] = useState < string[] > ([]); // 공개된 참가자들

    const handleReveal = () => {
        // 아직 공개되지 않은 모든 참가자 풀 만들기
        const all = groups.flatMap((g) => g.participants);
        const remaining = all.filter((p) => !revealed.includes(p));

        if (remaining.length === 0) return; // 다 공개되었으면 종료

        // 무작위로 1명 뽑기
        const next = remaining[Math.floor(Math.random() * remaining.length)];
        setRevealed([...revealed, next]);
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            {groups.map((group) => (
                <View key={group.name} style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{group.name}</Text>
                    {group.participants.map((p) => (
                        <Text
                            key={p}
                            style={{
                                fontSize: 16,
                                color: revealed.includes(p) ? "black" : "gray",
                            }}
                        >
                            {revealed.includes(p) ? p : "???"}
                        </Text>
                    ))}
                </View>
            ))}

            <Button title="한 명 공개하기" onPress={handleReveal} />
        </View>
    );
}
