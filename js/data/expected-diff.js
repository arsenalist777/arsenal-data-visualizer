/**
 * expected processes
 */
class ExpectedDiff {

    /**
     * process google spreadsheet data
     * @param {Object} data  google spreadsheet data
     * @returns two demension Array data(xG, npxG, xA, xG+xA)
     */
    static processData(data) {
        const constObj = Const.EXPECTED;
        let xg = [];
        let xgSum = 0;
        let acutualGoal = [];
        let actualGoalSum = 0;
        let xa = [];
        let xaSum = 0;
        let acutualAssist = [];
        let actualAssistSum = 0;
        Object.keys(data).map(key => {
            let matchData = data[key];

            // xg
            xgSum += Number(matchData[constObj.XG_COL]);
            actualGoalSum += Number(matchData[constObj.GLS_COL]);
            xg.push(xgSum);
            acutualGoal.push(actualGoalSum);

            // xa
            xaSum += Number(matchData[constObj.XA_COL]);
            actualAssistSum += Number(matchData[constObj.AST_COL])
            xa.push(xaSum);
            acutualAssist.push(actualAssistSum);
        });
        xg.unshift('xG');
        acutualGoal.unshift('actual Goal');
        xa.unshift('xA');
        acutualAssist.unshift('actual Assist');

        return [
            xg,
            acutualGoal,
            xa,
            acutualAssist
        ];
    }
}