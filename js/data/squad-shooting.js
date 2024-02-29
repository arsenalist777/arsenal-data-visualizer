/**
 * squad-shooting processes
 */
class SquadShooting {

    /**
     * process google spreadsheet data
     * @param {Object} data google spreadsheet data 
     * @returns squad shooting data
     */
    static processData(data) {
        let shootingData = {
            'shots_xG': [],
            'xG_G-xG': [],
        };
        Object.keys(data).map(key => {
            shootingData['shots_xG'].push({
                'shots': Number(data[key][Const.SQUAD_SHOOTING.SH_COL]),
                'xG': Number(data[key][Const.SQUAD_SHOOTING.XG_COL]),
                'img': Const.IMG_URL[data[key][Const.SQUAD_SHOOTING.SQUAD_COL]]
            });
            shootingData['xG_G-xG'].push({
                'xG': Number(data[key][Const.SQUAD_SHOOTING.XG_COL]),
                'G-xG': Number(data[key][Const.SQUAD_SHOOTING.G_XG_COL]),
                'img': Const.IMG_URL[data[key][Const.SQUAD_SHOOTING.SQUAD_COL]]
            });
        });
        return shootingData;
    };
}