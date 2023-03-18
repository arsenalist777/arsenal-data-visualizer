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
                title: title + Const.DATA_REF,
                data: {
                    values: []
                },
                mark: {
                    type: 'image',
                    width: 30,
                    height: 30
                },
                encoding: {
                    x: {
                        "field": xAixsTitle,
                        "type": "quantitative",
                        "scale": {
                            "domain": [200, 500]
                        }
                    },
                    y: {
                        "field": yAixsTitle,
                        "type": "quantitative",
                        "scale": {
                            "domain": [10, 60]
                        }
                    },
                    url: {
                        "field": "img",
                        "type": "nominal"
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

        /**
         * is downloaded
         */
        this.isDownloaded = false;
    }

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
        this.option.vegaLite.encoding.x.scale.domain = [minMax.key1.min - this.axisPadding, minMax.key1.max + this.axisPadding];
        this.option.vegaLite.encoding.y.scale.domain = [minMax.key2.min - this.axisPadding, minMax.key2.max + this.axisPadding];
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
    }

    /**
     * re-render chart
     */
    reRender() {
        this.chart.draw(this.googleDataTable, this.option);
    }
}