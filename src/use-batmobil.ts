import { useState, useRef, useMemo } from "react";

enum BatMobileBLE {
  HUB_UUID = "00001623-1212-efde-1623-785feabcd123",
  CHARACTERISTIC_UUID = "00001624-1212-efde-1623-785feabcd123"
}

export const useBatMobile = () => {
  const btGattChar = useRef<
    BluetoothRemoteGATTCharacteristic | null | undefined
  >(null);
  const [connected, setConnected] = useState(false);

  async function connect() {
    const request: RequestDeviceOptions = {
      filters: [
        {
          services: [BatMobileBLE.HUB_UUID]
        }
      ],
      optionalServices: ["battery_service", "device_information"]
    };
    return navigator.bluetooth
      .requestDevice(request)
      .then(device => device.gatt?.connect())
      .then(server => server?.getPrimaryService(BatMobileBLE.HUB_UUID))
      .then(service =>
        service?.getCharacteristic(BatMobileBLE.CHARACTERISTIC_UUID)
      )
      .then(x => {
        btGattChar.current = x; // saving the ref
        setConnected(true);
      });
  }

  async function writeData(port: number, speed: number) {
    const speedInt = Number(speed.toFixed(0));
    console.log(`Speed ${speed} (${speedInt}) at ${port}`);
    const data = Int8Array.of(
      0x08, // https://lego.github.io/lego-ble-wireless-protocol-docs/index.html#output-sub-command-startspeed-speed1-speed2-maxpower-useprofile-0x08
      0x00,
      0x81,
      port, // The motor ?!
      0x11,
      0x51,
      0x00,
      speedInt // 75 -> speed set to
    );
    if (btGattChar.current) {
      await btGattChar.current.writeValue(data);
      console.log("wrote data", data);
    } else {
      console.warn("No yet connected to write");
    }
  }

  return useMemo(
    () => ({
      connect,
      connected: connected,
      async setSpeedLeft(speed: number) {
        await writeData(1, speed);
      },
      async setSpeedRight(speed: number) {
        await writeData(0, speed);
      }
    }),
    [connected]
  );
};
