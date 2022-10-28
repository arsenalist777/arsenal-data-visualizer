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
        this.defensiveActionsUrls = super.createUrls(this.spreadsheetId, seasons, Const.DEFENSIVE_ACTIONS.SHEET_NAME);
        this.defensiveActionsData = {};
        this.possessionUrls = super.createUrls(this.spreadsheetId, seasons, Const.POSSESSION.SHEET_NAME);
        this.possessionData = {};
        this.createArsenalData(isRendering);
    }

    /**
     * check finishing loading data
     * @returns check result
     */
    isLoadedData() {
        if (Object.keys(this.goalLogData).length !== this.seasons.length && Object.keys(this.defensiveActionsData).length !== this.seasons.length && Object.keys(this.possessionData).length !== this.seasons.length) {

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

        // load spreadsheet defensive actions
        this.defensiveActionsUrls.seasons.forEach(season => {
            let urls = this.defensiveActionsUrls[season];
            SpreadSheetLoader.load(urls, (response) => {
                response.values.splice(0, 2);
                this.defensiveActionsData[season] = DefensiveActions.processData(response.values);
            });
        });

        // load spreadsheet possession
        this.possessionUrls.seasons.forEach(season => {
            let urls = this.possessionUrls[season];
            SpreadSheetLoader.load(urls, (response) => {
                response.values.splice(0, 2);
                this.possessionData[season] = Possession.processDataForTeam(response.values);
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

    /**
     * create defensive actions chart(Override)
     */
    createDefensiveActionsChart() {
        let title = ' Pressures ';
        const PRESSURE_COMBO_TARGET_ID = 'chart_combo_pressure_';
        Object.keys(this.defensiveActionsData).map(key => {

            // render each season
            let targetComboId = PRESSURE_COMBO_TARGET_ID + key;

            // add possesion data to defensive actions data
            this.defensiveActionsData[key][0].push('Possession');
            for (let i = 1; i < this.defensiveActionsData[key].length; i++) {
                this.defensiveActionsData[key][i].push(this.possessionData[key][i][6]);
            }

            // create combo
            Common.addChartDiv([targetComboId]);
            new Combo(this.name + title + key).render(this.defensiveActionsData[key], targetComboId, ['3', '4']);
        });
    }

    /**
     * create possession chart(Override)
     */
    createPossesionChart() {
        let title = ' Possession ';
        const POSSESSION_COMBO_TARGET_ID = 'chart_combo_possession_';
        Object.keys(this.possessionData).map(key => {

            // render each season
            let targetComboId = POSSESSION_COMBO_TARGET_ID + key;

            // create combo
            Common.addChartDiv([targetComboId]);
            new Combo(this.name + title + key).render(this.possessionData[key], targetComboId, ['5']);
        });

    }


}