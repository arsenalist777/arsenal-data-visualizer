/**
 * Candlestick chart
 */
class Candlestick {

    /**
     * Constructor
     * @param {String} title title
     * @param {String} vAxisTitle vAxisTitle
     */
    constructor(title, vAxisTitle) {
        this.option = {
            legend: 'none',
            title: title,
            width: 800,
            height: 400,
            vAxis: {
                title: vAxisTitle
            }
        };
    }

    /**
     * reandering method
     * @param {Array[Array]} rawData data from google spreadsheet
     * @param {String} targetId rendering target id attribute
     * @returns Candlestick instance
     */
    render(rawData, targetId) {
        let chartDiv = document.getElementById(targetId);
        let chart = new google.visualization.CandlestickChart(chartDiv);

        // create download link
        ChartsUtils.createDownloadLink(chart, targetId);

        // process for google chart
        let data = this.processData(rawData);

        // rendering data and download link
        chart.draw(data, this.option);
        return this;
    }

    /**
     * process dataTable
     * @param {Array[Array]} rawData data from google spreadsheet
     * @returns dataTable for google chart
     */
    processData(rawData) {
        let dataTable = [];
        rawData.forEach(elem => {

            // find 25% and 75% data index
            let matchCount = elem.length - 1;
            let openingIndex = Math.floor(matchCount / 4);
            let closingIndex = Math.floor(3 * (matchCount / 4));

            // convert dataTable
            let newData = [];
            newData.push(elem[0]);
            newData.push(elem[1]);
            newData.push(elem[openingIndex]);
            newData.push(elem[closingIndex]);
            newData.push(elem[matchCount]);
            dataTable.push(newData);
        });
        return google.visualization.arrayToDataTable(dataTable, true);
    }
}