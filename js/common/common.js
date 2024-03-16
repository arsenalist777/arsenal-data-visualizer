/**
 * Common Methods
 */
class Common {

    /**
     * base64 emblem image cache
     */
    static base64PlEmblemCache = {};

    /**
     * glossary dialog 
     */
    static glossaryDialog = document.getElementById('glossary');
    static glossaryContent = document.getElementById('glossary-content');
    static glossaryDialogClose = document.getElementById('glossary-close');
    static isOneceOpenGlossary = false;

    /**
     * show glossary dialog
     * @param {*} chartId chart id
     */
    static showGlossary(chartId) {
        this.glossaryDialog.style.display = 'block';
        let contents = this.glossaryDialog.querySelectorAll('p');
        if (contents.length > 0) {
            contents.forEach(content => {
                content.remove();
            });
        }
        let glossaryContentKeys = Const.GLOSSARY[chartId];
        if (glossaryContentKeys) {
            glossaryContentKeys.forEach(key => {
                this.glossaryContent.insertAdjacentHTML('beforeend', Const.GLOSSARY_CONTENT[key]);
            });
        }

        this.isOneceOpenGlossary = true;
        if (this.isOneceOpenGlossary) {
            this.glossaryDialogClose.addEventListener('click', () => {
                this.glossaryDialog.style.display = 'none';
            });
            window.addEventListener('click', (e) => {
                if (e.target == this.glossaryDialog) {
                    this.glossaryDialog.style.display = 'none';
                }
            });
        }
    };

    /**
     * set base64 emblem image cache
     * @param {Stirng} key image url 
     * @param {String} value base64
     */
    static setBase64PlEmblemCache(key, value) {
        this.base64PlEmblemCache[key] = value;
    };

    /**
     * sort array method
     * @param {Array} array 
     * @returns sorted array
     */
    static sortArray(array) {
        array.sort(function (a, b) {
            if (a < b) {
                return -1;
            } if (a > b) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    };

    /**
     * calc min and max value
     * @param {*} data raw data
     * @param {*} key1 clac target key1
     * @param {*} key2 clac target key2
     * @returns 
     */
    static calcMinMax2d(data, key1, key2) {
        let minMax = {
            key1: {
                min: Number.MAX_SAFE_INTEGER,
                max: Number.MIN_SAFE_INTEGER
            },
            key2: {
                min: Number.MAX_SAFE_INTEGER,
                max: Number.MIN_SAFE_INTEGER
            }
        };

        data.forEach(element => {
            if (element[key1] < minMax.key1.min) {
                minMax.key1.min = element[key1];
            }
            if (element[key1] > minMax.key1.max) {
                minMax.key1.max = element[key1];
            }
            if (element[key2] < minMax.key2.min) {
                minMax.key2.min = element[key2];
            }
            if (element[key2] > minMax.key2.max) {
                minMax.key2.max = element[key2];
            }
        });
        return minMax;
    };

    /**
     * add div for rendering
     * @param {Array} targetIds target id attribute list for chart
     */
    static addChartDiv(targetIds, isGraph) {
        let body = document.getElementsByTagName('body');
        targetIds.forEach(targetId => {
            let chartAreaElem = document.createElement('div');
            chartAreaElem.setAttribute('class', 'chart');
            let renderAreaElem = document.createElement('div');
            renderAreaElem.setAttribute('id', targetId);
            if (isGraph) {
                renderAreaElem.setAttribute('class', 'graph');
            }
            let downloadAreaElem = document.createElement('a');
            downloadAreaElem.setAttribute('href', '/');
            downloadAreaElem.setAttribute('download', '');
            downloadAreaElem.innerHTML = 'download';
            chartAreaElem.appendChild(renderAreaElem);
            chartAreaElem.appendChild(downloadAreaElem);
            body[0].appendChild(chartAreaElem);
        });
    };

    /**
     * add div for rendering
     * @param {Array} keyValues key and value for format chart div 
     * @param {Boolean} isGraph is graph or not
     */
    static addChartDivs(keyValues, isGraph) {
        let main = document.getElementsByTagName('main');
        keyValues.forEach(keyValue => {
            main[0].insertAdjacentHTML('beforeend', this.formatStr(Const.CHART_DIV, keyValue));
        });
    };

    /**
     * add col2 div for rendering
     * @param {*} keyValues key and value for format chart div
     * @param {*} isGraph is graph or not
     */
    static addChartDivsCol2(keyValues, isGraph) {
        let main = document.getElementsByTagName('main');
        keyValues.forEach(keyValue => {
            let col2KeyValues = {
                col1: this.formatStr(Const.CHART_DIV, keyValue[0]),
                col2: this.formatStr(Const.CHART_DIV, keyValue[1])
            }
            main[0].insertAdjacentHTML('beforeend', this.formatStr(Const.CHART_DIV_COL2, col2KeyValues));
        });
    };

    /**
     * remove chart divs
     */
    static removeChartDivs() {
        let main = document.getElementsByTagName('main');
        main[0].innerHTML = '';
    };

    /**
     * String format
     * @param {String} template template string 
     * @param {Object} values key and values for format
     * @returns 
     */
    static formatStr(template, values) {
        return !values
            ? template
            : new Function(...Object.keys(values), `return \`${template}\`;`)(...Object.values(values).map(value => value ?? ''));
    };

    /**
     * check whether the string is blank
     * @param {String} str string
     * @returns result
     */
    static isBlank(str) {
        if (str == null || str === '') {
            return true;
        }
        return false;
    };

    /**
     * convert image to base64
     * @param {String} src image url
     * @returns Promise(base64)
     */
    static convertImageToBase64(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = (e) => reject(e);
            img.crossOrigin = 'anonymous';
            img.src = src;
        });
    };
}