module.exports = {

  WaitForMic: async function (page) {
    var numberofSeconds=0;
    var maxNumberOfSeconds=50;
    var micState = 'pending';
    while (micState != 'standby') {
      var result = await page.$$('css=cib-speech-icon');
      if (result.length > 0) {
        micState = await result[0].evaluate(e => e.state);
      }
      await page.waitForTimeout(1000);
      numberofSeconds++;
      if(numberofSeconds==maxNumberOfSeconds)
      break;
    }
    await page.waitForTimeout(9000);
  }










}



