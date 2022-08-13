/**
 * Candlestick chart
 */
class Candlestick {

    /**
     * Constructor
     */
    constructor() {
        this.option = {
            legend: 'none',
            vAxis: {
                title: ''
            }
        };
    }

    /**
     * reandering method
     * @param {Array[Array]} rawData data from google spreadsheet
     * @param {String} targetId rendering target id attribute
     * @param {String} title hAxis title
     * @returns 
     */
    render(rawData, targetId, title) {
        let chartDiv = document.getElementById(targetId);
        let chart = new google.visualization.CandlestickChart(chartDiv);

        // create download link
        google.visualization.events.addListener(chart, 'ready', function () {
            document.getElementById(targetId).nextElementSibling.setAttribute("href", chart.getImageURI());
        });

        // process for google chart
        let data = this.processData(rawData);

        // rendering data and download link
        if (title != null) {
            this.option.vAxis.title = title;
        }
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
        for (let index in rawData) {

            // find 25% and 75% data index
            let matchCount = rawData[index].length - 1;
            let openingIndex = Math.floor(matchCount / 4);
            let closingIndex = Math.floor(3 * (matchCount / 4));

            // convert dataTable
            let newData = [];
            newData.push(rawData[index][0]);
            newData.push(rawData[index][1]);
            newData.push(rawData[index][openingIndex]);
            newData.push(rawData[index][closingIndex]);
            newData.push(rawData[index][matchCount]);
            dataTable.push(newData);
        }
        return google.visualization.arrayToDataTable(dataTable, true);
    }
}