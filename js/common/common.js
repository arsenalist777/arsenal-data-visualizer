/**
 * Common Methods
 */
class Common {

    /**
     * sort array method
     * @param {Array} array 
     * @returns sorted array
     */
    static sortArray(array) {
        array.sort(function (a, b) {
            if (a < b) {
                return -1;
            } if (a > b) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    }

    /**
     * add div for rendering
     * @param {*} targetId target id attribute for chart
     */
    static addChartDiv(targetId) {
        let chartAreaElem = document.createElement('div');
        chartAreaElem.setAttribute('class', 'chart');
        let renderAreaElem = document.createElement('div');
        renderAreaElem.setAttribute('id', targetId);
        let downloadAreaElem = document.createElement('a');
        downloadAreaElem.setAttribute('href', '/');
        downloadAreaElem.setAttribute('download', '');
        downloadAreaElem.innerHTML = 'download';
        chartAreaElem.appendChild(renderAreaElem);
        chartAreaElem.appendChild(downloadAreaElem);
        let body = document.getElementsByTagName('body');
        body[0].appendChild(chartAreaElem);
    }
}