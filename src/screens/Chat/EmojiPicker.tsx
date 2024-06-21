import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import EmojiSelector from 'react-native-emoji-selector';
import Popover from 'react-native-popover-view';
import { COLORS } from 'src/constants';

const { width, height } = Dimensions.get('window');

const EmojiPicker = ({ onChange }) => {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <View style={styles.container}>
      <Popover
        isVisible={showPopover}
        onRequestClose={() => setShowPopover(false)}
        from={
          <TouchableOpacity style={{}} onPress={() => setShowPopover(true) }>
            <Icon
              name="emoji-emotions"
              type="material"
              size={40}
              color={COLORS.DenimBlue}
              containerStyle={styles.icon}
            />
          </TouchableOpacity>
        }
      >
        <View style={styles.emojiPickerContainer}>
          <EmojiSelector
            onEmojiSelected={emoji => {
              onChange(emoji);
            }}
            columns={8}
            showSearchBar={true}
            showSectionHeaders={true}
            categoryLabelStyle={styles.categoryLabel}
          />
        </View>
      </Popover>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  icon: {

  },
  emojiPickerContainer: {
    backgroundColor: '#fff',
    width: width * 0.9,
    height: height * 0.5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EmojiPicker;
