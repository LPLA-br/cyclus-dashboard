import { Platform, PermissionsAndroid } from "react-native";
import { ToastAndroid } from "react-native";

const requisitarPermissaoBluetooth = async () =>
{
  if (Platform.OS === 'android' && PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
  {
      const apiLevel = parseInt(Platform.Version.toString(), 10);

      if (apiLevel < 31)
      {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      if (PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN && PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT)
      {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        ]);

        return (
          result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
        );
      }
    }

    ToastAndroid.show("Permissão bluetooth não provida",ToastAndroid.SHORT);
    return false;
};

export default requisitarPermissaoBluetooth;
