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
     * @param {Array} seasons target seasons (format: 20XX-XX)
     * @param {Boolean} isRendering rendering chart flag 
     */
    constructor(seasons, isRendering) {
        const spreadsheetId = '1sl-C87Z0uxJv3u_floJbEAROBXK3lotALWsBPQoU-LA';
        super(spreadsheetId, seasons, isRendering);
    }
}

