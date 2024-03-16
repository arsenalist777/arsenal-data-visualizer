/**
 * PL Attacking Template
 */
class PlAttacking extends LeagueTemplate {

    shotsXGTitle = 'PL shots/xG Tier';
    shotsXGId = 'shots-xG-tier';
    xGGxGTitle = 'PL xG/G-xG Tier';
    xGGxGId = 'xG-G-xG-tier';
    spShotsSpXGTitle = 'PL SP shots/SP xG Tier';
    spShotsSpXGId = 'spshots-spxG-tier';
    spXGGxGTitle = 'PL SP xG/G-xG Tier';
    spXGGxGId = 'spxG-G-xG-tier';
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
    sequeneTimeTitle = 'PL Sequence Time';
    sequenceTimeId = 'sequence-time';
    sequenceStyleTitle = 'PL Sequence Style';
    sequenceStyleId = 'sequence-style';


    /**
     * Constructor
     * @param {Array} seasons target seasons (format: 20XX-XX)
     */
    constructor(season) {
        super();
        this.spreadsheetId = '1FO5NjJF0LnJo2d2VsCuKYRghD4QWvCOg2a0Yrya0JAo';
        this.season = season;
        this.squadShootingData = {};
        this.spExpectedData = {};
        this.squadPassingData = {};
        this.squadGoalAndShotCreationData = {};
        this.goalLogsData = {};
        this.squadPossessionData = {};
        this.teamSequenceStylesData = {};
    };

    /**
     * check finishing loading data(Override)
     * @returns check result
     */
    isLoadComplated() {
        if (Object.keys(this.squadShootingData).length === 0 && Object.keys(this.spExpectedData).length === 0 && Object.keys(this.squadPassingData).length === 0
            && Object.keys(this.squadGoalAndShotCreationData).length === 0 && Object.keys(this.goalLogsData).length === 0 && Object.keys(this.squadPossessionData).length === 0 && Object.keys(this.teamSequenceStylesData).length === 0) {

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
                chartId: this.shotsXGId
            },
            {
                title: this.spShotsSpXGTitle,
                chartId: this.spShotsSpXGId
            },
            {
                title: this.xGGxGTitle,
                chartId: this.xGGxGId
            },
            {
                title: this.spXGGxGTitle,
                chartId: this.spXGGxGId
            },
            {
                title: this.xAAxAGTitle,
                chartId: this.xAAxAGId
            },
            {
                title: this.attProgressiveTitle,
                chartId: this.attProgressiveId
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
                    chartId: this.gcaNetworkId
                },
                {
                    title: this.touchesTitle,
                    chartId: this.touchesId
                }
            ]
        ], false);
        Common.addChartDivs([
            {
                title: this.takeOnsTitle,
                chartId: this.takeOnsId
            },
            {
                title: this.carriesPrgCarriesTitle,
                chartId: this.carriesPrgCarriesId
            },
            {
                title: this.carriesCarriesIntoFinal3rdTitle,
                chartId: this.carriesCarriesIntoFinal3rdId
            },
            {
                title: this.carriesCarriesIntoPenAreaTitle,
                chartId: this.carriesCarriesIntoPenAreaId
            },
            {
                title: this.sequeneTimeTitle,
                chartId: this.sequenceTimeId
            },
            {
                title: this.sequenceStyleTitle,
                chartId: this.sequenceStyleId
            }
        ], false);
        this.createCharts();
    };

    /**
     * load spreadsheet
     * @param {String} url url
     * @param {String} dataKey member variable name
     * @param {Number} spliceIndex end index for splice
     * @param {Function} processFunc process function
     * @param {String} season season
     */
    loadSpreadSheet(url, dataKey, spliceIndex, processFunc, season) {
        let thisObject = this;
        SpreadSheetLoader.load(url, (response) => {
            if (response.values) {
                response.values.splice(0, spliceIndex);
                thisObject[dataKey] = processFunc(response.values, season);
            } else {
                thisObject[dataKey] = {
                    'isNoData': true
                };
            }
        });
    }

    /**
     * create PL Attacking data
     * @param {*} isRendering rendering chart flag
     */
    createPlAttackingData(isRendering) {

        // load spreadsheet shooting
        let url = super.createUrls(this.spreadsheetId, this.season, Const.SQUAD_SHOOTING.SHEET_NAME);
        this.loadSpreadSheet(url, 'squadShootingData', 2, SquadShooting.processData);

        // load spreadsheet expected goals for
        url = super.createUrls(this.spreadsheetId, this.season, Const.EXPECTED_GAOLS_FOR.SHEET_NAME);
        this.loadSpreadSheet(url, 'spExpectedData', 2, SpExpected.processData);

        // load spreadsheet passing
        url = super.createUrls(this.spreadsheetId, this.season, Const.SQUAD_PASSING.SHEET_NAME);
        this.loadSpreadSheet(url, 'squadPassingData', 2, SquadPassing.processData);

        // load spreadsheet goal and shot creation
        url = super.createUrls(this.spreadsheetId, this.season, Const.SQUAD_GOAL_AND_SHOT_CREATION.SHEET_NAME);
        this.loadSpreadSheet(url, 'squadGoalAndShotCreationData', 2, SquadGoalAndShotCreation.processData);

        // load spreadsheet goal log
        url = super.createUrls(this.spreadsheetId, this.season, Const.GOAL_LOGS.SHEET_NAME);
        this.loadSpreadSheet(url, 'goalLogsData', 1, GoalLogs.processData, this.season);

        // load spreadsheet possession
        url = super.createUrls(this.spreadsheetId, this.season, Const.SQUAD_POSSESSION.SHEET_NAME);
        this.loadSpreadSheet(url, 'squadPossessionData', 2, SquadPossession.processData);

        // load spreadsheet sequence styles
        url = super.createUrls(this.spreadsheetId, this.season, Const.TEAM_SEQUENCE_STYLES.SHEET_NAME);
        this.loadSpreadSheet(url, 'teamSequenceStylesData', 2, TeamSequenceStyles.processData);

        if (isRendering) {

            this.renderCharts();
        }
    };

    /**
     * create shooting chart(Override)
     */
    createShootingChart() {

        // create shooting chart
        if (this.squadShootingData['isNoData']) {
            return;
        }
        new ImageBasedScatter(this.shotsXGTitle + ' ' + this.season + Const.DATA_REF_FBREF, 'shots', 'xG',).render(this.squadShootingData['shots_xG'], this.shotsXGId);
        new ImageBasedScatter(this.xGGxGTitle + ' ' + this.season + Const.DATA_REF_FBREF, 'xG', 'G-xG').render(this.squadShootingData['xG_G-xG'], this.xGGxGId);
    };

    /**
     * create expected goals for chart(Override)
     */
    createExpectedGoalsForChart() {

        // create expected goals for chart
        if (this.spExpectedData['isNoData']) {
            return;
        }
        new ImageBasedScatter(this.spShotsSpXGTitle + ' ' + this.season + Const.DATA_REF_OPTA, 'spShots', 'spxG').render(this.spExpectedData['spshots_spxG'], this.spShotsSpXGId);
        new ImageBasedScatter(this.spXGGxGTitle + ' ' + this.season + Const.DATA_REF_OPTA, 'spxG', 'spG-spxG').render(this.spExpectedData['spxG_spG-spxG'], this.spXGGxGId);
    };

    /**
     * create passing chart(Override)
     */
    createPassingChart() {

        // create passing chart
        if (this.squadPassingData['isNoData']) {
            return;
        }
        new ImageBasedScatter(this.xAAxAGTitle + ' ' + this.season + Const.DATA_REF_FBREF, 'xA', 'A-xAG').render(this.squadPassingData['xA_A-xAG'], this.xAAxAGId);
        new ImageBasedScatter(this.attProgressiveTitle + ' ' + this.season + Const.DATA_REF_FBREF, 'att', 'progressive').render(this.squadPassingData['Att_PrgP'], this.attProgressiveId);
        new StackedBar(this.passingAttTitle + ' ' + this.season + Const.DATA_REF_FBREF, 'passing', 'squad', 'type', 'labelOrder').render(this.squadPassingData['Att'], this.passingAttId);
        new Bullet(this.passingAttCmpTitle + ' ' + this.season + Const.DATA_REF_FBREF, 'passing', 'squad', SquadPassing.createAttCmpLayer(), 'descending').render(this.squadPassingData['AttCmp'], this.passingAttCmpId);
        new Bar(this.keyPassTitle + ' ' + this.season + Const.DATA_REF_FBREF, 'key pass', 'squad').render(this.squadPassingData['KeyPass'], this.keyPassId);
        new Bar(this.passingFinal3rdTitle + ' ' + this.season + Const.DATA_REF_FBREF, 'passing into final 3rd', 'squad').render(this.squadPassingData['IntoFinal3rd'], this.passingFinal3rdId);
        new Bar(this.passingPenAreaTitle + ' ' + this.season + Const.DATA_REF_FBREF, 'passing into pen area', 'squad').render(this.squadPassingData['IntoPenArea'], this.passingPenAreaId);
        new Bar(this.crossPenAreaTitle + ' ' + this.season + Const.DATA_REF_FBREF, 'cross into pen area', 'squad').render(this.squadPassingData['CrossIntoPenArea'], this.crossPenAreaId);
    };

    /**
     * create goal and shot creation chart(Override)
     */
    createGoalAndShotCreationChart() {

        // create goal and shot creation chart
        if (this.squadGoalAndShotCreationData['isNoData']) {
            return;
        }
        new StackedBar(this.scaTypeTitle + ' ' + this.season + Const.DATA_REF_FBREF, 'sca', 'squad', 'type', 'labelOrder').render(this.squadGoalAndShotCreationData['SCA'], this.scaTypeId);
        new StackedBar(this.gcaTypeTitle + ' ' + this.season + Const.DATA_REF_FBREF, 'gca', 'squad', 'type', 'labelOrder').render(this.squadGoalAndShotCreationData['GCA'], this.gcaTypeId);

        // create gca network chart
        if (this.goalLogsData['isNoData']) {
            return;
        }
        new Heatmap(this.gcaNetworkTitle + ' ' + this.season + Const.DATA_REF_FBREF).render(this.goalLogsData, this.gcaNetworkId);
    };

    /**
     * create possession chart(Override)
     */
    createPossessionChart() {

        // create possession chart
        if (this.squadPossessionData['isNoData']) {
            return;
        }
        new StackedBar(this.touchesTitle + ' ' + this.season + Const.DATA_REF_FBREF, 'touches', 'squad', 'type', 'labelOrder').render(this.squadPossessionData['Touches'], this.touchesId);
        new ImageBasedScatter(this.takeOnsTitle + ' ' + this.season + Const.DATA_REF_FBREF, 'att', 'succ').render(this.squadPossessionData['TakeOns'], this.takeOnsId);
        new ImageBasedScatter(this.carriesPrgCarriesTitle + ' ' + this.season + Const.DATA_REF_FBREF, 'carries', 'prg carries').render(this.squadPossessionData['Carries_PrgCarries'], this.carriesPrgCarriesId);
        new ImageBasedScatter(this.carriesCarriesIntoFinal3rdTitle + ' ' + this.season + Const.DATA_REF_FBREF, 'carries', 'carries into final 3rd').render(this.squadPossessionData['Carries_CarriesIntoFinal3rd'], this.carriesCarriesIntoFinal3rdId);
        new ImageBasedScatter(this.carriesCarriesIntoPenAreaTitle + ' ' + this.season + Const.DATA_REF_FBREF, 'carries', 'carries into pen area').render(this.squadPossessionData['Carries_CarriesIntoPenArea'], this.carriesCarriesIntoPenAreaId);
    };

    /**
     * create sequence style chart(Override)
     */
    createTeamSequenceStypeChart() {

        // create sequence style chart
        if (this.teamSequenceStylesData['isNoData']) {
            return;
        }
        new ImageBasedScatter(this.sequeneTimeTitle + ' ' + this.season + Const.DATA_REF_OPTA, 'sequence time', 'direct speed').render(this.teamSequenceStylesData['teamSequenceTime'], this.sequenceTimeId);
        new ImageBasedScatter(this.sequenceStyleTitle + ' ' + this.season + Const.DATA_REF_OPTA, 'build up attacks', 'direct attacks').render(this.teamSequenceStylesData['teamSequenceStyle'], this.sequenceStyleId);
    };
}