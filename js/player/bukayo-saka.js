/**
 * player Bukayo Saka class as FW
 */
class BukayoSaka extends PlayerFwTemplate {

    /**
     * name
     */
    name = 'Saka';

    /**
     * Constructor
     * @param {Boolean} isRendering rendering chart flag 
     */
    constructor(isRendering) {
        const spreadsheetId = '1sirichS3H3-Fhu2oyktlNYadvs02ByI9CnaWwXzIaS4';
        super({
            goalShotCreation: [spreadsheetId, Const.GOAL_SHOT_CREATION.SHEET_NAME],
            expected: [spreadsheetId, Const.EXPECTED.SHEET_NAME]
        }, isRendering);
    }
}

