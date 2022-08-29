/**
 * Area chart
 */
class Area {

    /**
     * Constructor
     * @param {String} title title
     * @param {String} hAxisTitle hAxisTitle
     * @param {String} vAxisTitle vAxisTitle
     */
    constructor(title, hAxisTitle, vAxisTitle) {
        this.option = {
            title: title,
            width: 1000,
            height: 500,
            hAxis: {
                title: hAxisTitle,
                format: '#',
                gridlines: {
                    color: 'transparent'
                }
            },
            vAxis: {
                title: vAxisTitle
            }
        };
    }

    /**
     * reandering method
     * @param {Array[Array]} rawData data from google spreadsheet
     * @param {String} targetId rendering target id attribute
     * @returns Area instance
     */
    render(rawData, targetId) {
        let chartDiv = document.getElementById(targetId);
        let chart = new google.visualization.AreaChart(chartDiv);

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
        let dataLength = rawData[0].length;
        for (let i = 0; i < dataLength; i++) {
            let dataSet = [];
            if (i === 0) {
                dataSet.push(this.option.hAxis.title);
                dataSet.push(rawData[0][i]);
                dataSet.push(rawData[1][i]);
            } else {
                dataSet.push(i);
                dataSet.push(rawData[0][i]);
                dataSet.push(rawData[1][i]);
            }
            dataTable.push(dataSet);
        }
        return google.visualization.arrayToDataTable(dataTable);
    }
}