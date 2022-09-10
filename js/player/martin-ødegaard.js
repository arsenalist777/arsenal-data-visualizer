/**
 * player Martin Ødegaard class as MF
 */
class MartinØdegaard extends PlayerMfTemplate {

    /**
     * name
     */
    name = 'Ødegaard';

    /**
     * Constructor
     * @param {Array} seasons target seasons (format: 20XX-XX)
     * @param {Boolean} isRendering rendering chart flag
     */
    constructor(seasons, isRendering) {
        const spreadsheetId = '1sQbTdHfD5OPdNalb_RDFivV_ntrO5DDPpxRihuALsxo';
        super(spreadsheetId, seasons, isRendering);
    }
}