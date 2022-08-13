/**
 * player Gabriel Jesus class as FW
 */
class GabrielJesus extends PlayerFwTemplate {

    /**
     * name
     */
    name = 'Jesus';

    /**
     * Constructor
     * @param {Boolean} isRendering rendering chart flag 
     */
    constructor(isRendering) {
        const spreadsheetId = '18nSvgd51xZnC3sqGHAadaXIgiNmaAukordf44HK9GLI';
        super({
            goalShotCreation: [spreadsheetId, Const.GOAL_SHOT_CREATION.SHEET_NAME],
            expected: [spreadsheetId, Const.EXPECTED.SHEET_NAME]
        }, isRendering);
    }
}

