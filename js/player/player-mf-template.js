/**
 * MF Template
 */
class PlayerMfTemplate extends PlayerTemplate {

    /**
     * Constructor
     * @param {String} spreadsheetId spreadsheet URL
     * @param {Array} seasons target seasons (format: 20XX-XX)
     * @param {Boolean} isRendering rendering chart flag
     */
    constructor(spreadsheetId, seasons, isRendering) {
        super();
        this.name;
        this.spreadsheetId = spreadsheetId;
        this.seasons = seasons;
        this.goalShotCreationUrls = super.createUrls(spreadsheetId, seasons, Const.GOAL_SHOT_CREATION.SHEET_NAME);
        this.expectedUrls = super.createUrls(spreadsheetId, seasons, Const.EXPECTED.SHEET_NAME);
        this.passingUrls = super.createUrls(spreadsheetId, seasons, Const.PASSING.SHEET_NAME);
        this.goalShotCreationData = {};
        this.expectedData = {};
        this.expectedDiffData = {};
        this.passingData = {};
        this.createMfTemplateData(isRendering);
    }

    /**
    * check finishing loading data
    * @returns check result
    */
    isLoadedData() {
        if (Object.keys(this.goalShotCreationData).length !== this.seasons.length || Object.keys(this.expectedData).length !== this.seasons.length || Object.keys(this.expectedDiffData).length !== this.seasons.length || Object.keys(this.passingData).length !== this.seasons.length) {

            // doesn't finish loading data
            return false;
        }
        return true;
    }

    /**
     * create MF template data
     * @param {*} isRendering rendering chart flag
     */
    createMfTemplateData(isRendering) {

        // load spreadsheet goal and shot creation
        this.goalShotCreationUrls.seasons.forEach(season => {
            let urls = this.goalShotCreationUrls[season];
            SpreadSheetLoader.load(urls, (response) => {
                response.values.splice(0, 2);
                this.goalShotCreationData[season] = GoalShotCreation.processData(response.values);
            });
        });

        // load spreadsheet expected
        this.expectedUrls.seasons.forEach(season => {
            let urls = this.expectedUrls[season];
            SpreadSheetLoader.load(urls, (response) => {
                response.values.splice(0, 2);
                this.expectedData[season] = Expected.processData(response.values);
                this.expectedDiffData[season] = ExpectedDiff.processData(response.values);
            });
        });

        // load spreadsheet passing
        this.passingUrls.seasons.forEach(season => {
            let urls = this.passingUrls[season];
            SpreadSheetLoader.load(urls, (response) => {
                response.values.splice(0, 2);
                this.passingData[season] = Passing.processData(response.values);
            });
        });

        if (isRendering) {
            this.createCharts();
        }
    }

    /**
     * create goal and shot creation chart(Override)
     */
    createGoalShotCreationChart() {

        let title = ' Goal and Shot Creation ';

        // candlestick
        const GOAL_SHOT_CREATION_TARGET_ID_CANDLESTICK = 'chart_goal_shot_creation_candlestick_';
        Object.keys(this.goalShotCreationData).map(key => {

            if (this.goalShotCreationData[key][0].length >= 5) {

                // candlestick charts needs more than 5 match data
                // rendering each season
                let targetId = GOAL_SHOT_CREATION_TARGET_ID_CANDLESTICK + key;
                Common.addChartDiv([targetId]);
                new Candlestick(this.name + title + key).render(this.goalShotCreationData[key], targetId);
            }
        });

        // scatter
        // rendering seasons
        const GOAL_SHOT_CREATION_TARGET_ID_SCATTER = 'chart_goal_shot_creation_scatter';
        Common.addChartDiv([GOAL_SHOT_CREATION_TARGET_ID_SCATTER]);
        new Scatter(this.name + title + this.seasons.join(', ')).render(this.goalShotCreationData, GOAL_SHOT_CREATION_TARGET_ID_SCATTER);
    }

    /**
     * create expected chart(Override)
     */
    createExpectedChart() {

        let title = ' Expected ';

        // candlestick
        const EXPECTED_TARGET_ID_CANDLESTICK = 'chart_expected_candlestick_';
        Object.keys(this.expectedData).map(key => {

            if (this.expectedData[key][0].length >= 5) {

                // candlestick charts needs more than 5 match data
                // rendering each season
                let targetId = EXPECTED_TARGET_ID_CANDLESTICK + key;
                Common.addChartDiv([targetId]);
                new Candlestick(this.name + title + key).render(this.expectedData[key], targetId);
            }
        });

        // scatter
        // rendering seasons
        const EXPECTED_TARGET_ID_SCATTER = 'chart_expected_scatter';
        Common.addChartDiv([EXPECTED_TARGET_ID_SCATTER]);
        new Scatter(this.name + title + this.seasons.join(', ')).render(this.expectedData, EXPECTED_TARGET_ID_SCATTER);
    }

    /**
     * create expected diff chart(Override)
     */
    createExpectedDiffChart() {
        let titleXg = ' xG Diff ';
        let titleXa = ' xA Diff ';

        // area
        const XG_DIFF_TARGET_ID = 'chart_xg_diff_';
        const XA_DIFF_TARGET_ID = 'chart_xa_diff_';
        Object.keys(this.expectedDiffData).map(key => {
            let targetIdXg = XG_DIFF_TARGET_ID + key;
            let targetIdXa = XA_DIFF_TARGET_ID + key;
            Common.addChartDiv([targetIdXg, targetIdXa]);
            let xgData = [];
            let xaData = [];
            xgData.push(this.expectedDiffData[key][0]);
            xgData.push(this.expectedDiffData[key][1]);
            xaData.push(this.expectedDiffData[key][2]);
            xaData.push(this.expectedDiffData[key][3]);
            new Area(this.name + titleXg + key, 'Match').render(xgData, targetIdXg);
            new Area(this.name + titleXa + key, 'Match').render(xaData, targetIdXa);
        });
    }

    createPassingChart() {
        let title = ' Passing ';

        // pie
        const PASSING_TARGET_ID = 'chart_passing_';
        Object.keys(this.passingData).map(key => {
            let targetId = PASSING_TARGET_ID + key;
            Common.addChartDiv([targetId]);
            new Pie(this.name + title + key).render(this.passingData[key], targetId);
        });
    }

}