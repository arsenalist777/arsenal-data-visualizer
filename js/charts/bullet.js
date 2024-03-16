/**
 * bullet chart
 */
class Bullet {

    /**
     * constructor
     * @param {String} title title
     * @param {String} xaixsTitle xAxis title
     * @param {String} yaixsTitle yAxis title
     * @param {String} layer layer
     * @param {String} order order
     */
    constructor(title, xAixsTitle, yAixsTitle, layer, order) {

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
                facet: {
                    row: {
                        'field': yAixsTitle,
                        'type': 'nominal',
                        'header': {
                            'labelAngle': 0,
                            'labelAlign': 'left',
                            'title': yAixsTitle
                        },
                        'sort': {
                            'field': 'order',
                            'order': order
                        }
                    }
                },
                spacing: 0,
                spec: {
                    encoding: {
                        x: {
                            'type': 'quantitative',
                            'scale': {
                                'nice': false
                            },
                            title: null,
                            'axis': null
                        }
                    },
                    layer: layer
                },
                resolve: {
                    'scale': {
                        'x': 'independent'
                    }
                },
                config: {
                    'tick': {
                        'tickness': 2
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
         * layer
         */
        this.layer = layer;

        /**
         * order
         */
        this.order = order;

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

        let _this = this;
        google.visualization.events.addListener(chart, 'ready', function () {

            // add export button event
            exportButton.innerHTML = 'Export';
            exportButton.classList.remove('disabled');
            exportButton.addEventListener('click', () => {
                ChartsUtils.exportSvgToPng(targetId, _this.title);
            });

            // resize width
            let svg = document.getElementById(targetId).getElementsByTagName('svg')[0];
            svg.setAttribute('width', '100%');

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