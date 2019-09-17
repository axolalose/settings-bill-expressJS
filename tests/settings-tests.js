const assert = require('assert');

const SettingsBill = require('../settings-bill');

describe('settings-bill', function(){

    const settingsBill = SettingsBill();

    it('should be able to record calls', function(){
        settingsBill.recordAction('call');
        assert.equal(1, settingsBill.actionsFor('call').length);
    });

    it('should be able to set the settings', function(){
        settingsBill.setSettings({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        });

        assert.deepEqual({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        }, settingsBill.getSettings())

    });
    it('should know when warning level reached', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.50,
            callCost: 5.00,
            warningLevel: 5,
            criticalLevel: 10
        });
    });
});