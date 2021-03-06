import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import Realm from 'realm';
import Navigator from './Navigator';
import { DBContext } from './context';

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
  const [realm, setRealm] = useState<Realm | null>(null);

  const startLoading = async () => {
    const connection = await Realm.open({
      path: 'nomadDiaryDB',
      schema: [FeelingSchema],
    });
    setRealm(connection);
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
    <DBContext.Provider value={realm}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </DBContext.Provider>
  );
}
