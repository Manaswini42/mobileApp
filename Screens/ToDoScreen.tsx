import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  // Fetch user data from Reqres
  useEffect(() => {
    fetch('https://reqres.in/api/users/2')
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      {/* To-Do Input */}
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

      {/* To-Do List */}
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

      {/* API Response */}
      <Text style={styles.sectionTitle}>API User Info</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : user ? (
        <View style={styles.apiBox}>
          <Text>User ID: {user.id}</Text>
          <Text>Email: {user.email}</Text>
        </View>
      ) : (
        <Text>Failed to load user.</Text>
      )}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  apiBox: {
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
});
