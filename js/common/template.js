/**
 * Template
 */
class Template {

    /**
     * create data
     */
    createData() {
        // must override
    }

    /**
     * create charts
     */
    createCharts() {
        // must override
    }

    /**
     * create spread sheet url
     * 
     * @param {*} spreadsheetId spreadsheet id 
     * @param {*} season season
     * @param {*} sheetName sheet name
     * @returns 
     */
    createUrls(spreadsheetId, season, sheetName) {
        let url = [spreadsheetId, "'" + season + ' ' + sheetName + "'"];
        return url;
    }
}