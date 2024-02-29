/**
 * stacked bar chart
 */
class StackedBar {

    /**
     * constructor
     * @param {String} title title
     * @param {String} xaixsTitle xAxis title
     * @param {String} yaixsTitle yAxis title
     * @param {String} color color field
     * @param {String} order order
     */
    constructor(title, xAixsTitle, yAixsTitle, color, labelOrder) {

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
                    x: {
                        'field': xAixsTitle,
                        'type': 'quantitative',
                        'aggregate': 'sum'
                    },
                    y: {
                        'field': yAixsTitle,
                        'type': 'nominal',
                        'sort': "-x"
                    },
                    color: {
                        'field': color,
                        'type': 'ordinal',

                        // label order
                        'sort': {
                            'field': labelOrder,
                        },
                        'scale': {
                            'scheme': Const.CSS.SCHEMA
                        }

                    },
                    order: {

                        // stack order
                        'field': labelOrder,
                    },
                    stroke: ChartsUtils.getStrokeSetting(),
                    strokeWidth: ChartsUtils.getStrokeWidthSetting(),
                    tooltip: {
                        'field': xAixsTitle,
                        'type': 'quantitative',
                        'aggregate': 'sum'
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
         * color field
         */
        this.color = color;

        /**
         * label order
         */
        this.labelOrder = labelOrder;

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

            // remove lengend symbol stroke
            let legendSymbols = document.getElementById(targetId).querySelectorAll('.role-legend-symbol>path');
            legendSymbols.forEach((symbol) => {
                symbol.removeAttribute('stroke');
            });

            // add export button
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