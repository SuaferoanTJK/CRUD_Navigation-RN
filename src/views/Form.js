import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Portal,
  Paragraph,
  Dialog,
} from 'react-native-paper';
import axios from 'axios';

import globalStyles from '../components/styles/global';
import {url} from '../utils/endpoint';

const Form = ({navigation, route}) => {
  const {setApiQuery} = route.params;

  const initialState = {
    name: '',
    phone: '',
    email: '',
    company: '',
  };
  const [formData, setFormData] = useState(initialState);
  const [alert, setAlert] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (route.params.client) {
      setFormData(route.params.client);
      setEditMode(true);
    } else {
      setFormData(initialState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateForm = async () => {
    if (Object.values(formData).includes('')) {
      setAlert(true);
      return;
    }
    try {
      if (!editMode) {
        await axios.post(url, formData);
      } else {
        const editURL = `${url}/${route.params.client.id}`;
        await axios.put(editURL, formData);
        setEditMode(false);
      }
    } catch (error) {
      console.log(error);
    }
    navigation.navigate('Home');
    setFormData(initialState);
    setApiQuery(true);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <Headline style={globalStyles.title}>
        {editMode ? 'Update' : 'Add'} Client's Info
      </Headline>
      <TextInput
        style={globalStyles.input}
        label="Name"
        placeholder="Enter client's name"
        value={formData.name}
        onChangeText={name => {
          setFormData({...formData, name});
        }}
      />
      <TextInput
        style={globalStyles.input}
        label="Phone"
        placeholder="Enter client's phone"
        value={formData.phone}
        onChangeText={phone => {
          setFormData({...formData, phone});
        }}
      />
      <TextInput
        style={globalStyles.input}
        label="Email"
        placeholder="Enter client's email"
        value={formData.email}
        onChangeText={email => {
          setFormData({...formData, email});
        }}
      />
      <TextInput
        style={globalStyles.input}
        label="Company"
        placeholder="Enter client's company"
        value={formData.company}
        onChangeText={company => {
          setFormData({...formData, company});
        }}
      />
      <Button
        icon="pencil-circle"
        mode="contained"
        style={globalStyles.btn}
        onPress={() => {
          validateForm();
        }}>
        Save Client
      </Button>
      <Portal>
        <Dialog visible={alert}>
          <Dialog.Title style={globalStyles.alertTitle}>
            Fields empty
          </Dialog.Title>
          <Dialog.Content style={globalStyles.content}>
            <Paragraph>All fields are required</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              style={globalStyles.newClientBtn}
              onPress={() => {
                setAlert(false);
              }}>
              0K
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

export default Form;
