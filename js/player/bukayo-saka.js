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
     * @param {Array} seasons target seasons (format: 20XX-XX)
     * @param {Boolean} isRendering rendering chart flag 
     */
    constructor(seasons, isRendering) {
        const spreadsheetId = '1sirichS3H3-Fhu2oyktlNYadvs02ByI9CnaWwXzIaS4';
        super(spreadsheetId, seasons, isRendering);
    }
}

