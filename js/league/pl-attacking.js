/**
 * PL Attacking Template
 */
class PlAttacking extends LeagueTemplate {

    shotsXGTitle = 'PL shots/xG Tier';
    xGGxGTitle = 'PL xG/G-xG Tier';
    shotsXGId = 'shots-xG-tier';
    xGGxGId = 'xG-G-xG-tier';

    /**
     * Constructor
     * @param {Array} seasons target seasons (format: 20XX-XX)
     * @param {Boolean} isRendering rendering chart flag
     */
    constructor(season, isRendering) {
        super();
        this.spreadsheetId = '1FO5NjJF0LnJo2d2VsCuKYRghD4QWvCOg2a0Yrya0JAo';
        this.season = season;
        this.shootingData = {};
        this.createPlAttackingData(isRendering);
    }

    /**
     * check finishing loading data(Override)
     * @returns check result
     */
    isLoadComplated() {
        if (Object.keys(this.shootingData).length === 0) {

            // doesn't finish loading data
            return false;
        }
        return true;
    }

    /**
     * create PL Attacking data
     * @param {*} isRendering rendering chart flag
     */
    createPlAttackingData(isRendering) {

        // load spreadsheet shooting
        let url = super.createUrls(this.spreadsheetId, this.season, Const.SHOOTING.SHEET_NAME);
        SpreadSheetLoader.load(url, (response) => {
            response.values.splice(0, 2);
            this.shootingData = Shooting.processData(response.values);
        });

        if (isRendering) {
            Common.addChartDivs([
                {
                    title: this.shotsXGTitle,
                    chartId: this.shotsXGId,
                },
                {
                    title: this.xGGxGTitle,
                    chartId: this.xGGxGId,
                }
            ], false);
            this.createCharts();
        }
    }

    /**
     * create shooting chart(Override)
     */
    createShootingChart() {
        new ImageBasedScatter(this.shotsXGTitle + ' ' + this.season, 'shots', 'xG',).render(this.shootingData['shots_xG'], this.shotsXGId);
        new ImageBasedScatter(this.xGGxGTitle + ' ' + this.season, 'xG', 'G-xG').render(this.shootingData['xG_G-xG'], this.xGGxGId);

    }
}