const Homey = require('homey'); 

module.exports = class MyDriver extends Homey.Driver {

  /**
   * onInit is called when the driver is initialized.
   */
  async onInit() {
    this.log('MyDriver has been initialized');

    const card = this.homey.flow.getActionCard('blink-the-light');
    card.registerRunListener(async (args, state) => {
        await args.device.blink();
    });
  }

  /**
   * 디바이스 추가 시 'list_devices' 뷰가 호출될 때 onPairListDevices가 호출됩니다.
   * 페어링 가능한 장치의 데이터가 포함된 배열을 반환해야 합니다.
   * @returns 
   */
  async onPairListDevices() {
    this.log('onPairListDevices called');
  
    return [
      // Example device data, note that `store` is optional
      {
        name: 'My Light Bulg',
        data: {
          id: 'my-device-001',
        },
        // store: {
        //   address: '127.0.0.1',
        // },
      },
      {
        name: 'Dummy Switch',
        data: {
          id: 'dummy-device-002',
        },
      },
    ];
  }

};
