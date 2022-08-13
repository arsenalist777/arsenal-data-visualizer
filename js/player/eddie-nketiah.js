/**
 * player Eddie Nketiah class as FW
 */
class EddieNketiah extends PlayerFwTemplate {

    /**
     * name
     */
    name = 'Nketiah';

    /**
     * Constructor
     * @param {Boolean} isRendering rendering chart flag 
     */
    constructor(isRendering) {
        const spreadsheetId = '1sl-C87Z0uxJv3u_floJbEAROBXK3lotALWsBPQoU-LA';
        super({
            goalShotCreation: [spreadsheetId, Const.GOAL_SHOT_CREATION.SHEET_NAME],
            expected: [spreadsheetId, Const.EXPECTED.SHEET_NAME]
        }, isRendering);
    }
}

