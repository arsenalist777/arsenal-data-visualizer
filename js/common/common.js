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
     * @param {Array} targetIds target id attribute list for chart
     */
    static addChartDiv(targetIds, isGraph) {
        let body = document.getElementsByTagName('body');
        targetIds.forEach(targetId => {
            let chartAreaElem = document.createElement('div');
            chartAreaElem.setAttribute('class', 'chart');
            let renderAreaElem = document.createElement('div');
            renderAreaElem.setAttribute('id', targetId);
            if (isGraph) {
                renderAreaElem.setAttribute('class', 'graph');
            }
            let downloadAreaElem = document.createElement('a');
            downloadAreaElem.setAttribute('href', '/');
            downloadAreaElem.setAttribute('download', '');
            downloadAreaElem.innerHTML = 'download';
            chartAreaElem.appendChild(renderAreaElem);
            chartAreaElem.appendChild(downloadAreaElem);
            body[0].appendChild(chartAreaElem);
        });
    }

    /**
     * check whether the string is blank
     * @param {String} str 
     * @returns result
     */
    static isBlank(str) {
        if (str == null || str === '') {
            return true;
        }
        return false;
    }
}