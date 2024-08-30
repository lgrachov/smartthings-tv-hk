import ky from 'ky';
import 'dotenv/config';

const api = ky.create({
  prefixUrl: 'https://api.smartthings.com/v1/',
  headers: {
    Authorization: `Bearer ${process.env.SMARTTHINGS_PAT}`,
  },
});

async function getDevices() {
  const { items } = await api.get('devices').json();
  return items;
}

async function getDeviceByName(deviceName) {
  const devices = await getDevices();
  return devices.find((device) => (device.name = deviceName));
}

async function executeCommand(deviceId, capability, component, command, args) {
  const json = {
    commands: [{ component, capability, command, arguments: args }],
  };
  const response = await api.post(`devices/${deviceId}/commands`, {
    json,
  });
  if (!response == {}) {
    return response;
  }
  return true;
}

export { executeCommand, getDeviceByName, getDevices };

// try {
//   console.log(
//     JSON.stringify(
//       await executeCommand(
//         'deviceId',
//         'switch',
//         'main',
//         'on',
//         []
//       ),
//       null,
//       2
//     )
//   );
// } catch (e) {
//   console.log(JSON.stringify(await e.response.json(), null, 2));
// }
