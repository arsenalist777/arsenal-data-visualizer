/**
 * Comparison for Fw using candlestick chart
 */
class FwComparisonCandlestick extends ComparisonTemplate {

    /**
    * check finishing loading data
    * @param {Object} player player object
    * @returns check result(boolean)
    */
    isLoadedData(player) {
        if (Object.keys(player.goalShotCreationData).length !== player.seasons.length || Object.keys(player.expectedData).length !== player.seasons.length) {

            // doesn't finish loading data
            return false;
        }
        return true;
    }

    /**
     * rendering comparison charts
     * @param {Array} players 
     */
    renderComparisonCharts(players) {
        let seasons = players[0].seasons;
        seasons.forEach(season => {

            const SCA_TARGET_ID = 'chart_sca_comparison_' + season;
            const SCA_OPEN_TARGET_ID = 'chart_sca_open_comparison_' + season;
            const GCA_TARGET_ID = 'chart_gca_comparison_' + season;
            const GCA_OPEN_TARGET_ID = 'chart_gca_open_comparison_' + season;
            const XG_TARGET_ID = 'chart_xg_comparison_' + season;
            const NPXG_TARGET_ID = 'chart_npxg_comparison_' + season;
            const XA_TARGET_ID = 'chart_xa_comparison_' + season;
            const XGXA_TARGET_ID = 'chart_xgxa_comparison_' + season;

            // add div
            Common.addChartDiv([
                SCA_TARGET_ID,
                SCA_OPEN_TARGET_ID,
                GCA_TARGET_ID,
                GCA_OPEN_TARGET_ID,
                XG_TARGET_ID,
                NPXG_TARGET_ID,
                XA_TARGET_ID,
                XGXA_TARGET_ID
            ]);

            let scaData = [];
            let scaOpenData = [];
            let gcaData = [];
            let gcaOpenData = [];
            let xgData = [];
            let npXgData = [];
            let xaData = [];
            let xgXaData = [];
            players.forEach(player => {

                // SCA
                let sca = player.goalShotCreationData[season][0];
                sca[0] = player.name;
                scaData.push(sca);

                // SCA OPEN
                let scaOpen = player.goalShotCreationData[season][1];
                scaOpen[0] = player.name;
                scaOpenData.push(scaOpen);

                // GCA
                let gca = player.goalShotCreationData[season][2];
                gca[0] = player.name;
                gcaData.push(gca);

                // GCA OPEN
                let gcaOpen = player.goalShotCreationData[season][3];
                gcaOpen[0] = player.name;
                gcaOpenData.push(gcaOpen);

                // xG
                let xg = player.expectedData[season][0];
                xg[0] = player.name;
                xgData.push(xg);

                // npxG
                let npXg = player.expectedData[season][1];
                npXg[0] = player.name;
                npXgData.push(npXg);

                // xA
                let xa = player.expectedData[season][2];
                xa[0] = player.name;
                xaData.push(xa);

                // xG+xA
                let xgXa = player.expectedData[season][3];
                xgXa[0] = player.name;
                xgXaData.push(xgXa);
            });

            new Candlestick("SCA(Shot-Creating Actions) " + season).render(scaData, SCA_TARGET_ID);
            new Candlestick("SCA-OPEN " + season).render(scaOpenData, SCA_OPEN_TARGET_ID);
            new Candlestick("GCA(Goal-Creating Actions) " + season).render(gcaData, GCA_TARGET_ID);
            new Candlestick("GCA-OPEN " + season).render(gcaOpenData, GCA_OPEN_TARGET_ID);
            new Candlestick("xG " + season).render(xgData, XG_TARGET_ID);
            new Candlestick("npxG " + season).render(npXgData, NPXG_TARGET_ID);
            new Candlestick("xA " + season).render(xaData, XA_TARGET_ID);
            new Candlestick("xG+xA " + season).render(xgXaData, XGXA_TARGET_ID);

        });

    }
}