import {Formik, FormikHelpers} from 'formik';
import React from 'react';
import {Text, View} from 'react-native';
import {COLORS, TEXTS} from 'src/constants';
import {MainProfileScreenProps} from 'src/navigation/NavigationTypes';
import {ProfileServices} from 'src/services/apiclient';

const Poster = ({navigation}: MainProfileScreenProps) => {
  return (
    <View>
      <Text>Poster</Text>
    </View>
  );
};

export default Poster;
