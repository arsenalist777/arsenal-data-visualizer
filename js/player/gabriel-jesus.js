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
     * @param {Array} seasons target seasons (format: 20XX-XX)
     * @param {Boolean} isRendering rendering chart flag 
     */
    constructor(seasons, isRendering) {
        const spreadsheetId = '18nSvgd51xZnC3sqGHAadaXIgiNmaAukordf44HK9GLI';
        super(spreadsheetId, seasons, isRendering);
    }
}

