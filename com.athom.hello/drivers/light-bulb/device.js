const Homey = require('homey'); 

module.exports = class MyDevice extends Homey.Device {

  /**
   * onInit is called when the device is initialized.
   */
  async onInit() {
    this.log('LigntBulb MyDevice has been initialized');
    
    this.registerCapabilityListener('onoff', async (value) => {
      this.log('MyDevice on/off :', value);
    });

    this.registerCapabilityListener('dim', async (value) => {
      this.log('MyDevice dim :', value);
    }); 

    // 예시로 5초마다 onoff 토글 예시
    // serInterval( () => {
    //   this.setCapabilityValue('onoff', true).catch( this.error );

    //   setTimeout( () => {
    //     this.setCapabilityValue('onoff', false).catch( this.error );
    //   }, 2500)
    // }, 5000)

    // 오류날 경우 보여줄 텍스트 예시
    // this.setUnavailable(this.homey.__('device_unavailable')).catch( this.error );
  }

  /**
   * onAdded is called when the user adds the device, called just after pairing.
   */
  async onAdded() {
    this.log('MyDevice has been added');
  }

  /**
   * onSettings is called when the user updates the device's settings.
   * @param {object} event the onSettings event data
   * @param {object} event.oldSettings The old settings object
   * @param {object} event.newSettings The new settings object
   * @param {string[]} event.changedKeys An array of keys changed since the previous version
   * @returns {Promise<string|void>} return a custom message that will be displayed
   */
  async onSettings({
    oldSettings,
    newSettings,
    changedKeys,
  }) {
    this.log("MyDevice settings where changed");
  }

  /**
   * onRenamed is called when the user updates the device's name.
   * This method can be used this to synchronise the name to the device.
   * @param {string} name The new name
   */
  async onRenamed(name) {
    this.log('MyDevice was renamed');
  }

  /**
   * onDeleted is called when the user deleted the device.
   */
  async onDeleted() {
    this.log('MyDevice has been deleted');
  }

};
