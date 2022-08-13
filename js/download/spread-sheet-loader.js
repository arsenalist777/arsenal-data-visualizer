/**
 * SpreadSheet loader
 */
class SpreadSheetLoader {

    static endpoint = 'https://sheets.googleapis.com/v4/spreadsheets/';
    static apiKeyQuery = 'key=AIzaSyBT75f2ABz4yf-V04gep7MOwL_Y5K9F_TY';

    /**
     * load data from google spread sheet via Sheets API
     * @param {String} url spread sheet URL 
     * @param {Function} callback callback function
     */
    static load(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            callback(JSON.parse(xhr.responseText));
        });
        xhr.open('GET', this.endpoint + url[0] + '/values/' + url[1] + '?' + this.apiKeyQuery);
        xhr.send();
    }
}