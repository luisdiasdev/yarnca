import React, { useState } from 'react';

import { Text, StyleSheet, StatusBar, SafeAreaView, View } from 'react-native';
import Constants from 'expo-constants';
import { Input } from 'react-native-elements';
import Button from '../../components/Button';
import { COLORS, PAGES } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: COLORS.main,
    paddingTop: Constants.statusBarHeight + 10,
    paddingHorizontal: 20,
  },
  instructions: {
    color: COLORS.mainTextColor,
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
    paddingBottom: 15,
  },
  welcome: {
    color: COLORS.mainTextColor,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nameGroup: {
    marginHorizontal: '10%',
  },
  nameInput: {
    textAlign: 'center',
  },
});

const Main = ({ navigation }) => {
  const [name, setName] = useState();

  const isStartDisabled = () => Boolean(!name || name.trim() === '');

  const handleStart = () => {
    if (!name) {
      return;
    }
    navigation.navigate(PAGES.Chat, { name });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.main} />
      <View style={styles.content}>
        <Text style={styles.welcome}>Welcome! Let&apos;s Chat!</Text>
        <Text style={styles.instructions}>
          Identify yourself and start chatting :)
        </Text>
        <View style={styles.nameGroup}>
          <Input
            value={name}
            onChangeText={n => setName(n)}
            placeholder="What's your name?"
            inputStyle={styles.nameInput}
          />
          <Button
            title="Start"
            gutterTop
            onPress={handleStart}
            disabled={isStartDisabled()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Main;
