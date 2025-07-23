// App.tsx
import React from 'react';
import { SafeAreaView } from 'react-native';
import ContactList from './components/ContactList.jsx';
import { globalStyles } from './styles/globalStyles';



const CONTACTS = [
  {
    id: '1',
    name: 'Dennis',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    id: '2',
    name: 'Sweet Dee',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    id: '3',
    name: 'Frank',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    id: '4',
    name: 'Mac',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
];

const App = () => {
  return (
    <SafeAreaView style={globalStyles.safeContainer}>
      <ContactList contacts={CONTACTS} />
    </SafeAreaView>
  );
};

export default App;