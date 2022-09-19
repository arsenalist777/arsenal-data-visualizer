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
            vegaLite: {
                $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
                title: title,
                data: {
                    values: []
                },
                mark: "rect",
                encoding: {
                    x: {
                        "field": "",
                        "type": "nominal"
                    },
                    y: {
                        "field": "",
                        "type": "nominal",
                        "sort": "descending"
                    },
                    fill: {
                        "field": "",
                        "type": "quantitative"
                    },
                    stroke: {
                        "value": null
                    }
                },
                config: {
                    "view": { "step": 20 },
                    "axis": { "grid": true, "tickBand": "extent" }
                }
            }
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
        let chart = new google.visualization.VegaChart(chartDiv);
        this.option.vegaLite.encoding.x.field = rawData.field.x;
        this.option.vegaLite.encoding.y.field = rawData.field.y;
        this.option.vegaLite.encoding.fill.field = rawData.field.fill;
        this.option.vegaLite.data.values = rawData.data;

        // create download link
        ChartsUtils.createDownloadSvgLink(chart, targetId);

        // process for google chart
        chart.draw(new google.visualization.DataTable(), this.option);
        return this;
    }
}