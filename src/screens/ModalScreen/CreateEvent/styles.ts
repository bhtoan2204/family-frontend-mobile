import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', // Màu chữ
  },
  headerfile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  backButton: {
    color: COLORS.black,
    padding: 10,
  },
  //   input: {
  //     width: '90%',
  //     marginVertical: 10,
  //     padding: 10,
  //     borderWidth: 1,
  //     borderColor: 'gray',
  //     borderRadius: 5,
  //   },
  input: {
    height: 50,
    marginVertical: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '20%',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  containerBtn: {
    flexDirection: 'row',
    padding: 10,
  },
  // Style cho label
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    color: '#222', // Màu chữ
  },

  // Style cho phần footer của modal
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },

  viewSubmit: {
    alignItems: 'flex-end',
  },

  // Style cho văn bản của các nút
  buttonText: {
    color: '#fff', // Màu chữ
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  // Style cho container của modal
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền với độ mờ
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Style cho phần header của modal
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff', // Màu nền
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Màu viền dưới
  },

  // Style cho phần body của modal
  modalBody: {
    backgroundColor: '#ffffff', // Màu nền
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    // backgroundColor: '#007bff',
    // borderColor: '#007bff',
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});

export default styles;
