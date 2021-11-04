import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import Realm from 'realm';
import Navigator from './Navigator';

const FeelingSchema = {
  name: 'Feeling',
  properties: {
    _id: 'int',
    emotion: 'string',
    message: 'string',
  },
  primaryKey: '_id',
};

export default function App() {
  const [ready, setReady] = useState(false);

  const startLoading = async () => {
    const realm = await Realm.open({
      path: 'positiveDayoriDB',
      schema: [FeelingSchema],
    });
  };

  const onFinish = () => setReady(true);

  if (!ready) {
    return (
      <AppLoading
        onError={console.error}
        startAsync={startLoading}
        onFinish={onFinish}
      />
    );
  }

  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}
