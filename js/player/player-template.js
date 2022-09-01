/**
 * PlayerTemplate
 */
class PlayerTemplate {

    /**
     * create template charts.
     */
    createCharts() {
        let sleep = setInterval(() => {
            if (!this.isLoadedData()) {
                return;
            }
            this.createGoalShotCreationChart();
            this.createExpectedChart();
            this.createExpectedDiffChart();
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
     * create goal and shot creation chart
     */
    createGoalShotCreationChart() {
        // override if you render
    }

    /**
     * create expected chart
     */
    createExpectedChart() {
        // override if you render
    }

    /**
     * create expected diff chart
     */
    createExpectedDiffChart() {
        // override if you render
    }

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