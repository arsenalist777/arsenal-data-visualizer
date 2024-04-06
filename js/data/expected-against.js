/**
 * expected-against processes
 */
class ExpectedAgainst {

    static processData(data) {
        let expectedAgainstData = {
            'shots_xg': [],
            'spshots_spxG': [],
            'xG_G-xG': [],
            'spxG_spG-spxG': [],
        };
        Object.keys(data).map(key => {
            expectedAgainstData['shots_xg'].push({
                'shots': Number(data[key][Const.EXPECTED_GAOLS_AGAINST.OP_SHOTS_COL]) + Number(data[key][Const.EXPECTED_GAOLS_AGAINST.SP_SHOTS_COL]),
                'xg': Number(data[key][Const.EXPECTED_GAOLS_AGAINST.OP_XG_COL]) + Number(data[key][Const.EXPECTED_GAOLS_AGAINST.SP_XG_COL]),
                'img': Const.IMG_URL[data[key][Const.EXPECTED_GAOLS_AGAINST.SQUAD_COL]]
            });
            expectedAgainstData['spshots_spxG'].push({
                'spShots': Number(data[key][Const.EXPECTED_GAOLS_AGAINST.SP_SHOTS_COL]),
                'spxG': Number(data[key][Const.EXPECTED_GAOLS_AGAINST.SP_XG_COL]),
                'img': Const.IMG_URL[data[key][Const.EXPECTED_GAOLS_AGAINST.SQUAD_COL]]
            });
            expectedAgainstData['xG_G-xG'].push({
                'xG': Number(data[key][Const.EXPECTED_GAOLS_AGAINST.OP_XG_COL]) + Number(data[key][Const.EXPECTED_GAOLS_AGAINST.SP_XG_COL]),
                'G-xG': (Number(data[key][Const.EXPECTED_GAOLS_AGAINST.OP_GOALS_COL]) + Number(data[key][Const.EXPECTED_GAOLS_AGAINST.SP_GOALS_COL])) - ((Number(data[key][Const.EXPECTED_GAOLS_AGAINST.OP_XG_COL]) + Number(data[key][Const.EXPECTED_GAOLS_AGAINST.SP_XG_COL]))),
                'img': Const.IMG_URL[data[key][Const.EXPECTED_GAOLS_AGAINST.SQUAD_COL]]
            });
            expectedAgainstData['spxG_spG-spxG'].push({
                'spxG': Number(data[key][Const.EXPECTED_GAOLS_AGAINST.SP_XG_COL]),
                'spG-spxG': Number(data[key][Const.EXPECTED_GAOLS_AGAINST.SP_GOALS_COL]) - Number(data[key][Const.EXPECTED_GAOLS_AGAINST.SP_XG_COL]),
                'img': Const.IMG_URL[data[key][Const.EXPECTED_GAOLS_AGAINST.SQUAD_COL]]
            });
        });
        return expectedAgainstData;
    }
}