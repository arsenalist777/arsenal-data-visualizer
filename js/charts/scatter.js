/**
 * Scatter chart
 */
class Scatter {

    /**
     * Constructor
     * @param {String} title title
     * @param {String} vAxisTitle vAxisTitle
     */
    constructor(title, vAxisTitle) {
        this.option = {
            title: title,
            width: 1000,
            height: 800,
            hAxis: {
                baseline: 0,
                maxValue: 0,
                gridlines: {
                    color: 'transparent'
                },
                ticks: []
            },
            vAxis: {
                gridlines: {
                    color: 'transparent'
                },
                title: vAxisTitle,
            },
            dataOpacity: 0.5
        };
    }

    /**
     * reandering method
     * @param {Object} rawData data from google spreadsheet (key: Array[Array])
     * @param {String} targetId rendering target id attribute
     * @returns Scatter instace
     */
    render(rawData, targetId) {
        let chartDiv = document.getElementById(targetId);
        let chart = new google.visualization.ScatterChart(chartDiv);

        // create download link
        google.visualization.events.addListener(chart, 'ready', function () {
            document.getElementById(targetId).nextElementSibling.setAttribute("href", chart.getImageURI());
        });

        // process for google chart
        let hAxisCount = this.editOption(rawData);
        let data = this.processData(rawData, hAxisCount);

        // rendering data and download link
        chart.draw(data, this.option);
        return this;
    }

    /**
     * edit scatter options
     * @param {Object} rawData data from google spreadsheet (key: Array[Array])
     * @returns data count of hAxis
     */
    editOption(rawData) {
        let count = 0;
        for (let key in rawData) {
            rawData[key].forEach(elem => {

                // rename hAxis data
                this.option.hAxis.ticks.push({ v: count + 1, f: elem[0] });
                count++;
            });

            // set hAxis max value
            this.option.hAxis.maxValue = count + 1;
            break;
        };
        return count;
    }

    /**
     * process dataTable
     * @param {Object} rawData data from google spreadsheet (key: Array[Array])
     * @param {Number} hAxisCount data count of hAxis
     * @returns dataTable for google chart
     */
    processData(rawData, hAxisCount) {
        let data = new google.visualization.DataTable();
        data.addColumn('number', '');
        let keys = Object.keys(rawData);
        keys.sort();
        let maxDataLength = 0;
        keys.map(key => {

            // keys are represented as legend
            data.addColumn('number', key);
            let dataLength = rawData[key][0].length;
            if (dataLength > maxDataLength) {
                maxDataLength = dataLength;
            }
        });

        // create dataset
        // dataset = [pair, pair, pair, ...]
        // pair = [hAxis data, one legend data, another legend data, ...]
        let dataSet = [];
        for (let i = 0; i < hAxisCount; i++) {
            for (let j = 1; j < maxDataLength; j++) {
                let pair = [];

                // push hAxis data
                pair.push(i + 1);
                keys.map(key => {
                    if (rawData[key][i][j] != null) {

                        // set legend(key) data
                        pair.push(rawData[key][i][j]);
                    } else {

                        // if it doesn't have any data, set null
                        pair.push(null);
                    }
                });
                dataSet.push(pair);
            }
        }

        // set datatable
        data.addRows(dataSet);
        return data;
    }
}