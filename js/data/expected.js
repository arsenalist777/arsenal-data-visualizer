/**
 * expected processes
 */
class Expected {

    /**
     * process google spreadsheet data
     * @param {Object} data  google spreadsheet data
     * @returns two demension Array data(xG, npxG, xA, xG+xA)
     */
    static processData(data) {
        const constObj = Const.EXPECTED;
        let xg = [];
        let npXg = [];
        let xa = [];
        let xgXa = [];
        for (let index in data) {
            let matchData = data[index];
            if (matchData[constObj.MIN_COL] >= Const.FILTER_MIN) {

                // appearance more than 30 minutes
                // calculation as 90 minutes result
                let conversionFulltime = matchData[constObj.MIN_COL] / Const.FULLTIME_MIN;
                xg.push(matchData[constObj.XG_COL] / conversionFulltime);
                npXg.push(matchData[constObj.NPXG_COL] / conversionFulltime);
                xa.push(matchData[constObj.XA_COL] / conversionFulltime);
                xgXa.push((Number(matchData[constObj.XG_COL]) + Number(matchData[constObj.XA_COL])) / conversionFulltime);
            }
        }
        Common.sortArray(xg).unshift('xG');
        Common.sortArray(npXg).unshift('npxG');
        Common.sortArray(xa).unshift('xA');
        Common.sortArray(xgXa).unshift('xG+xA');

        return [
            xg,
            npXg,
            xa,
            xgXa
        ];
    }
}