/**
 * Heatmap chart
 */
class Heatmap {

    /**
     * Constructor
     * @param {String} title title
     */
    constructor(title) {
        this.option = {

            // option for vega lite
            vegaLite: {
                $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
                title: title,
                data: {
                    values: []
                },
                mark: 'rect',
                encoding: {
                    x: {
                        'field': '',
                        'type': 'ordinal'
                    },
                    y: {
                        'field': '',
                        'type': 'ordinal',
                        'sort': 'descending'
                    },
                    fill: {
                        'field': '',
                        'type': 'quantitative'
                    },
                    stroke: {
                        'value': null
                    }
                },
                config: {
                    'view': { 'step': 18 },
                    'axis': { 'grid': true, 'tickBand': 'extent' }
                }
            }
        };

        /**
         * title
         */
        this.title = title;

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
     * reandering method
     * @param {Array[Array]} rawData data from google spreadsheet
     * @param {String} targetId rendering target id attribute
     * @returns Heatmap instance
     */
    render(rawData, targetId) {
        let chartDiv = document.getElementById(targetId);
        let chart = new google.visualization.VegaChart(chartDiv);
        this.chart = chart;
        this.option.vegaLite.encoding.x.field = rawData.field.x;
        this.option.vegaLite.encoding.y.field = rawData.field.y;
        this.option.vegaLite.encoding.fill.field = rawData.field.fill;
        this.option.vegaLite.data.values = rawData.data;
        this.googleDataTable = new google.visualization.DataTable();

        // draw chart
        chart.draw(this.googleDataTable, this.option);
        let exportButton = document.getElementById('export-' + targetId);

        let _this = this;
        google.visualization.events.addListener(chart, 'ready', function () {

            // modify legend
            let svgNode = document.getElementById(targetId).firstChild;
            let pathNode = svgNode.querySelectorAll('g.mark-rect.role-legend-gradient')[0].firstChild;
            let fillAttr = pathNode.getAttribute('fill');
            pathNode.setAttribute('fill', fillAttr.replace('##', '#'));

            // modify width
            svgNode.setAttribute('width', '100%');

            // add export button event
            exportButton.innerHTML = 'Export';
            exportButton.classList.remove('disabled');
            exportButton.addEventListener('click', () => {
                ChartsUtils.exportSvgToPngForHeatmap(targetId, _this.title);
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