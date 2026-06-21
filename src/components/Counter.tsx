import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import {useCounterStore} from 'super-app-showcase-sdk/lib/counterStore';

const Counter = () => {
  const count = useCounterStore(state => state.count);
  const increment = useCounterStore(state => state.increment);
  const decrement = useCounterStore(state => state.decrement);
  const reset = useCounterStore(state => state.reset);

  return (
    <Card mode="contained" style={styles.card}>
      <Card.Content style={styles.content}>
        <Text variant="titleMedium">Counter</Text>
        <Text variant="displaySmall" style={styles.count}>
          {count}
        </Text>
        <View style={styles.actions}>
          <Button mode="contained-tonal" onPress={decrement}>
            -
          </Button>
          <Button mode="text" onPress={reset}>
            Reset
          </Button>
          <Button mode="contained-tonal" onPress={increment}>
            +
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  content: {
    alignItems: 'center',
    gap: 8,
  },
  count: {
    fontVariant: ['tabular-nums'],
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

export default Counter;
