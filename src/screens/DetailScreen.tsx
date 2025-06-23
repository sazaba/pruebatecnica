import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getUserById } from '../services/userService';
import { User } from '../types/User';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

export default function DetailScreen() {
  const route = useRoute<DetailScreenRouteProp>();
  const navigation = useNavigation();
  const { userId } = route.params;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserById(userId);
      setUser(data);
    } catch (err) {
      setError('No se pudo cargar el usuario. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <Centered>
        <ActivityIndicator size="large" color="#fff" testID="activity-indicator" />
      </Centered>
    );
  }

  if (error) {
    return (
      <Centered>
        <ErrorText>{error}</ErrorText>
        <RetryButton onPress={fetchUser}>
          <RetryText>Reintentar</RetryText>
        </RetryButton>
      </Centered>
    );
  }

  if (!user) return null;

  return (
    <Screen>
      <AnimatableCard animation="fadeInUp" duration={700}>
        <AvatarContainer>
          <Avatar source={{ uri: `https://i.pravatar.cc/150?u=${user.id}` }} />
        </AvatarContainer>
        <Name>{user.name}</Name>

        <InfoCard>
          <InfoRow>
            <Label>Correo:</Label>
            <TextValue>{user.email}</TextValue>
          </InfoRow>
          <InfoRow>
            <Label>Teléfono:</Label>
            <TextValue>{user.phone}</TextValue>
          </InfoRow>
          <InfoRow>
            <Label>Dirección:</Label>
            <TextValue>{`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</TextValue>
          </InfoRow>
          <InfoRow>
            <Label>Empresa:</Label>
            <TextValue>{user.company.name}</TextValue>
            <TextValue style={{ fontStyle: 'italic' }}>{user.company.catchPhrase}</TextValue>
          </InfoRow>
        </InfoCard>

        <BackButton onPress={() => navigation.goBack()}>
          <ButtonText>Volver</ButtonText>
        </BackButton>
      </AnimatableCard>
    </Screen>
  );
}

const Screen = styled.ScrollView`
  flex: 1;
  background-color: #0d0d0d;
  padding: 24px;
`;

const Centered = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #0d0d0d;
`;

const AnimatableCard = styled(Animatable.View)`
  background-color: #1a1a1a;
  border-radius: 20px;
  padding: 28px;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 10px;
  elevation: 6;
`;

const AvatarContainer = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border-width: 2px;
  border-color: white;
`;

const Name = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  margin-bottom: 24px;
`;

const InfoCard = styled.View`
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

const InfoRow = styled.View`
  margin-bottom: 16px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #a3a3a3;
  font-weight: 600;
  margin-bottom: 4px;
`;

const TextValue = styled.Text`
  font-size: 16px;
  color: #e5e5e5;
`;

const BackButton = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: white;
  padding: 14px;
  border-radius: 10px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #1a1a1a;
  font-size: 16px;
  font-weight: 600;
`;

const ErrorText = styled.Text`
  color: #ff6b6b;
  font-size: 16px;
  text-align: center;
  margin-bottom: 16px;
`;

const RetryButton = styled.TouchableOpacity`
  background-color: #ffffff;
  padding: 12px 24px;
  border-radius: 8px;
`;

const RetryText = styled.Text`
  color: #1a1a1a;
  font-weight: 600;
`;
