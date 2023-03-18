/**
 * League Template
 */
class LeagueTemplate {

    createCharts() {
        let sleep = setInterval(() => {
            if (!this.isLoadComplated()) {
                return;
            }
            this.createShootingChart();
            clearInterval(sleep);
        }, 1000);
    }

    /**
     * check finishing loading data
     * @returns check result(boolean)
     */
    isLoadComplated() {
        // must override
    }

    /**
     * create shooting chart
     */
    createShootingChart() {
        // override if you render
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