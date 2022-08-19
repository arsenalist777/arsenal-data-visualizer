/**
 * goal and shot creation processes
 */
class GoalShotCreation {

    /**
     * process google spreadsheet data
     * @param {Object} data  google spreadsheet data
     * @returns two demension Array data(SCA, SCA_OPEN, GCA, GCA_OPEN)
     */
    static processData(data) {
        const constObj = Const.GOAL_SHOT_CREATION;
        let sca = [];
        let scaOpen = [];
        let gca = [];
        let gcaOpen = [];
        Object.keys(data).map(key => {
            let matchData = data[key];
            if (matchData[constObj.MIN_COL] >= Const.FILTER_MIN) {

                // appearance more than 30 minutes
                // calculation as 90 minutes result
                let conversionFulltime = matchData[constObj.MIN_COL] / Const.FULLTIME_MIN;
                sca.push(matchData[constObj.SCA_COL] / conversionFulltime);
                scaOpen.push((Number(matchData[constObj.SCA_COL]) - Number(matchData[constObj.SCA_DEAD_COL])) / conversionFulltime);
                gca.push(matchData[constObj.GCA_COL] / conversionFulltime);
                gcaOpen.push((Number(matchData[constObj.GCA_COL]) - Number(matchData[constObj.GCA_DEAD_COL])) / conversionFulltime);
            }
        });
        Common.sortArray(sca).unshift('SCA');
        Common.sortArray(scaOpen).unshift('SCA_OPEN');
        Common.sortArray(gca).unshift('GCA');
        Common.sortArray(gcaOpen).unshift('GCA_OPEN');

        return [
            sca,
            scaOpen,
            gca,
            gcaOpen
        ];
    }
}