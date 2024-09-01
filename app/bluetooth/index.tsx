import { Text, View } from "react-native";
import { Stack } from "expo-router";
import { Platform, PermissionsAndroid } from "react-native";

import { BleManager } from 'react-native-ble-plx'
import uuid from "../../constants/uuid";

import { useEffect, useState } from "react";

export default function Bluetooth()
{
  const [ dados, setDados ] = useState<string>("VAZIO");

  const requestBluetoothPermission = async (): Promise<boolean> =>
  {
    if (Platform.OS === 'android' && PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    {
      const apiLevel = parseInt(Platform.Version.toString(), 10);

      if (apiLevel < 31)
      {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
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
    return false;
  };

  useEffect( ()=>
    {
      (async ()=>
       {
        /* kamehameha de if's
         * script pog monolítico de teste
        pode ser segmenentado em refatorações.*/
        const manager = new BleManager();

        if ( await requestBluetoothPermission() )
        {
          setDados("PERMISSÃO BLUETOOTH");
          manager.onStateChange( (estado)=>
          {
            if ( estado === "PoweredOn" )
            {
              setDados("BLUETOOTH ATIVO");
              manager.startDeviceScan([ uuid.SERVICE_UUID ], null, (error, scannerDevice)=>
              {
                if ( error )
                {
                  setDados( `ERRO: ${error.cause}` );
                }

                if ( scannerDevice != null )
                {
                  if ( scannerDevice.name === "ESP32" || scannerDevice.name === "esp32" )
                  {
                    setDados( "esp32 ou ESP32 encontrado !" );
                    scannerDevice.connect()
                    .then( ()=>
                    {
                      let caracteristica = scannerDevice.readCharacteristicForService( uuid.SERVICE_UUID, uuid.CHARACTERISTIC_UUID );
                      caracteristica
                      .then( (value)=>
                      {
                        setDados( `${value.deviceID} ${value.serviceUUID} ${value.read()} ${value.value}` );
                      })
                      .catch( (reason)=>
                      {
                        setDados( (typeof reason == "string" ? reason : "não foi possível ler característica") );
                      });
                    })
                    .catch( ( reason )=>
                    {
                      setDados( (typeof reason == "string" ? reason : "não foi possível conectar-se com dispositvo") );
                    });
                  }
                  else
                  {
                    setDados("esp32 ou ESP32 não encontrado");
                  }
                }
                else
                {
                  setDados("scannerDevice é null por algum motivo: refatora!");
                }

              });
            }
            else
            {
              setDados("BLUETOOTH INATIVO");
            }
          });
        }
        else
        {
          setDados("SEM PERMISSÃO BLUETOOTH");
        }

       })();

    }, [] );

  return (
    <View>
      <Stack.Screen options={{title:"BLUETOOTH"}} />
      <Text>
        { dados }
      </Text>
    </View>
  );
}

