/**
 * sp-expected processes
 */
class SpExpected {

    /**
     * process google spreadsheet data
     * @param {Object} data google spreadsheet data
     * @returns sp expected data
     */
    static processData(data) {
        let spExpectedData = {
            'spshots_spxG': [],
            'spxG_spG-spxG': []
        };
        Object.keys(data).map(key => {
            spExpectedData['spshots_spxG'].push({
                'spShots': Number(data[key][Const.EXPECTED_GAOLS_FOR.SP_SHOTS_COL]),
                'spxG': Number(data[key][Const.EXPECTED_GAOLS_FOR.SP_XG_COL]),
                'img': Const.IMG_URL[data[key][Const.EXPECTED_GAOLS_FOR.SQUAD_COL]]
            });
            spExpectedData['spxG_spG-spxG'].push({
                'spxG': Number(data[key][Const.EXPECTED_GAOLS_FOR.SP_XG_COL]),
                'spG-spxG': Number(data[key][Const.EXPECTED_GAOLS_FOR.SP_GOALS_COL]) - Number(data[key][Const.EXPECTED_GAOLS_FOR.SP_XG_COL]),
                'img': Const.IMG_URL[data[key][Const.EXPECTED_GAOLS_FOR.SQUAD_COL]]
            });
        });
        return spExpectedData;
    };
}