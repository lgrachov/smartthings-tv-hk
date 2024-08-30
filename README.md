# SmartThings TV HomeKit

A simple HomeKit accessory made using HAP-NodeJS to make your SmartThings TV into a switch that can be controlled from HomeKit.

## Usage

### Setting up the `.env` file

In order to use this accessory, you need to setup the environment variables.

#### Setting up a SmartThings Personal Access Token

The first step is, you have to generate a SmartThings Personal Access Token. Generate a SmartThings Personal Access Token [here,](https://account.smartthings.com/tokens), and add this line to your `.env` file:

```env
SMARTTHINGS_PAT="Your SmartThings personal access token here!"
```

#### The last step, enter the device name

Instead of copying a device ID from SmartThings, this accessory finds a device with the name that you entered and automatically retrieves its device ID! So, all you need to do is add this line to your `.env`:

```env
SMARTTHINGS_DEVICE_NAME="The name of the device that you want to control."
```

For example, if your TV is named Kitchen TV (not including the room), then you need to add this to your `.env`:

```env
SMARTTHINGS_DEVICE_NAME="Kitchen TV"
```

### Starting the accessory

Now, you need to start the accessory. In order to do this, you need to install all the dependencies using npm. All you need to do is run `npm i`, and it will automatically install all of the dependencies.

> [!NOTE]
> The MAC Address is changed each time if a MAC Address is not specified in the `.env` file. To specify a MAC Address, you first have to generate a MAC Address using this [JSFiddle](https://jsfiddle.net/guest271314/qhbC9/) or by using [Browserling's MAC Address generator,](https://www.browserling.com/tools/random-mac) and then add this line to your `.env`:
>
> ```env
> MAC_ADDRESS="Your generated > MAC Address"
> ```

After that, you just need to run `npm start`.

### Adding the accessory to HomeKit

All that’s left to do is add the accessory to HomeKit. The default setup code is 141-91-495, but you can change it in the code. In order to type the setup code, you need to follow the steps:

1.  You first have to choose **Add Accessory**.
2.  Click on **More options...**.
3.  Choose the accessory with the name that you chose during the configuration process.
4.  Enter the setup code, and configure the accessory.

Ta-da! Your accessory is now ready to go!

## Two switches?

Yes! This accessory comes with two switches, one that controls the power, and a second one which controls the mute state!

## Known issues

There are a bit of bugs in this project, but check the known issues first before reporting an issue!

### The accessory is running, did not give any errors, but does not show up in HomeKit!

If you removed the accessory and you are trying to re-add it, you will have to reset the MAC Address to add it back again.