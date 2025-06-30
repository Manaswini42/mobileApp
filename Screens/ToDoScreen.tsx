import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
const Icon = require('react-native-vector-icons/Ionicons').default;

export default function ToDoScreen() {
  const [item, setItem] = useState('');
  const [list, setList] = useState<string[]>([]);

  const handleAdd = () => {
    if (item.trim() !== '') {
      setList([...list, item]);
      setItem('');
    }
  };

  const handleDelete = (index: number) => {
    const updatedList = [...list];
    updatedList.splice(index, 1);
    setList(updatedList);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Enter item"
          value={item}
          onChangeText={setItem}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleAdd} style={styles.iconButton}>
          <Icon name="add-circle" size={32} color="#007bff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item}</Text>
            <TouchableOpacity onPress={() => handleDelete(index)}>
              <Icon name="close-circle" size={26} color="red" />
            </TouchableOpacity>
          </View>
        )}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 60,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    flex: 1,
    padding: 10,
  },
  iconButton: {
    marginLeft: 10,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  todoText: {
    fontSize: 16,
    flex: 1,
  },
});
