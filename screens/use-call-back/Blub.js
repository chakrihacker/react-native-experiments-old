import React, {useCallback, useEffect, useMemo} from 'react';
import {Text} from 'react-native';

function Foo({bar, baz}) {
  useEffect(() => {
    const options = {bar, baz};
    console.log(options);
  }, [bar, baz]);

  return <Text>foobar</Text>;
}

export function Blub() {
  const bar = useCallback(() => {}, []);
  const baz = useMemo(() => [1, 2, 3], []);

  return <Foo bar={bar} baz={baz} />;
}
