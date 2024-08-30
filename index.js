import 'dotenv/config';
import * as hap from 'hap-nodejs';
import { getDeviceByName, executeCommand } from './src/smartthingsApi.js';
import { generateMacAddress } from './src/network.js';
const tv = await getDeviceByName(process.env.SMARTTHINGS_DEVICE_NAME);
const deviceId = tv.deviceId;
const Accessory = hap.Accessory;
const Characteristic = hap.Characteristic;
const CharacteristicEventTypes = hap.CharacteristicEventTypes;
const Service = hap.Service;

const accessoryUuid = hap.uuid.generate('smartthings.tv');
const accessory = new Accessory(
  process.env.SMARTTHINGS_DEVICE_NAME,
  accessoryUuid
);
const powerService = new Service.Switch();
powerService.name = 'Power';
const muteService = new Service.Switch();
muteService.name = 'Mute';
muteService.subtype = 'audioMute';
let currentTVPower = true;
let commandTVPower = 'on';
let muteTV = false;
let commandMuteTV = 'unmuted';
const powerCharacteristic = powerService.getCharacteristic(Characteristic.On);
const muteCharacteristic = muteService.getCharacteristic(Characteristic.On);

powerCharacteristic.on(
  CharacteristicEventTypes.SET,
  async (value, callback) => {
    console.log('Setting TV power state to: ' + value);
    currentTVPower = value;
    if (value == true) {
      commandTVPower = 'on';
    } else {
      commandTVPower = 'off';
    }
    await executeCommand(deviceId, 'switch', 'main', commandTVPower, []);
    callback();
  }
);

muteCharacteristic.on(CharacteristicEventTypes.SET, async (value, callback) => {
  console.log('Setting TV mute state to: ' + value);
  muteTV = value;
  if (value == true) {
    commandMuteTV = 'mute';
  } else {
    commandMuteTV = 'unmute';
  }
  await executeCommand(deviceId, 'audioMute', 'main', commandMuteTV, []);
  callback();
});
powerService.name = 'Power';
accessory.addService(powerService);

muteService.name = 'Mute';
accessory.addService(muteService);

let username = '';
if (process.env.MAC_ADDRESS === undefined) {
  username = generateMacAddress();
} else {
  username = process.env.MAC_ADDRESS;
}
accessory.publish({
  username,
  pincode: '141-91-495',
  port: 458,
  category: hap.Categories.TELEVISION,
});

console.log('Accessory ready!');
console.log(`Setup code is 141-91-495`);
