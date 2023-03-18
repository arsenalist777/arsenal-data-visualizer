/**
 * shooting processes
 */
class Shooting {

    static processData(data) {
        let shootingData = {
            'shots_xG': [],
            'xG_G-xG': [],
        };
        Object.keys(data).map(key => {
            shootingData['shots_xG'].push({
                'shots': Number(data[key][Const.SHOOTING.SH_COL]),
                'xG': Number(data[key][Const.SHOOTING.XG_COL]),
                'img': Const.IMG_URL[data[key][Const.SHOOTING.SQUAD_COL]]
            });
            shootingData['xG_G-xG'].push({
                'xG': Number(data[key][Const.SHOOTING.XG_COL]),
                'G-xG': Number(data[key][Const.SHOOTING.G_XG_COL]),
                'img': Const.IMG_URL[data[key][Const.SHOOTING.SQUAD_COL]]
            });
        });
        return shootingData;
    }
}