/**
 * trellis stacked bar chart
 */
class TrellisStackedBar {

    /**
     * constructor
     * @param {String} title title
     * @param {String} xaixsTitle xAxis title
     * @param {String} yaixsTitle yAxis title
     */
    constructor(title, xAixsTitle, yAixsTitle, column, color) {

        /**
         * option for vegalite
         */
        this.option = {
            vegaLite: {
                $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
                title: title + Const.DATA_REF,
                data: {
                    values: []
                },
                mark: 'bar',
                encoding: {
                    column: {
                        field: column,
                    },
                    x: {
                        'field': xAixsTitle,
                        'type': 'quantitative',
                        'aggregate': 'sum'
                    },
                    y: {
                        'field': yAixsTitle,
                        'type': 'nominal'
                    },
                    color: {
                        'field': color,
                        'type': 'nominal'
                    }
                }
            }
        };

        /**
         * title
         */
        this.title = title;

        /**
         * xAxis title
         */
        this.xAixsTitle = xAixsTitle;

        /**
         * yAxis title
         */
        this.yAixsTitle = yAixsTitle;

        /**
         * column
         */
        this.column = column;

        /**
         * color
         */
        this.color = color;

        /**
         * chart object
         */
        this.chart = null;

        /**
         * google data table
         */
        this.googleDataTable = null;
    }

    /**
     * render chart
     * @param {*} rawData google chart data
     * @param {*} targetId render target id
     */
    render(rawData, targetId) {
        this.option.vegaLite.data.values = rawData;
        let chartDiv = document.getElementById(targetId);
        let chart = new google.visualization.VegaChart(chartDiv);
        this.chart = chart;
        this.googleDataTable = new google.visualization.DataTable();

        // draw chart
        chart.draw(this.googleDataTable, this.option);
        let exportButton = document.getElementById('export-' + targetId);

        // add export button event
        let _this = this;
        google.visualization.events.addListener(chart, 'ready', function () {
            exportButton.innerHTML = 'Export';
            exportButton.classList.remove('disabled');
            exportButton.addEventListener('click', () => {
                ChartsUtils.exportSvgToPng(targetId, _this.title);
            });
        });

        return this;
    }

    /**
     * re-render chart
     */
    reRender() {
        this.chart.draw(this.googleDataTable, this.option);
    }


}