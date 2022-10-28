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
            image.onload = () => {
                let canvas = document.createElement('canvas');
                canvas.width = svgNode.width.baseVal.value;
                canvas.height = svgNode.height.baseVal.value;
                let context = canvas.getContext('2d');
                context.drawImage(image, 0, 0);

                // set dataurl of canvas
                ChartsUtils.setDataUrlOfCanvas(canvas, targetId);
            };
            image.src = svgDataUrl;
        });
    }

    /**
     * create download canvases link as png
     * @param {String} targetId 
     */
    static createDownloadCanvasLink(targetId) {

        // render multiple canvases
        let canvases = Array.from(document.getElementById(targetId).getElementsByTagName('canvas'));
        let downloadCanvas = document.createElement('canvas');
        downloadCanvas.width = canvases[0].width;
        downloadCanvas.height = canvases[0].height;
        let downloadContext = downloadCanvas.getContext('2d');

        // set background color
        downloadContext.fillStyle = "white";
        downloadContext.fillRect(0, 0, downloadCanvas.width, downloadCanvas.height);
        canvases.map(canvas => {

            // draw multiple canvases
            downloadContext.drawImage(canvas, 0, 0, canvas.width, canvas.height);
        });

        // set dataurl of canvas
        this.setDataUrlOfCanvas(downloadCanvas, targetId);
    }

    /**
     * set dataurl of canvas
     * @param {Element} canvas canvas element
     * @param {String} targetId targetId
     */
    static setDataUrlOfCanvas(canvas, targetId) {
        let pngDataUrl = canvas.toDataURL('image/png');
        document.getElementById(targetId).nextElementSibling.setAttribute("href", pngDataUrl);
        setTimeout(function () {
            window.URL.revokeObjectURL(pngDataUrl);
            canvas.remove();
        }, 10);
    }
}