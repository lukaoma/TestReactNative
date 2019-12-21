import React from 'react';
import {Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import ItemList from "./itemList";

export default function App() {
    return (
        <TouchableWithoutFeedback style={styles.everything} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/*Header*/}
                <View style={TextStyle.container}>
                    <View style={TextStyle.header}>
                        <Text style={TextStyle.headerText}>To-Do List</Text>
                    </View></View>
                {/*ItemList*/}
                <ItemList/>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    everything: {
        height: "100%",
        width: "100%"
    }
});
const TextStyle = StyleSheet.create({
    container: {
        paddingBottom: "10%"
    },
    header: {
        backgroundColor: "#0e7a0d",
        marginTop: "30%",
        marginLeft: "25%",
        alignItems: "center",
        borderRadius: 45,
        width: "50%",
    },
    headerText: {
        color: "white",
        fontSize: 40,
    },
    text: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold"
    }
});