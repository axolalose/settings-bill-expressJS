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
describe('Warnings for Settings-Bill', function(){
    it('should return warning when you have reached the limit of the warningLevel', function(){
        const settingsBill = SettingsBill();

        settingsBill.setSettings({
            smsCost: 3.50,
            callCost: 5.00,
            warningLevel: 10,
            criticalLevel:20,
        })
        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');

        assert.equal(true, settingsBill.hasReachedWarningLevel());
    });
  

    it('should return danger when it has reached the critical level', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.50,
            callCost: 5.00,
            warningLevel: 5,
            criticalLevel: 10
        });

        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');

        assert.equal(true, settingsBill.hasReachedCriticalLevel());

    });
});
describe('Actions for Settings-Bill', function(){
    const settingsBill = SettingsBill();
    settingsBill.setSettings({
        smsCost: 2.35,
        callCost: 3.35,
        warningLevel: 30,
        criticalLevel: 40
    });

    settingsBill.recordAction('call');
    settingsBill.recordAction('call');
    settingsBill.recordAction('sms');
    settingsBill.recordAction('sms');

    assert.equal(4.70, settingsBill.totals().smsTotal);
    assert.equal(6.70, settingsBill.totals().callTotal);
    assert.equal(11.40, settingsBill.totals().grandTotal);

});
describe('all totals of sms and call', function(){
    it('should calculate the right totals', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        });
    
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');
    
        assert.equal(2.35, settingsBill.totals().smsTotal);
        assert.equal(3.35, settingsBill.totals().callTotal);
        assert.equal(5.70, settingsBill.totals().grandTotal);
    
    });
    it('should return calculations for grand total', function(){
        
    })
});


