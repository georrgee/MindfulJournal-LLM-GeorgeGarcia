import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

/**
 * @author George Garcia
 * @description Atom component that renders a back button for the navigation header
 */

const NavBackButton: React.FC = () => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8, marginLeft: 8 }}>
      <Ionicons name="chevron-back" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default NavBackButton;