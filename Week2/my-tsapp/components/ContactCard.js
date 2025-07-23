// components/ContactCard.js
import React from 'react';
import { View, Image, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const ContactCard = ({ name, image }) => {
  return (
    <View style={globalStyles.card}>
      <Image source={{ uri: image }} style={globalStyles.avatar} />
      <Text style={globalStyles.text}>{name}</Text>
    </View>
  );
};

export default ContactCard;