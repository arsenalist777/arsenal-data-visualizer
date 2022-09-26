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
        const GCA_NETWORK_HEATMAP_TARGET_ID = 'chart_heatmap_gca_network_';
        const GCA_NETWORK_GRAPH_TARGET_ID = 'chart_graph_gca_network_';
        Object.keys(this.goalLogData).map(key => {

            // rendering each season
            let targetHeatmapId = GCA_NETWORK_HEATMAP_TARGET_ID + key;
            let targetGraphId = GCA_NETWORK_GRAPH_TARGET_ID + key;

            // create heatmap
            Common.addChartDiv([targetHeatmapId]);
            new Heatmap(this.name + title + key).render(this.goalLogData[key], targetHeatmapId);

            // create graph
            Common.addChartDiv([targetGraphId], true);
            new Graph(this.name + title + key).render(this.goalLogData[key], targetGraphId);

        });
    }


}