/**
 * League Template
 */
class LeagueTemplate {

    /**
     * create template charts.
     */
    createCharts() {
        let sleep = setInterval(() => {
            if (!this.isLoadComplated()) {
                return;
            }
            this.createShootingChart();
            this.createExpectedGoalsForChart();
            this.createPassingChart();
            this.createGoalAndShotCreationChart();
            this.createPossessionChart();
            this.createTeamSequenceStypeChart();
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
     * create expected goals for chart
     */
    createExpectedGoalsForChart() {
        // override if you render
    }

    /**
     * create passing chart
     */
    createPassingChart() {
        // override if you render
    }

    /**
     * create goal and shot creation chart
     */
    createGoalAndShotCreationChart() {
        // override if you render
    }

    /**
     * create possession chart
     */
    createPossessionChart() {
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