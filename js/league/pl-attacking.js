/**
 * PL Attacking Template
 */
class PlAttacking extends LeagueTemplate {

    shotsXGTitle = 'PL shots/xG Tier';
    shotsXGId = 'shots-xG-tier';
    xGGxGTitle = 'PL xG/G-xG Tier';
    xGGxGId = 'xG-G-xG-tier';
    xAAxAGTitle = 'PL xA/A-xAG Tier';
    xAAxAGId = 'xA-A-xAG-tier';
    attProgressiveTitle = 'PL Passing Att/Progressive Tier';
    attProgressiveId = 'att-progressive-tier';
    passingAttTitle = 'PL Passing Att';
    passingAttId = 'passing-att';
    passingAttCmpTitle = 'PL Passing Att/Cmp';
    passingAttCmpId = 'passing-att-cmp';
    keyPassTitle = 'PL Key Pass';
    keyPassId = 'key-pass';
    passingFinal3rdTitle = 'PL Passing into final 3rd';
    passingFinal3rdId = 'passing-final-third';
    passingPenAreaTitle = 'PL Passing into Pen Area';
    passingPenAreaId = 'passing-pen-area';
    crossPenAreaTitle = 'PL Cross into Pen Area';
    crossPenAreaId = 'cross-pen-area';
    scaTypeTitle = 'PL SCA Types';
    scaTypeId = 'sca-type';
    gcaTypeTitle = 'PL GCA Types';
    gcaTypeId = 'gca-type';
    gcaNetworkTitle = 'GCA Network';
    gcaNetworkId = 'gca-network';
    touchesTitle = 'PL Touches';
    touchesId = 'touches';
    takeOnsTitle = 'PL Take-Ons Att/Succ Tier';
    takeOnsId = 'take-ons-tier';
    carriesPrgCarriesTitle = 'PL Carries/Prg Carries Tier';
    carriesPrgCarriesId = 'carries-prgCarries-tier';
    carriesCarriesIntoFinal3rdTitle = 'PL Carries/Carries into final 3rd Tier';
    carriesCarriesIntoFinal3rdId = 'carries-intoFinal3rd-tier';
    carriesCarriesIntoPenAreaTitle = 'PL Carries/Carries into Pen Area Tier';
    carriesCarriesIntoPenAreaId = 'carries-intoPenArea-tier';


    /**
     * Constructor
     * @param {Array} seasons target seasons (format: 20XX-XX)
     */
    constructor(season) {
        super();
        this.spreadsheetId = '1FO5NjJF0LnJo2d2VsCuKYRghD4QWvCOg2a0Yrya0JAo';
        this.season = season;
        this.squadShootingData = {};
        this.squadPassingData = {};
        this.squadGoalAndShotCreationData = {};
        this.goalLogsData = {};
        this.squadPossessionData = {};
    };

    /**
     * check finishing loading data(Override)
     * @returns check result
     */
    isLoadComplated() {
        if (Object.keys(this.squadShootingData).length === 0 && Object.keys(this.squadPassingData).length === 0
            && Object.keys(this.squadGoalAndShotCreationData).length === 0 && Object.keys(this.goalLogsData).length === 0 && Object.keys(this.squadPossessionData).length === 0) {

            // doesn't finish loading data
            return false;
        }
        return true;
    };

    /**
     * render charts divs
     */
    renderCharts() {
        // render chart areas
        Common.addChartDivs([
            {
                title: this.shotsXGTitle,
                chartId: this.shotsXGId,
            },
            {
                title: this.xGGxGTitle,
                chartId: this.xGGxGId,
            },
            {
                title: this.xAAxAGTitle,
                chartId: this.xAAxAGId,
            },
            {
                title: this.attProgressiveTitle,
                chartId: this.attProgressiveId,
            }
        ], false);

        Common.addChartDivsCol2([
            [
                {
                    title: this.passingAttTitle,
                    chartId: this.passingAttId
                },
                {
                    title: this.passingAttCmpTitle,
                    chartId: this.passingAttCmpId
                }
            ], [
                {
                    title: this.keyPassTitle,
                    chartId: this.keyPassId
                },
                {
                    title: this.passingFinal3rdTitle,
                    chartId: this.passingFinal3rdId
                }
            ], [
                {
                    title: this.passingPenAreaTitle,
                    chartId: this.passingPenAreaId
                },
                {
                    title: this.crossPenAreaTitle,
                    chartId: this.crossPenAreaId
                }
            ], [
                {
                    title: this.scaTypeTitle,
                    chartId: this.scaTypeId
                },
                {
                    title: this.gcaTypeTitle,
                    chartId: this.gcaTypeId
                }
            ], [
                {
                    title: this.gcaNetworkTitle,
                    chartId: this.gcaNetworkId,
                },
                {
                    title: this.touchesTitle,
                    chartId: this.touchesId,
                }
            ]
        ], false);
        Common.addChartDivs([
            {
                title: this.takeOnsTitle,
                chartId: this.takeOnsId,
            },
            {
                title: this.carriesPrgCarriesTitle,
                chartId: this.carriesPrgCarriesId,
            },
            {
                title: this.carriesCarriesIntoFinal3rdTitle,
                chartId: this.carriesCarriesIntoFinal3rdId,
            },
            {
                title: this.carriesCarriesIntoPenAreaTitle,
                chartId: this.carriesCarriesIntoPenAreaId,
            }
        ], false);
        this.createCharts();
    }

    /**
     * create PL Attacking data
     * @param {*} isRendering rendering chart flag
     */
    createPlAttackingData(isRendering) {

        // load spreadsheet shooting
        let url = super.createUrls(this.spreadsheetId, this.season, Const.SQUAD_SHOOTING.SHEET_NAME);
        SpreadSheetLoader.load(url, (response) => {
            response.values.splice(0, 2);
            this.squadShootingData = SquadShooting.processData(response.values);
        });

        // load spreadsheet passing
        url = super.createUrls(this.spreadsheetId, this.season, Const.SQUAD_PASSING.SHEET_NAME);
        SpreadSheetLoader.load(url, (response) => {
            response.values.splice(0, 2);
            this.squadPassingData = SquadPassing.processData(response.values);
        });

        // load spreadsheet goal and shot creation
        url = super.createUrls(this.spreadsheetId, this.season, Const.SQUAD_GOAL_AND_SHOT_CREATION.SHEET_NAME);
        SpreadSheetLoader.load(url, (response) => {
            response.values.splice(0, 2);
            this.squadGoalAndShotCreationData = SquadGoalAndShotCreation.processData(response.values);
        });

        // load spreadsheet goal log
        url = super.createUrls(this.spreadsheetId, this.season, Const.GOAL_LOGS.SHEET_NAME);
        SpreadSheetLoader.load(url, (response) => {
            response.values.splice(0, 1);
            this.goalLogsData = GoalLogs.processData(response.values, this.season);
        });

        // load spreadsheet possession
        url = super.createUrls(this.spreadsheetId, this.season, Const.SQUAD_POSSESSION.SHEET_NAME);
        SpreadSheetLoader.load(url, (response) => {
            response.values.splice(0, 2);
            this.squadPossessionData = SquadPossession.processData(response.values);
        });

        if (isRendering) {

            this.renderCharts();
        }
    };

    /**
     * create shooting chart(Override)
     */
    createShootingChart() {

        // create shooting chart
        new ImageBasedScatter(this.shotsXGTitle + ' ' + this.season, 'shots', 'xG',).render(this.squadShootingData['shots_xG'], this.shotsXGId);
        new ImageBasedScatter(this.xGGxGTitle + ' ' + this.season, 'xG', 'G-xG').render(this.squadShootingData['xG_G-xG'], this.xGGxGId);
    };

    /**
     * create passing chart(Override)
     */
    createPassingChart() {

        // create passing chart
        new ImageBasedScatter(this.xAAxAGTitle + ' ' + this.season, 'xA', 'A-xAG').render(this.squadPassingData['xA_A-xAG'], this.xAAxAGId);
        new ImageBasedScatter(this.attProgressiveTitle + ' ' + this.season, 'att', 'progressive').render(this.squadPassingData['Att_PrgP'], this.attProgressiveId);
        new StackedBar(this.passingAttTitle + ' ' + this.season, 'passing', 'squad', 'type', 'labelOrder').render(this.squadPassingData['Att'], this.passingAttId);
        new Bullet(this.passingAttCmpTitle + ' ' + this.season, 'passing', 'squad', SquadPassing.createAttCmpLayer(), 'descending').render(this.squadPassingData['AttCmp'], this.passingAttCmpId);
        new Bar(this.keyPassTitle + ' ' + this.season, 'key pass', 'squad').render(this.squadPassingData['KeyPass'], this.keyPassId);
        new Bar(this.passingFinal3rdTitle + ' ' + this.season, 'passing into final 3rd', 'squad').render(this.squadPassingData['IntoFinal3rd'], this.passingFinal3rdId);
        new Bar(this.passingPenAreaTitle + ' ' + this.season, 'passing into pen area', 'squad').render(this.squadPassingData['IntoPenArea'], this.passingPenAreaId);
        new Bar(this.crossPenAreaTitle + ' ' + this.season, 'cross into pen area', 'squad').render(this.squadPassingData['CrossIntoPenArea'], this.crossPenAreaId);
    };

    /**
     * create goal and shot creation chart(Override)
     */
    createGoalAndShotCreationChart() {

        // create goal and shot creation chart
        new StackedBar(this.scaTypeTitle + ' ' + this.season, 'sca', 'squad', 'type', 'labelOrder').render(this.squadGoalAndShotCreationData['SCA'], this.scaTypeId);
        new StackedBar(this.gcaTypeTitle + ' ' + this.season, 'gca', 'squad', 'type', 'labelOrder').render(this.squadGoalAndShotCreationData['GCA'], this.gcaTypeId);

        // create gca network chart
        new Heatmap(this.gcaNetworkTitle + ' ' + this.season).render(this.goalLogsData, this.gcaNetworkId);
    };

    /**
     * create possession chart(Override)
     */
    createPossessionChart() {

        // create possession chart
        new StackedBar(this.touchesTitle + ' ' + this.season, 'touches', 'squad', 'type', 'labelOrder').render(this.squadPossessionData['Touches'], this.touchesId);
        new ImageBasedScatter(this.takeOnsTitle + ' ' + this.season, 'att', 'succ').render(this.squadPossessionData['TakeOns'], this.takeOnsId);
        new ImageBasedScatter(this.carriesPrgCarriesTitle + ' ' + this.season, 'carries', 'prg carries').render(this.squadPossessionData['Carries_PrgCarries'], this.carriesPrgCarriesId);
        new ImageBasedScatter(this.carriesCarriesIntoFinal3rdTitle + ' ' + this.season, 'carries', 'carries into final 3rd').render(this.squadPossessionData['Carries_CarriesIntoFinal3rd'], this.carriesCarriesIntoFinal3rdId);
        new ImageBasedScatter(this.carriesCarriesIntoPenAreaTitle + ' ' + this.season, 'carries', 'carries into pen area').render(this.squadPossessionData['Carries_CarriesIntoPenArea'], this.carriesCarriesIntoPenAreaId);
    };
}