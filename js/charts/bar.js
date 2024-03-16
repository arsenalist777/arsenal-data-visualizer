/**
 * bar chart
 */
class Bar {

    /**
     * constructor
     * @param {String} title title
     * @param {String} xaixsTitle xAxis title
     * @param {String} yaixsTitle yAxis title
     */
    constructor(title, xAixsTitle, yAixsTitle) {

        /**
         * option for vegalite
         */
        this.option = {
            vegaLite: {
                $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
                title: title,
                data: {
                    values: []
                },
                mark: 'bar',
                encoding: {
                    x: {
                        'field': xAixsTitle,
                        'type': 'quantitative'
                    },
                    y: {
                        'field': yAixsTitle,
                        'type': 'nominal',
                        'sort': "-x"
                    },
                    color: {
                        'value': Const.CSS.BAR_CHART_SCHEMA
                    },
                    stroke: ChartsUtils.getStrokeSetting(),
                    strokeWidth: ChartsUtils.getStrokeWidthSetting(),
                    tooltip: {
                        'field': xAixsTitle,
                        'type': 'quantitative'
                    }
                },
                width: 'container'
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

            // add export button event
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