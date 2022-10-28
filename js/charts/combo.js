/**
 * Combo chart
 */
class Combo {

    /**
     * Constructor
     * @param {String} title title
     * @param {String} hAxisTitle hAxisTitle
     * @param {String} vAxisTitle vAxisTitle
     */
    constructor(title, hAxisTitle, vAxisTitle) {
        this.option = {
            title: title + Const.DATA_REF,
            width: 1200,
            height: 400,
            hAxis: {
                title: hAxisTitle,
                format: '#',
                gridlines: {
                    color: 'transparent'
                }
            },
            vAxes: {
                0: {
                    title: 'rate(%)',
                    gridlines: {
                        color: 'transparent'
                    }
                },
                1: {
                    title: '',
                    maxValue: 100,
                    gridlines: {
                        color: 'transparent'
                    }
                }
            },
            seriesType: 'bars',
            isStacked: 'percent'
        };
    }

    /**
     * reandering method
     * @param {Array[Array]} rawData data from google spreadsheet
     * @param {String} targetId rendering target id attribute
     * @param {String[]} seriesIndex line series index
     * @returns Area instance
     */
    render(rawData, targetId, seriesIndex) {
        let chartDiv = document.getElementById(targetId);
        let chart = new google.visualization.ComboChart(chartDiv);

        // create download link
        ChartsUtils.createDownloadLink(chart, targetId);

        // process for google chart
        let data = google.visualization.arrayToDataTable(rawData);

        // set options
        this.option.hAxis.title = rawData[0][0];
        let series = {};
        let vAxisTitle = [];
        seriesIndex.forEach(index => {
            series[index] = {};
            series[index]['type'] = 'line';
            series[index]['targetAxisIndex'] = 1;
            vAxisTitle.push(rawData[0][Number(index) + 1]);
        });
        this.option['series'] = series;
        this.option['vAxes'][1]['title'] = vAxisTitle.join(',') + '(%)';


        // rendering data and download link
        chart.draw(data, this.option);
        return this;
    }
}