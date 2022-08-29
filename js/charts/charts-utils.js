/**
 * Utility of google Charts
 */
class ChartsUtils {

    /**
     * create downloadLink
     * @param {Object} chart google chart object
     * @param {String} targetId targetId
     */
    static createDownloadLink(chart, targetId) {
        google.visualization.events.addListener(chart, 'ready', function () {
            document.getElementById(targetId).nextElementSibling.setAttribute("href", chart.getImageURI());
        });
    }

}