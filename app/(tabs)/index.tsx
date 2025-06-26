import React, { useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const App = () => {
  const [listText, setListText] = useState('');
  const [listItems, setListItems] = useState<string[]>([]);

  const listInputHandler = (enteredText: string) => {
    setListText(enteredText);
  };

  const addItemHandler = () => {
    
      setListItems((currentListItems) => [...currentListItems, listText]);
      setListText('');
    
  };

  const deleteItemHandler = (index: number) => {
    setListItems((currentListItems) =>
      currentListItems.filter((_, i) => i !== index)
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Enter item" style={styles.input} onChangeText={listInputHandler} value={listText} />
        <Button title="Add" onPress={addItemHandler} />
      </View>
      <ScrollView>
        {listItems.map((item, index) => (
          <View key={index} style={styles.rowContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteItemHandler(index)} style={styles.deleteButton} >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 10,
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: 'rgb(217, 124, 250)',
    padding: 10,
    borderRadius: 7,
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
