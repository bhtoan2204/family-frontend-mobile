import {MaterialIcons} from '@expo/vector-icons';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../constants';

const EditProfileScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>

        <Text>Edit Profile</Text>
      </View>

      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 22,
          }}>
          <TouchableOpacity>
            <Image />

            <View>
              <MaterialIcons
                name="photo-camera"
                size={32}
                color={COLORS.primary}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <View
            style={{
              flexDirection: 'column',
              marginBottom: 6,
            }}>
            <Text>Name</Text>
            <View>
              <TextInput editable={true} />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginBottom: 6,
            }}>
            <Text>Email</Text>
            <View>
              <TextInput editable={true} />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginBottom: 6,
            }}>
            <Text>Password</Text>
            <View>
              <TextInput editable={true} secureTextEntry />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginBottom: 6,
            }}>
            <Text>Date or Birth</Text>
            <TouchableOpacity>
              <Text></Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginBottom: 6,
          }}>
          <Text>Country</Text>
          <View>
            <TextInput editable={true} />
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            height: 44,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Save Change</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
