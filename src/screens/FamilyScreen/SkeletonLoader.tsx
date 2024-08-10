import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Shimmer from 'react-native-shimmer';

const SkeletonLoader = () => {
  const {width} = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <Shimmer>
        <View style={[styles.skeleton, {width: width - 40, height: 200}]} />
      </Shimmer>
      <View style={styles.content}>
        <Shimmer>
          <View style={styles.skeleton} />
        </Shimmer>
        <Shimmer>
          <View style={[styles.skeleton, {width: width - 80, height: 40}]} />
        </Shimmer>
        <Shimmer>
          <View style={[styles.skeleton, {width: width - 60, height: 40}]} />
        </Shimmer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fdfdfd',
  },
  skeleton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginVertical: 10,
  },
  content: {
    marginTop: 20,
  },
});

export default SkeletonLoader;
