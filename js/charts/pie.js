/**
 * Pie chart
 */
class Pie {

    /**
     * Constructor
     * @param {String} title title
     */
    constructor(title) {
        this.option = {
            title: title,
            width: 1000,
            height: 500,
            sliceVisibilityThreshold: 0,
            pieSliceText: 'percentage'
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
        let chart = new google.visualization.PieChart(chartDiv);

        // create download link
        ChartsUtils.createDownloadLink(chart, targetId);

        // process for google chart
        let data = this.processData(rawData);

        // rendering data and download link
        let diffData = chart.computeDiff(data.complete, data.attempt);
        chart.draw(diffData, this.option);
        return this;
    }

    /**
     * process dataTable
     * @param {Array[Array]} rawData data from google spreadsheet
     * @returns dataTable for google chart
     */
    processData(rawData) {
        let complateDataTable = rawData[0];
        let attemptDataTable = rawData[1];
        return {
            complete: google.visualization.arrayToDataTable(complateDataTable),
            attempt: google.visualization.arrayToDataTable(attemptDataTable)
        };
    }
}