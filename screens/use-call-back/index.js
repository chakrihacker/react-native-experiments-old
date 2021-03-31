import React, {useCallback} from 'react';
import {Text, StyleSheet, TextInput, Button, ScrollView} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {Blub} from './Blub';
import {List} from './List';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingVertical: 10,
    margin: 10,
  },
});

export const UseCallBackScreen = () => {
  console.log('Render: UseCallBackScreen');

  const [users, setUsers] = React.useState([
    {id: 'a', name: 'Robin'},
    {id: 'b', name: 'Dennis'},
  ]);

  const [text, setText] = React.useState('');

  const handleText = (value) => {
    setText(value);
  };

  const handleAddUser = () => {
    setUsers(users.concat({id: uuidv4(), name: text}));
  };

  const handleRemove = useCallback(
    (id) => {
      setUsers(users.filter((user) => user.id !== id));
    },
    [users],
  );

  return (
    <ScrollView>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={handleText}
        placeholder={'Enter User Name'}
      />
      <Button title={'Add User'} onPress={handleAddUser} />

      <List list={users} onRemove={handleRemove} />
      <Text>{'useEffect and other hooks use Object.is for comparision'}</Text>
      <Blub />
    </ScrollView>
  );
};
