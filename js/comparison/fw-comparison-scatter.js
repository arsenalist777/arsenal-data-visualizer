/**
 * Comparison for Fw using scatter chart
 */
class FwComparisonScatter extends ComparisonTemplate {

    /**
    * check finishing loading data
    * @param {Object} player player object
    */
    checkLoadData(player) {
        if (player.goalShotCreationData == null || player.expectedData == null) {

            // doesn't finish loading data
            return;
        }
    }

    /**
     * rendering comparison charts
     * @param {Array} players 
     */
    renderComparisonCharts(players) {
        const SCA_TARGET_ID = 'chart_sca_comparison';
        const SCA_OPEN_TARGET_ID = 'chart_sca_open_comparison';
        const GCA_TARGET_ID = 'chart_gca_comparison';
        const GCA_OPEN_TARGET_ID = 'chart_gca_open_comparison';
        const XG_TARGET_ID = 'chart_xg_comparison';
        const NPXG_TARGET_ID = 'chart_npxg_comparison';
        const XA_TARGET_ID = 'chart_xa_comparison';
        const XGXA_TARGET_ID = 'chart_xgxa_comparison';

        let scaData = [];
        let scaOpenData = [];
        let gcaData = [];
        let gcaOpenData = [];
        let xgData = [];
        let npXgData = [];
        let xaData = [];
        let xgXaData = [];
        for (let index in players) {
            let player = players[index];

            // SCA
            let sca = player.goalShotCreationData[0];
            sca[0] = player.name;
            scaData.push(sca);

            // SCA OPEN
            let scaOpen = player.goalShotCreationData[1];
            scaOpen[0] = player.name;
            scaOpenData.push(scaOpen);

            // GCA
            let gca = player.goalShotCreationData[2];
            gca[0] = player.name;
            gcaData.push(gca);

            // GCA OPEN
            let gcaOpen = player.goalShotCreationData[3];
            gcaOpen[0] = player.name;
            gcaOpenData.push(gcaOpen);

            // xG
            let xg = player.expectedData[0];
            xg[0] = player.name;
            xgData.push(xg);

            // npxG
            let npXg = player.expectedData[1];
            npXg[0] = player.name;
            npXgData.push(npXg);

            // xA
            let xa = player.expectedData[2];
            xa[0] = player.name;
            xaData.push(xa);

            // xG+xA
            let xgXa = player.expectedData[3];
            xgXa[0] = player.name;
            xgXaData.push(xgXa);
        }
        new Candlestick().render(scaData, SCA_TARGET_ID, "SCA(Shot-Creating Actions)");
        new Candlestick().render(scaOpenData, SCA_OPEN_TARGET_ID, "SCA-OPEN");
        new Candlestick().render(gcaData, GCA_TARGET_ID, "GCA(Goal-Creating Actions)");
        new Candlestick().render(gcaOpenData, GCA_OPEN_TARGET_ID, "GCA-OPEN");
        new Candlestick().render(xgData, XG_TARGET_ID, "xG");
        new Candlestick().render(npXgData, NPXG_TARGET_ID, "npxG");
        new Candlestick().render(xaData, XA_TARGET_ID, "xA");
        new Candlestick().render(xgXaData, XGXA_TARGET_ID, "xG+xA");
    }
}