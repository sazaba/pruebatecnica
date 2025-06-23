import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useUserStore } from '../store/userStore';

const PAGE_SIZE = 5;

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { users, loading, fetchUsers } = useUserStore();

  const [search, setSearch] = useState('');
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInitialUsers = async () => {
    try {
      setError(null);
      await fetchUsers();
    } catch (err) {
      setError('Error al cargar los usuarios. Verifica tu conexión.');
    }
  };

  useEffect(() => {
    if (users.length === 0) {
      fetchInitialUsers();
    }
  }, []);

  useEffect(() => {
    setVisibleUsers(users.slice(0, PAGE_SIZE));
    setPage(1);
  }, [users]);

  const loadMoreUsers = () => {
    if (loadingMore || visibleUsers.length >= users.length) return;
    setLoadingMore(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const newUsers = users.slice(0, nextPage * PAGE_SIZE);
      setVisibleUsers(newUsers);
      setPage(nextPage);
      setLoadingMore(false);
    }, 500);
  };

  const filteredUsers = visibleUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Centered>
        <ActivityIndicator size="large" color="#ffffff" />
      </Centered>
    );
  }

  if (error) {
    return (
      <Centered>
        <ErrorText>{error}</ErrorText>
        <RetryButton onPress={fetchInitialUsers}>
          <RetryText>Reintentar</RetryText>
        </RetryButton>
      </Centered>
    );
  }

  return (
    <Screen>
      <SearchInput
        placeholder="Buscar por nombre o email"
        placeholderTextColor="#777"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingVertical: 16 }}
        renderItem={({ item }) => (
          <Card onPress={() => navigation.navigate('Details', { userId: item.id })}>
            <Avatar source={{ uri: `https://i.pravatar.cc/150?u=${item.id}` }} />
            <TextContainer>
              <Name>{item.name}</Name>
              <Email>{item.email}</Email>
            </TextContainer>
          </Card>
        )}
        onEndReached={loadMoreUsers}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#888" /> : null}
      />
    </Screen>
  );
}

// 🧩 Styled-components minimalist dark theme
const Screen = styled.View`
  flex: 1;
  background-color: #0c0c0c;
  padding-horizontal: 16px;
`;

const Centered = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #0c0c0c;
`;

const Card = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #1a1a1a;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 14px;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const Avatar = styled.Image`
  width: 54px;
  height: 54px;
  border-radius: 27px;
  border-width: 2px;
  border-color: white;
  margin-right: 14px;
`;

const TextContainer = styled.View`
  flex: 1;
`;

const Name = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #f5f5f5;
`;

const Email = styled.Text`
  font-size: 14px;
  color: #b2bec3;
  margin-top: 4px;
`;

const SearchInput = styled.TextInput`
  height: 44px;
  background-color: #1e1e1e;
  border-radius: 10px;
  padding: 0 16px;
  margin-top: 16px;
  color: #fff;
  font-size: 16px;
`;

const ErrorText = styled.Text`
  color: #f87171;
  font-size: 16px;
  text-align: center;
  margin-bottom: 12px;
`;

const RetryButton = styled.TouchableOpacity`
  background-color: #4ade80;
  padding: 12px 20px;
  border-radius: 8px;
`;

const RetryText = styled.Text`
  color: #0c0c0c;
  font-size: 16px;
  font-weight: 600;
`;
