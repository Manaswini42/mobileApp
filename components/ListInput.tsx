// components/InputField.tsx
import React from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onAddItem: () => void;
};

const ListInput: React.FC<Props> = ({ value, onChangeText, onAddItem }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Enter item"
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
      />
      <Button title="Add" onPress={onAddItem} />
    </View>
  );
};

export default ListInput;

const styles = StyleSheet.create({
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
});
