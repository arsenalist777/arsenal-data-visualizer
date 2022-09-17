/**
 * player Granit Xhaka class as MF
 */
class GranitXhaka extends PlayerMfTemplate {

    /**
     * name
     */
    name = 'Xhaka';

    /**
     * Constructor
     * @param {Array} seasons target seasons (format: 20XX-XX)
     * @param {Boolean} isRendering rendering chart flag
     */
    constructor(seasons, isRendering) {
        const spreadsheetId = '1uJakuX0OZFd2bLYZa3ROB_mFfPn6ML-4pAwGdEhn6EE';
        super(spreadsheetId, seasons, isRendering);
    }
}