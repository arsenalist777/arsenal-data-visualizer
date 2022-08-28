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
     * @param {Array} seasons target seasons (format: 20XX-XX)
     * @param {Boolean} isRendering rendering chart flag 
     */
    constructor(seasons, isRendering) {
        const spreadsheetId = '1OMmozUDfV0VIdeMCxI-TxKCpyAZMk9Bvxx6QzgYfupw';
        super(spreadsheetId, seasons, isRendering);
    }

}