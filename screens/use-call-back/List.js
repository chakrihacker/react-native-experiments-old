import React, {memo} from 'react';
import {Button, View} from 'react-native';

const ListItem = memo(({item, onRemove}) => {
  console.log('Render: ListItem');
  return (
    <View>
      <Button title={item.name} onPress={() => onRemove(item.id)} />
    </View>
  );
});

export const List = memo(({list, onRemove}) => {
  console.log('Render: List');
  return (
    <View>
      {list.map(item => (
        <ListItem key={item.id} item={item} onRemove={onRemove} />
      ))}
    </View>
  );
});
