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
     * @param {Array} seasons target seasons (format: 20XX-XX)
     * @param {Boolean} isRendering rendering chart flag 
     */
    constructor(seasons, isRendering) {
        const spreadsheetId = '1L1tQsRsks211-785WgPA3G4cuR_NXBLP4YQ0vfFGwnk';
        super(spreadsheetId, seasons, isRendering);
    }
}

