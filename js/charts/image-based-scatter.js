/**
 * Image based scatter chart
 */
class ImageBasedScatter {

    /**
     * axis padding
     */
    axisPadding = 10;

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
                layer: [
                    {
                        mark: {
                            type: 'image',
                            width: 22.5,
                            height: 22.5
                        },
                        encoding: {
                            x: {
                                'field': xAixsTitle,
                                'type': 'quantitative',
                                'scale': {
                                    'domain': []
                                }
                            },
                            y: {
                                'field': yAixsTitle,
                                'type': 'quantitative',
                                'scale': {
                                    'domain': []
                                }
                            },
                            url: {
                                'field': 'img',
                                'type': 'nominal'
                            },
                            tooltip: [
                                {
                                    'field': xAixsTitle,
                                    'type': 'quantitative'
                                },
                                {
                                    'field': yAixsTitle,
                                    'type': 'quantitative'
                                },
                            ]
                        }
                    },
                    {
                        mark: {
                            type: 'rule',
                            strokeDash: [2, 2]
                        },
                        encoding: {
                            x: {
                                'field': xAixsTitle,
                                'type': 'quantitative',
                                'aggregate': 'average',
                                'title': xAixsTitle
                            },
                        }
                    },
                    {
                        mark: {
                            type: 'rule',
                            strokeDash: [2, 2]
                        },
                        encoding: {
                            y: {
                                'field': yAixsTitle,
                                'type': 'quantitative',
                                'aggregate': 'average',
                                'title': yAixsTitle
                            },
                        }
                    }
                ],
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

        /**
         * is downloaded
         */
        this.isDownloaded = false;
    };

    /**
     * render chart
     * @param {*} rawData google chart data
     * @param {*} targetId render target id
     */
    render(rawData, targetId) {
        let chartDiv = document.getElementById(targetId);
        let chart = new google.visualization.VegaChart(chartDiv);
        this.chart = chart;
        this.googleDataTable = new google.visualization.DataTable();

        // calc min-max axis value for scale
        let minMax = Common.calcMinMax2d(rawData, this.xAixsTitle, this.yAixsTitle);
        if (minMax.key1.min >= 0) {
            this.option.vegaLite.layer[0].encoding.x.scale.domain = [minMax.key1.min - minMax.key1.min * 0.1, minMax.key1.max + minMax.key1.min * 0.1];
        } else {
            this.option.vegaLite.layer[0].encoding.x.scale.domain = [minMax.key1.min + minMax.key1.min * 0.1, minMax.key1.max - minMax.key1.min * 0.1];
        }
        if (minMax.key2.min >= 0) {
            this.option.vegaLite.layer[0].encoding.y.scale.domain = [minMax.key2.min - minMax.key2.min * 0.1, minMax.key2.max + minMax.key2.min * 0.1];
        } else {
            this.option.vegaLite.layer[0].encoding.y.scale.domain = [minMax.key2.min + minMax.key2.min * 0.1, minMax.key2.max - minMax.key2.min * 0.1];
        }
        this.option.vegaLite.data.values = rawData;

        // draw chart
        chart.draw(this.googleDataTable, this.option);
        let exportButton = document.getElementById('export-' + targetId);

        // add export button event
        let _this = this;
        google.visualization.events.addListener(chart, 'ready', function () {
            exportButton.innerHTML = 'Export';
            exportButton.classList.remove('disabled');
            exportButton.addEventListener('click', () => {
                ChartsUtils.exportSvgToPngForImageBasedChart(targetId, _this.title, _this.isDownloaded);
                _this.isDownloaded = true;
            });
        });
        return this;
    };

    /**
     * re-render chart
     */
    reRender() {
        this.chart.draw(this.googleDataTable, this.option);
    };
}