/**
 * Arsenal
 */
class Arsenal extends TeamTemplate {

    /**
     * name
     */
    name = 'Arsenal';

    /**
     * Constructor
     * @param {Array} seasons target seasons (format: 20XX-XX)
     * @param {Boolean} isRendering rendering chart flag
     */
    constructor(seasons, isRendering) {
        super();
        this.name;
        this.spreadsheetId = '1bfILU44Ep-HqnSPJmwt08AeW91tZyJloCkB92OYn5LY';
        this.seasons = seasons;
        this.goalLogUrls = super.createUrls(this.spreadsheetId, seasons, Const.GOAL_LOG.SHEET_NAME);
        this.goalLogData = {};
        this.createArsenalData(isRendering);
    }

    /**
     * check finishing loading data
     * @returns check result
     */
    isLoadedData() {
        if (Object.keys(this.goalLogData).length !== this.seasons.length) {

            // doesn't finish loading data
            return false;
        }
        return true;
    }

    /**
     * create Arsenal data
     * @param {*} isRendering rendering chart flag
     */
    createArsenalData(isRendering) {

        // load spreadsheet goal log
        this.goalLogUrls.seasons.forEach(season => {
            let urls = this.goalLogUrls[season];
            SpreadSheetLoader.load(urls, (response) => {
                response.values.splice(0, 1);
                this.goalLogData[season] = GoalLog.processData(response.values);
            });
        });

        if (isRendering) {
            this.createCharts();
        }
    }

    /**
     * create goal log chart(Override)
     */
    createGoalLogChart() {
        let title = ' GCA Network ';

        // heatmap
        const GCA_NETWORK_TARGET_ID = 'chart_gca_network_';
        Object.keys(this.goalLogData).map(key => {

            // rendering each season
            let targetId = GCA_NETWORK_TARGET_ID + key;
            Common.addChartDiv([targetId]);
            new Heatmap(this.name + title + key).render(this.goalLogData[key], targetId);

        });
    }


}