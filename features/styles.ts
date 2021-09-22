import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  welcome: {
    marginTop: 50,
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  formDescription: {
    marginTop: 30,
    marginBottom: 25,
    fontSize: 17,
    marginHorizontal: 18,
    fontWeight: '300',
  },
  formInput: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 15,
  },
  formButton: {
    marginTop: 45,
    backgroundColor: 'lightseagreen',
    padding: 15,
    borderRadius: 12,
    margin: 15,
  },
  formButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
  },
  formError: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 15,
    color: 'red',
    fontWeight: '300',
  },
  item: {
    flex: 1,
    padding: 20,
  },
  name: {
    fontSize: 18,
    marginBottom: 12,
    color: 'black',
    fontWeight: '500',
  },
  email: {
    fontSize: 15,
    color: 'lightseagreen',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
  },
  radioButton: {
    color: '#777777',
  },
});
