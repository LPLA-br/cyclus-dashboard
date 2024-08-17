import { manager } from "./BLEInstanciaServico";
import { BleError, Device } from "react-native-ble-plx";

/** monitoramento de conexão */

const setupOnDeviceDisconnected = (deviceIdToMonitor: String) =>
{
  manager.onDeviceDisconnected(deviceIdToMonitor, disconnectedListener);
}

const disconnectedListener = (error: BleError | null, device: Device | null) =>
{
  if (error)
  {
    console.error(JSON.stringify(error, null, 4));
  }

  if (device)
  {
    console.info(JSON.stringify(device, null, 4));

    // reconnect to the device
    device.connect();
  }
}
