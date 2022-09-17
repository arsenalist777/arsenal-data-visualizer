/**
 * possession processes
 */
class Possession {

    /**
     * process google spreadsheet data
     * @param {Object} data  google spreadsheet data
     * @returns Array data(defPen, def3rd, mid3rd, att3rd, attPen)
     */
    static processData(data) {
        const constObj = Const.POSSESSION;
        let defPen = 0;
        let def3rd = 0;
        let mid3rd = 0;
        let att3rd = 0;
        let attPen = 0;
        Object.keys(data).map(key => {
            let matchData = data[key];
            defPen += Number(matchData[constObj.DEF_PEN_COL]);
            def3rd += Number(matchData[constObj.DEF_3RD_COL]);
            mid3rd += Number(matchData[constObj.MID_3RD_COL]);
            att3rd += Number(matchData[constObj.ATT_3RD_COL]);
            attPen += Number(matchData[constObj.ATT_PEN_COL]);
        });
        let defPenData = ['Def Pen', defPen];
        let def3rdData = ['Def 3rd', def3rd];
        let mid3rdData = ['Mid 3rd', mid3rd];
        let att3rdData = ['Att 3rd', att3rd];
        let attPenData = ['Att Pen', attPen];

        return [
            [
                ['Touches', 'Degrees'],
                defPenData,
                def3rdData,
                mid3rdData,
                att3rdData,
                attPenData
            ]
        ];
    }
}