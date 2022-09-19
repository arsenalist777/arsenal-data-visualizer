/**
 * TeamTemplate
 */
class TeamTemplate {

    /**
     * create template charts.
     */
    createCharts() {
        let sleep = setInterval(() => {
            if (!this.isLoadedData()) {
                return;
            }
            this.createGoalLogChart();
            clearInterval(sleep);
        }, 1000);
    }

    /**
     * check finishing loading data
     * @returns check result(boolean)
     */
    isLoadedData() {
        // must override
    }

    /**
     * create goal log chart
     */
    createGoalLogChart() {
        // override if you render
    }

    /**
     * create spread sheet urls
     * 
     * @param {String} spreadsheetId spreadsheet id
     * @param {Array} seasons seasons
     * @param {String} sheetName sheet name
     * @returns 
     */
    createUrls(spreadsheetId, seasons, sheetName) {
        let urls = {};
        for (let index in seasons) {
            let season = seasons[index];
            urls['seasons'] = seasons;
            urls[season] = [spreadsheetId, "'" + season + ' ' + sheetName + "'"];
        }
        return urls;
    }
}