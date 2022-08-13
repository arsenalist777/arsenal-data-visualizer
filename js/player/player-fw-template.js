/**
 * FW Template
 */
class PlayerFwTemplate extends PlayerTemplate {

    /**
     * Constructor
     * @param {Object} urls spreadsheet URLs
     * @param {Boolean} isRendering rendering chart flag
     */
    constructor(urls, isRendering) {
        super();
        this.goalShotCreationUrl = urls.goalShotCreation;
        this.expectedUrl = urls.expected;
        this.goalShotCreationData;
        this.expectedData;
        this.createFwTemplateData(isRendering);
    }

    /**
    * check finishing loading data
    */
    checkLoadData() {
        if (this.goalShotCreationData == null || this.expectedData == null) {

            // doesn't finish loading data
            return;
        }
    }

    /**
     * create FW template data
     * @param {*} isRendering rendering chart flag
     */
    createFwTemplateData(isRendering) {

        // load spreadsheet
        SpreadSheetLoader.load(this.goalShotCreationUrl, (response) => {
            response.values.splice(0, 2);
            this.goalShotCreationData = GoalShotCreation.processData(response.values);
        });
        SpreadSheetLoader.load(this.expectedUrl, (response) => {
            response.values.splice(0, 2);
            this.expectedData = Expected.processData(response.values);
        });

        if (isRendering) {
            this.createCharts();
        }
    }

    /**
     * create goal and shot creation chart(Override)
     */
    createGoalShotCreationChart() {
        const GOAL_SHOT_CREATION_TARGET_ID = 'chart_goal_shot_creation';
        new Candlestick().render(this.goalShotCreationData, GOAL_SHOT_CREATION_TARGET_ID);
    }

    /**
     * create expected chart(Override)
     */
    createExpectedChart() {
        const EXPECTED_TARGET_ID = 'chart_expected';
        new Candlestick().render(this.expectedData, EXPECTED_TARGET_ID);
    }

}