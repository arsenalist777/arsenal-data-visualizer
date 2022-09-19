/**
 * Utility of google Charts
 */
class ChartsUtils {

    /**
     * create downloadLink
     * @param {Object} chart google chart object
     * @param {String} targetId targetId
     */
    static createDownloadLink(chart, targetId) {
        google.visualization.events.addListener(chart, 'ready', function () {
            console.log(chart);
            document.getElementById(targetId).nextElementSibling.setAttribute("href", chart.getImageURI());
        });
    }

    /**
     * create download svg link as png
     * @param {Object} chart google chart object
     * @param {String} targetId targetId
     */
    static createDownloadSvgLink(chart, targetId) {
        google.visualization.events.addListener(chart, 'ready', function () {
            let svgNode = document.getElementById(targetId).firstChild;

            // change gradient reference
            let pathNode = svgNode.querySelectorAll('g.mark-rect.role-legend-gradient')[0].firstChild;
            let gradientId = pathNode.getAttribute('fill').split('#')[1].slice(0, -1);
            pathNode.setAttribute('fill', 'url(#' + gradientId + ')');

            // change svg to png
            const svgText = new XMLSerializer().serializeToString(svgNode);
            const svgDataUrl = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(unescape(encodeURIComponent(svgText)));
            let image = new Image();
            image.onload = function () {
                let canvas = document.createElement('canvas');
                canvas.width = svgNode.width.baseVal.value;
                canvas.height = svgNode.height.baseVal.value;
                let context = canvas.getContext('2d');
                context.drawImage(image, 0, 0);
                let pngDataUrl = canvas.toDataURL('image/png');
                document.getElementById(targetId).nextElementSibling.setAttribute("href", pngDataUrl);
                setTimeout(function () {
                    window.URL.revokeObjectURL(pngDataUrl);
                    canvas.remove();
                }, 10)
            };
            image.src = svgDataUrl;
        });
    }

}