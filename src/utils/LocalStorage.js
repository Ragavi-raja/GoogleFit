import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (item, selectedValue) => {
  try {
    await AsyncStorage.setItem(item, selectedValue);
  } catch (error) {}
};

export const readData = async item => {
  let result = '';
  try {
    result = await AsyncStorage.getItem(item);
  } catch (error) {}
  return result;
};

export const clearAllData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
  } catch (error) {}
};
