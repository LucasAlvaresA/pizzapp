import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d2e',
    paddingVertical: '5%',
    paddingEnd: '4%',
    paddingStart: '4%',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    marginRight: 14,
  },
  icon: {
    width: 26,
    height: 26,
  },
  input: {
    backgroundColor: '#101026',
    borderRadius: 4,
    width: '100%',
    height: 40,
    marginBottom: 12,
    justifyContent: 'center',
    paddingHorizontal: 8,
    color: '#FFF',
    fontSize: 18,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  action: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  buttonAdd: {
    backgroundColor: '#3fd1ff',
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
  },
  buttonText: {
    color: '#101026',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonNext: {
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    height: 40,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    marginTop: 24,
  },
});
