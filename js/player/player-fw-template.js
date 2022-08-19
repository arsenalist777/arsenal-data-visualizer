/**
 * FW Template
 */
class PlayerFwTemplate extends PlayerTemplate {

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
        this.goalShotCreationData = {};
        this.expectedData = {};
        this.createFwTemplateData(isRendering);
    }

    /**
    * check finishing loading data
    */
    checkLoadData() {
        if (Object.keys(this.goalShotCreationData).length !== this.seasons.length || Object.keys(this.expectedData).length !== this.seasons.length) {

            // doesn't finish loading data
            return;
        }
    }

    /**
     * create FW template data
     * @param {*} isRendering rendering chart flag
     */
    createFwTemplateData(isRendering) {

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

            // rendering each season
            let targetId = GOAL_SHOT_CREATION_TARGET_ID_CANDLESTICK + key;
            Common.addChartDiv(targetId);
            new Candlestick(this.name + title + key).render(this.goalShotCreationData[key], targetId);
        });

        // scatter
        // rendering seasons
        const GOAL_SHOT_CREATION_TARGET_ID_SCATTER = 'chart_goal_shot_creation_scatter';
        Common.addChartDiv(GOAL_SHOT_CREATION_TARGET_ID_SCATTER);
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

            // rendering each season
            let targetId = EXPECTED_TARGET_ID_CANDLESTICK + key;
            Common.addChartDiv(targetId);
            new Candlestick(this.name + title + key).render(this.expectedData[key], targetId);
        });

        // scatter
        // rendering seasons
        const EXPECTED_TARGET_ID_SCATTER = 'chart_expected_scatter';
        Common.addChartDiv(EXPECTED_TARGET_ID_SCATTER);
        new Scatter(this.name + title + this.seasons.join(', ')).render(this.expectedData, EXPECTED_TARGET_ID_SCATTER);
    }

}