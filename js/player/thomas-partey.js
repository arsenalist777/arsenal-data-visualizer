/**
 * player Thomas Partey class as MF
 */
class ThomasPartey extends PlayerMfTemplate {

    /**
     * name
     */
    name = 'Partey';

    /**
     * Constructor
     * @param {Array} seasons target seasons (format: 20XX-XX)
     * @param {Boolean} isRendering rendering chart flag
     */
    constructor(seasons, isRendering) {
        const spreadsheetId = '1qx1UvtNvJ6lcVbNa8uFjUQzuNrOs92-mXcUCwr4EJ4k';
        super(spreadsheetId, seasons, isRendering);
    }
}