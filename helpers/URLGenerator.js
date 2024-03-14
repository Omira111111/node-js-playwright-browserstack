var request = require("request");
module.exports = {

  Generate: async function (page) {
    var url = '';
    var pjson = require('../config.json');
    const isNgrok = pjson.isNgrok;
    if (isNgrok) {
      url = pjson.ngrokURL;
      var visitNgrok = await page.getByText('Visit Site');
      if (visitNgrok) {
        visitNgrok.click();
      }
    }
    else {
      url = pjson.StagingURL + pjson.applicationEndPoint;
      const headers = { 'X-SNR-TrustedAuth': pjson.token };
      page.setExtraHTTPHeaders(headers);
      return url;
    }

  }


}



