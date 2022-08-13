/**
 * player Emile Smith Rowe class as FW
 */
class EmileSmithRowe extends PlayerFwTemplate {

    /**
     * name
     */
    name = 'Smith Rowe';

    /**
     * Constructor
     * @param {Boolean} isRendering rendering chart flag 
     */
    constructor(isRendering) {
        const spreadsheetId = '1OMmozUDfV0VIdeMCxI-TxKCpyAZMk9Bvxx6QzgYfupw';
        super({
            goalShotCreation: [spreadsheetId, Const.GOAL_SHOT_CREATION.SHEET_NAME],
            expected: [spreadsheetId, Const.EXPECTED.SHEET_NAME]
        }, isRendering);
    }

}