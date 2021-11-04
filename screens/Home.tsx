import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator';
import { useDB } from '../context';
import { FlatList } from 'react-native';

export type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface HomeProps {
  navigation: HomeNavigationProp;
}

const Home = ({ navigation: { navigate } }: HomeProps) => {
  const realm = useDB();
  const [feelings, setFeelings] = useState([]);

  useEffect(() => {
    if (!realm) return;

    const feelings = realm.objects('Feeling');
    setFeelings(feelings);
    feelings.addListener(() => {
      const feelings = realm.objects('Feeling');
      setFeelings(feelings);
    });
    return () => {
      feelings.removeAllListeners();
    };
  }, [realm]);

  return (
    <View>
      <Title>My journal</Title>
      <FlatList
        data={feelings}
        contentContainerStyle={{ paddingVertical: 10 }}
        ItemSeparatorComponent={Separator}
        keyExtractor={(feeling) => feeling._id + ''}
        renderItem={({
          item,
        }: {
          item: {
            _id: number;
            emotion: string;
            message: string;
          };
        }) => (
          <Record>
            <Emotion>{item.emotion}</Emotion>
            <Message>{item.message}</Message>
          </Record>
        )}
      />
      <Btn onPress={() => navigate('Write')}>
        <Ionicons name='add' color='white' size={40} />
      </Btn>
    </View>
  );
};
export default Home;

const View = styled.View`
  flex: 1;
  padding: 0px 30px;
  padding-top: 100px;
  background-color: ${colors.bgColor};
`;

const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 38px;
  font-weight: 500;
  margin-bottom: 100px;
`;

const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 50px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.btnColor};
  elevation: 5;
  box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
`;

const Record = styled.View`
  background-color: ${colors.cardColor};
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
`;

const Emotion = styled.Text`
  font-size: 24px;
  margin-right: 10px;
`;

const Message = styled.Text`
  font-size: 18px;
`;

const Separator = styled.View`
  height: 10px;
`;
