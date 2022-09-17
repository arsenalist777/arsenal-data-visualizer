/**
 * passing processes
 */
class Passing {

    /**
     * process google spreadsheet data
     * @param {Object} data  google spreadsheet data
     * @returns Array data(Cmp, Att)
     */
    static processData(data) {
        const constObj = Const.PASSING;
        let shortCmp = 0;
        let shortAtt = 0;
        let mediumCmp = 0;
        let mediumAtt = 0;
        let longCmp = 0;
        let longAtt = 0;
        Object.keys(data).map(key => {
            let matchData = data[key];
            shortCmp += Number(matchData[constObj.SHORT_CMP_COL]);
            shortAtt += Number(matchData[constObj.SHORT_ATT_COL]);
            mediumCmp += Number(matchData[constObj.MEDIUM_CMP_COL]);
            mediumAtt += Number(matchData[constObj.MEDIUM_ATT_COL]);
            longCmp += Number(matchData[constObj.LONG_CMP_COL]);
            longAtt += Number(matchData[constObj.LONG_ATT_COL]);
        });
        let shortCmpData = ['Short Att/Cmp', shortCmp];
        let mediumCmpData = ['Medium Att/Cmp', mediumCmp];
        let longCmpData = ['Long Att/Cmp', longCmp];
        let shortAttData = ['Short Att/Cmp', shortAtt];
        let mediumAttData = ['Medium Att/Cmp', mediumAtt];
        let longAttData = ['Long Att/Cmp', longAtt];
        let missCmpData = ['Miss', (shortAtt - shortCmp) + (mediumAtt - mediumCmp) + (longAtt - longCmp)];
        let missAttData = ['Miss', 0];

        return [
            [
                ['Passing', 'Degrees'],
                shortCmpData,
                mediumCmpData,
                longCmpData,
                missCmpData
            ],
            [
                ['Passing', 'Degrees'],
                shortAttData,
                mediumAttData,
                longAttData,
                missAttData
            ]
        ];
    }
}