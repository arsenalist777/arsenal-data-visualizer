/**
 * defensive actions processes
 */
class DefensiveActions {

    /**
     * process defensive actions data
     * @param {*} data google spreadsheet data
     */
    static processData(data) {

        let result = [['Opponent', 'Def 3rd', 'Mid 3rd', 'Att 3rd', 'Success']];
        Object.keys(data).map(key => {
            result.push([
                data[key][Const.DEFENSIVE_ACTIONS.OPPONENT_COL].substring(0, 3),
                Number(data[key][Const.DEFENSIVE_ACTIONS.PRESSURES_DEF_3RD_COL]),
                Number(data[key][Const.DEFENSIVE_ACTIONS.PRESSURES_MID_3RD_COL]),
                Number(data[key][Const.DEFENSIVE_ACTIONS.PRESSURES_ATT_3RD_COL]),
                Number(data[key][Const.DEFENSIVE_ACTIONS.PRESSURES_SUC_PER_COL])
            ]);
        });
        return result;
    }
}