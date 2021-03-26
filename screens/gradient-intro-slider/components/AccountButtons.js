import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const AccountButtons = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.createButton}>
        <Text>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: 16,
  },
  createButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 24,
  },
  signInText: {
    color: '#fff',
  },
});

export default AccountButtons;
