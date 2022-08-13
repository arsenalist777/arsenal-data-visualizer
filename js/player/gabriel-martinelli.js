/**
 * player Gabriel Martinelli class as FW
 */
class GabrielMartinelli extends PlayerFwTemplate {

    /**
     * name
     */
    name = 'Martinelli';

    /**
     * Constructor
     * @param {Boolean} isRendering rendering chart flag 
     */
    constructor(isRendering) {
        const spreadsheetId = '1L1tQsRsks211-785WgPA3G4cuR_NXBLP4YQ0vfFGwnk';
        super({
            goalShotCreation: [spreadsheetId, Const.GOAL_SHOT_CREATION.SHEET_NAME],
            expected: [spreadsheetId, Const.EXPECTED.SHEET_NAME]
        }, isRendering);
    }
}

