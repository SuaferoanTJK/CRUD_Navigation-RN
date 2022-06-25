import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {
  Headline,
  Text,
  Button,
  Portal,
  Dialog,
  Paragraph,
} from 'react-native-paper';
import axios from 'axios';
import globalStyles from '../components/styles/global';
import {url} from '../utils/endpoint';

const ClientDetails = ({navigation, route}) => {
  const [alert, setAlert] = useState(false);
  const {name, phone, email, company, id} = route.params.item;
  const {setApiQuery} = route.params;

  const deleteClient = async () => {
    const urlDelete = `${url}/${id}`;
    try {
      await axios.delete(urlDelete);
      setAlert(false);
      navigation.navigate('Home');
      setApiQuery(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <Headline style={globalStyles.title}>{name}</Headline>
      <View style={styles.data}>
        <Text style={styles.text}>
          <Text style={styles.textBold}>Phone: </Text>
          {phone}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.textBold}>Email: </Text>
          {email}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.textBold}>Company: </Text>
          {company}
        </Text>
      </View>
      <Button
        mode="contained"
        icon="pencil-circle"
        style={styles.editBtn}
        onPress={() => {
          navigation.navigate('Form', {client: route.params.item, setApiQuery});
        }}>
        Edit
      </Button>
      <Button
        mode="contained"
        icon="cancel"
        style={styles.deleteBtn}
        onPress={() => {
          setAlert(true);
        }}>
        Delete
      </Button>
      <Portal>
        <Dialog visible={alert}>
          <Dialog.Title style={globalStyles.alertTitle}>
            Delete client?
          </Dialog.Title>
          <Dialog.Content style={globalStyles.content}>
            <Paragraph>Once deleted it can't be recovered</Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={globalStyles.actions}>
            <Button
              onPress={() => {
                setAlert(false);
              }}>
              CANCEL
            </Button>
            <Button
              onPress={() => {
                deleteClient(id);
              }}>
              YES, DELETE
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {marginBottom: 20, fontSize: 16},
  textBold: {fontWeight: '700'},
  data: {marginBottom: 20},
  editBtn: {backgroundColor: '#F5AA19', marginBottom: 30},
  deleteBtn: {backgroundColor: '#D42637'},
});

export default ClientDetails;
