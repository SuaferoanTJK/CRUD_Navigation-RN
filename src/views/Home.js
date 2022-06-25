import React, {useEffect, useState} from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {Headline, Card, Title, Paragraph, Button} from 'react-native-paper';
import axios from 'axios';

import globalStyles from '../components/styles/global';
import {url} from '../utils/endpoint';

const Home = ({navigation}) => {
  const [clients, setClients] = useState([]);
  const [apiQuery, setApiQuery] = useState(true);

  useEffect(() => {
    const obtainClientsAPI = async () => {
      try {
        const data = await axios.get(url);
        setClients(data.data);
        setApiQuery(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (apiQuery) {
      obtainClientsAPI();
    }
  }, [apiQuery, clients]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Button
        icon="plus-circle"
        onPress={() => navigation.navigate('Form', {setApiQuery})}>
        New Client
      </Button>

      <Headline style={globalStyles.title}>
        {clients.length > 0 ? 'Clients' : 'There are no clients yet'}
      </Headline>
      <FlatList
        data={clients}
        style={styles.list}
        keyExtractor={client => client.id.toString()}
        renderItem={({item}) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>{item.name}</Title>
              <Paragraph>{item.company}</Paragraph>
            </Card.Content>
            <Card.Actions style={styles.btn}>
              <Button
                onPress={() =>
                  navigation.navigate('ClientDetails', {item, setApiQuery})
                }>
                More Info
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {marginBottom: 20},
  list: {marginBottom: 150},
  btn: {justifyContent: 'flex-end'},
});

export default Home;
