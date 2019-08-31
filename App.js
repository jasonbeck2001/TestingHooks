import {useSelector, Provider, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import React, {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import styles from './App.styles';
import addEmail from './src/reducers/userReducer';

const URL = 'http://numbersapi.com/';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import configureStore from './src/reducers/store';
import {isUserWhitespacable} from '@babel/types';
const {store, persistor} = configureStore();

console.log('store: ', store);
console.log('persistor: ', persistor);

const GlobalContext = createContext({});

const App = () => {
  const appName = 'Testing Hooks';
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalContext.Provider value={{appName}}>
          <InnerApp />
        </GlobalContext.Provider>
      </PersistGate>
    </Provider>
  );
};

// TODO: What other hooks should we check out?

const InnerApp = () => {
  const {appName} = useContext(GlobalContext);
  console.log('app name from Context: ', appName);
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

  // useEffect w/o a 2nd param will trigger on every render.
  useEffect(() => {
    console.log('useEffect Triggered on every render');
  });

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

  // This useEffect called only when count is changed
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

export default App;
