/**
 * goal log processes
 */
class GoalLog {

    static ASSIST_POINT = 3;
    static GCA1_POINT = 2;
    static GCA2_POINT = 1;
    static EXCULDE_GCA_TYPE = ['Fouled'];

    /**
     * process google spreadsheet data
     * @param {Object} data  google spreadsheet data
     * @returns object array data({field:{x:, y:, fill:}, data:[{reveiver(String), supplier(String), point(Number)},...]})
     */
    static processData(data) {
        let pointManager = {};
        Object.keys(data).map(key => {

            // scorer
            let scorer = data[key][Const.GOAL_LOG.SCORER_COL];
            if (!pointManager.hasOwnProperty(scorer)) {
                pointManager[scorer] = {};
            }

            // assist
            let assist = data[key][Const.GOAL_LOG.ASSIST_COL];
            if (!Common.isBlank(assist)) {
                if (!pointManager.hasOwnProperty(assist)) {
                    pointManager[assist] = {};
                }
                if (!pointManager[scorer].hasOwnProperty(assist)) {
                    pointManager[scorer][assist] = 0;
                }
                pointManager[scorer][assist] += this.ASSIST_POINT;
            }

            // gca1
            let gca1 = data[key][Const.GOAL_LOG.GCA1_COL];
            let gca1Type = data[key][Const.GOAL_LOG.GCA1_TYPE_COL];
            if (!Common.isBlank(assist) && !Common.isBlank(gca1) && assist !== gca1) {
                this.calcPointGca(pointManager, gca1Type, assist, gca1, this.GCA1_POINT);
            } else if (Common.isBlank(assist) && !Common.isBlank(gca1)) {
                this.calcPointGca(pointManager, gca1Type, scorer, gca1, this.GCA1_POINT);
            }

            // gca2
            let gca2 = data[key][Const.GOAL_LOG.GCA2_COL];
            let gca2Type = data[key][Const.GOAL_LOG.GCA2_TYPE_COL];
            if (!Common.isBlank(gca1) && !Common.isBlank(gca2) && gca1 !== gca2) {
                this.calcPointGca(pointManager, gca2Type, gca1, gca2, this.GCA2_POINT);
            }
        });

        let result = {
            field: {
                x: 'receiver',
                y: 'supplier',
                fill: 'point'
            },
            data: []
        };
        Object.keys(pointManager).map(receiver => {
            Object.keys(pointManager[receiver]).map(supplier => {
                result.data.push({
                    receiver: receiver,
                    supplier: supplier,
                    point: pointManager[receiver][supplier]
                });
            });
        });
        return result;
    }

    /**
     * calc GCA point
     * @param {Object} pointManager point manager object
     * @param {String} gcaType gca type
     * @param {String} receiverName reciever name
     * @param {String} supplierName supplier name
     * @param {Number} point gca point
     */
    static calcPointGca(pointManager, gcaType, receiverName, supplierName, point) {
        if (this.EXCULDE_GCA_TYPE.indexOf(gcaType) === -1) {
            if (!pointManager.hasOwnProperty(receiverName)) {
                pointManager[receiverName] = {};
            }
            if (!pointManager.hasOwnProperty(supplierName)) {
                pointManager[supplierName] = {};
            }
            if (pointManager[receiverName][supplierName] == null) {
                pointManager[receiverName][supplierName] = 0;
            }
            pointManager[receiverName][supplierName] += point;
        }
    }
}