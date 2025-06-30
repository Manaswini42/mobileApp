// components/ListItem.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  item: string;
  onDelete: () => void;
};

const ListItem : React.FC<Props> = ({ item, onDelete }) => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item}</Text>
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
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
