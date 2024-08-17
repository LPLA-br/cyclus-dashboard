import { manager } from "./BLEInstanciaServico";
import uuid from "@/constants/uuid";

function escanearConectar(): void
{
  manager.startDeviceScan(null, null, (error, device) =>
  {
    if (error || device == null )
    {
      // Handle error (scanning will be stopped automatically)
      return;
    }

    // Check if it is a device you are looking for based on advertisement data
    // or other criteria.
    if (device.name === 'ESP32' || device.name === 'esp32')
    {
      // Stop scanning as it's not necessary if you are scanning for one device.
      manager.stopDeviceScan();

      // Proceed with connection.
      device.connect()
      .then( ( device )=>
      {

        device.readCharacteristicForService( uuid.SERVICE_UUID, uuid.CHARACTERISTIC_UUID )
        .then( (characteristic)=>
        {
          console.log( characteristic.value );
        })
        .catch( ()=>
        {
          console.log( "CHARACTERISTIC READ ERROR: ", error );
        });

      })
      .catch( ( reason )=>
      {
        console.log( "CONNECTION ERROR: ", reason.value );
      });
    }
  });
}

export default escanearConectar;
