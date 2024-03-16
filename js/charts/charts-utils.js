/**
 * Utility of google Charts
 */
class ChartsUtils {

    /**
     * return stroke setting as vega-lite option
     * @returns {Object} option
     */
    static getStrokeSetting() {
        return {
            'condition': {
                'test': Const.CHART_CONDITION.ARSENAL,
                'value': Const.CSS.BAR_CHART_STROKE_SCHEMA
            }
        };
    }

    /**
     * return strokeWidth setting as vega-lite option
     * @returns {Object} option
     */
    static getStrokeWidthSetting() {
        return {
            'condition': {
                'test': Const.CHART_CONDITION.ARSENAL,
                'value': 1
            },
            'value': 0
        };
    }

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
    static exportSvgToPngForHeatmap(targetId, title) {
        let svgNode = document.getElementById(targetId).firstChild;

        // change gradient reference
        let pathNode = svgNode.querySelectorAll('g.mark-rect.role-legend-gradient')[0].firstChild;
        let gradientId = pathNode.getAttribute('fill').split('#')[1].slice(0, -1);
        pathNode.setAttribute('fill', 'url(#' + gradientId + ')');

        // change svg to png
        this.downloadSvgAsPng(svgNode, title);
    }

    /**
     * export svg as png
     * @param {*} targetId targetId
     * @param {*} title title
     */
    static exportSvgToPng(targetId, title) {

        // download svg as png
        let svgNode = document.getElementById(targetId).firstChild;
        this.downloadSvgAsPng(svgNode, title);
    }

    /**
     * export svg as png for image based chart
     * @param {String} targetId targetId
     * @param {String} title title
     * @param {Boolean} isDownloaded isDownloaded
     */
    static exportSvgToPngForImageBasedChart(targetId, title, isDownloaded) {

        // set base64 to svg-image href
        let svgNode = document.getElementById(targetId).firstChild;
        let images = Array.from(svgNode.getElementsByTagName('image'));
        let imageSrcs = images.map(image => image.getAttribute('href'));

        if (!isDownloaded) {

            if (Object.keys(Common.base64PlEmblemCache).length !== images.length) {
                // create base64 from url
                this.convertBase64Images(imageSrcs).then((base64Images) => {

                    // set base64 to svg-image href
                    this.loadBase64Images(images, base64Images).then(() => {

                        // download svg as png
                        this.downloadSvgAsPng(svgNode, title);
                    });

                });
            } else {

                // set base64 to svg-image href
                this.loadBase64ImagesFromCache(images, Common.base64PlEmblemCache).then(() => {

                    // download svg as png
                    this.downloadSvgAsPng(svgNode, title);
                });
            }
        } else {

            // download svg as png
            this.downloadSvgAsPng(svgNode, title);
        }
    }

    /**
     * download svg as png
     * @param {*} svgNode svgNode
     * @param {*} title chart title
     */
    static downloadSvgAsPng(svgNode, title) {
        const svgText = new XMLSerializer().serializeToString(svgNode);
        const svgBlob = new Blob([svgText], { type: 'image/svg+xml' });
        const svgUrl = URL.createObjectURL(svgBlob);

        const a = document.createElement('a');
        a.href = svgUrl;
        a.download = title + '.svg';

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(svgUrl);

        // TODO: fix download png
        // const svgDataUrl = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(unescape(encodeURIComponent(svgText)));
        // let img = new Image();
        // img.onload = () => {
        //     let canvas = document.createElement('canvas');
        //     canvas.width = svgNode.width.baseVal.value;
        //     canvas.height = svgNode.height.baseVal.value;
        //     let context = canvas.getContext('2d');
        //     context.drawImage(img, 0, 0);

        //     const a = document.createElement('a');
        //     a.href = canvas.toDataURL('image/png');
        //     a.download = title + '.png';
        //     document.body.appendChild(a);
        //     a.click();
        // };
        // img.src = svgDataUrl;
    }

    /**
     * convert image urls to base64
     * @param {Array} srcs image url list
     * @returns Promise(promises)
     */
    static convertBase64Images(srcs) {
        let promises = srcs.map(src => Common.convertImageToBase64(src));
        return Promise.all(promises);
    }

    /**
     * set base64 to svg-image href
     * @param {Array} images image element list
     * @param {Array} base64Images base64 image list
     * @returns 
     */
    static loadBase64Images(images, base64Images) {
        let promieses = images.map((image, index) => {
            return new Promise((resolve, reject) => {
                image.onload = () => resolve();
                image.onerror = (e) => reject(e);

                // set base64 to cache
                Common.setBase64PlEmblemCache(image.getAttribute('href'), base64Images[index]);
                image.setAttribute('href', base64Images[index]);
            });
        });
        return Promise.all(promieses);
    }

    /**
     * set base64 to svg-image href from cache
     * @param {Array} images 
     * @param {Object} base64Images 
     * @returns 
     */
    static loadBase64ImagesFromCache(images, base64Images) {
        let promieses = images.map((image, index) => {
            return new Promise((resolve, reject) => {
                image.onload = () => resolve();
                image.onerror = (e) => reject(e);
                image.setAttribute('href', base64Images[image.getAttribute('href')]);
            });
        });
        return Promise.all(promieses);
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
        let downloadLink = document.createElement('a');
        downloadLink.setAttribute('download', 'download');
        downloadLink.setAttribute('href', pngDataUrl);
        downloadLink.click();
        setTimeout(function () {
            window.URL.revokeObjectURL(pngDataUrl);
            canvas.remove();
        }, 10);
    }
}