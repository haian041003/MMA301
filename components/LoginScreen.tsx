import * as React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
    const [email, onChangeEmail] = React.useState('');
    const [error, setError] = React.useState('');
    const [password, onChangePassWord] = React.useState('');

    const handleEmailChange = (text: string) => {
        onChangeEmail(text);
        if (/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(text)) {
            setError('');
        } else {
            setError('Wrong email format');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.headerText}>Welcome to Little Lemon</Text>
                <Text style={styles.regularText}>Login to continue</Text>
                <TextInput
                    style={styles.inputBox}
                    onChangeText={handleEmailChange}
                    value={email}
                    placeholder={"email"}
                    keyboardType="email-address"
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <TextInput
                    style={styles.inputBox}
                    onChangeText={onChangePassWord}
                    value={password}
                    placeholder={"password"}
                    secureTextEntry={true}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        padding: 40,
        fontSize: 30,
        color: '#EDEFEE',
        textAlign: "center",
    },
    regularText: {
        fontSize: 24,
        padding: 20,
        marginVertical: 8,
        color: '#EDEFEE',
        textAlign: "center",
    },
    inputBox: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
        borderColor: '#EDEFEE',
        backgroundColor: '#EDEFEE',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginLeft: 12,
    },
});