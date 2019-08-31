import {useSelector, Provider, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import React, {Fragment, useState, useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import addEmail from './src/reducers/userReducer';

const URL = 'http://numbersapi.com/';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import configureStore from './src/reducers/store';
import {isUserWhitespacable} from '@babel/types';
const {store, persistor} = configureStore();

console.log('store: ', store);
console.log('persistor: ', persistor);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <InnerApp />
      </PersistGate>
    </Provider>
  );
};

// TODO: Add useEffect and useContext

const InnerApp = () => {
  const userEmail = useSelector(state => state.user.email);
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const [email, setEmail] = useState(email);
  const [count, setCount] = useState(0);
  const [fact, setFact] = useState('No Fact Yet');
  const updateEmail = email =>
    dispatch({
      type: 'UPDATE_EMAIL',
      payload: email,
    });
  console.log('email: ', email);
  console.log('state: ', state);

  // Only trigger once on app load by passing an empty array as the 2nd param
  // Place inital API calls here
  useEffect(() => {
    console.log('Equivalent of ComponentDidMount');
    const url = `${URL}${count}/trivia`;
    console.log('url: ', url);
    fetch(`${URL}${count}/trivia`)
      .then(result => result.text())
      .then(text => {
        console.log('api text: ', text);
        setFact(text);
      });
  }, []);

  // Only update when a particular element is upated.  In this case...email
  useEffect(() => {
    console.log('email updated');
  }, [email]);

  useEffect(() => {
    const url = `${URL}${count}/trivia`;
    console.log('url: ', url);
    fetch(`${URL}${count}/trivia`)
      .then(result => result.text())
      .then(text => {
        console.log('api text: ', text);
        setFact(text);
      });
  }, [count]);

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text>{`email: ${userEmail}`}</Text>
            </View>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={text => setEmail(text)}
              value={email}
            />
            <Button onPress={() => updateEmail(email)} title="Change Email" />
            <View style={styles.sectionContainer}>
              <Text>{`Fact Number: ${count}`}</Text>
              <Text>{`${fact}`}</Text>
            </View>
            <Button onPress={() => setCount(count + 1)} title="Update Fact" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
