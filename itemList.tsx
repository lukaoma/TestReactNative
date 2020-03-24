import React, {useRef, useState} from 'react';
import {AsyncStorage, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, IconButton, Text, TextInput} from 'react-native-paper';


export default function ItemList() {
    const [list, setList] = useState([
        {text: "Single Default", key: 1},
    ]);
    const [Textstate, setTextState] = useState("");
    const textBox = useRef(null);

    function addToList() {
        if (Textstate !== "" && list.every((item) => item.text !== Textstate)) {
            setList(cur => {
                const newTodo = {text: Textstate, key: Math.random()};
                storeData().then();
                return [newTodo, ...cur]
            });
        }
        textBox.current.clear();
    }

    async function storeData() {
        try {
            await AsyncStorage.setItem('prevList', Textstate);
        } catch (error) {
            // Error saving data
            console.log("Error saving data");
        }
    }

    async function retrieveData() {
        try {
            const value = await AsyncStorage.getItem("prevList");
            if (value !== null) {
                // We have data!!
                setList(JSON.parse(value));
            }
        } catch (error) {
            // Error retrieving data
            console.log("Error retrieving data");
        }
    }

    return (
        <View style={styles.allContainer}>
            <View style={styles.textBoxContain}>
                <TextInput style={styles.textBox} label="Todos..." value={Textstate} ref={textBox}
                           onChangeText={text => setTextState(text)} theme={{colors: {primary: "#0e7a0d"}}}
                           returnKeyType={"done"} onSubmitEditing={addToList}/>
                <Button mode="contained" onPress={addToList}>ADD</Button>
            </View>


            {/*Deleting things*/}
            {list.map((item) => {
                return <TouchableOpacity style={styles.outsideTextContain} key={item.key} onPress={() => {
                    setList(cur => {
                        return cur.filter((currItem) => currItem.key != item.key);
                    });
                    storeData().then();
                }
                }>
                    <View style={styles.singleTextContainer}>
                        <IconButton
                            icon="trash-can-outline"
                            size={20}
                        /><Text style={styles.text}>{item.text}</Text>
                    </View>
                </TouchableOpacity>;
            })}
        </View>
    );
}
const styles = StyleSheet.create({
    allContainer: {
        flex: 1,
        alignItems: "center",
    },
    outsideTextContain: {
        width: "60%",
        height: "8%",
        paddingBottom: "2%",
    },
    singleTextContainer: {
        flexDirection: "row",
        width: "100%",
        height: "100%",
        borderWidth: 1,
        borderStyle: "dotted",
        borderRadius: 45,
        alignItems: "center",
    },
    text: {
        fontSize: 20
    },
    textBoxContain: {
        flex: 1,
        paddingBottom: "10%",
        width: "50%",
        maxHeight: "20%"
    },
    textBox: {
        width: "100%",
    },
    everything: {
        height: "100%",
        width: "100%"
    }
});
