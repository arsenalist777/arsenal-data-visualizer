/**
 * squad-possession processes
 */
class SquadPossession {

    /**
     * process google spreadsheet data
     * @param {Object} data google spreadsheet data 
     * @returns squad possession data
     */
    static processData(data) {
        let possessionData = {
            'Touches': [],
            'TakeOns': [],
            'Carries_PrgCarries': [],
            'Carries_CarriesIntoFinal3rd': [],
            'Carries_CarriesIntoPenArea': [],
        };
        Object.keys(data).map(key => {

            // Touches
            possessionData['Touches'].push({
                'type': 'def_pen_area',
                'touches': Number(data[key][Const.SQUAD_POSSESSION.TOUCHES_DEF_PEN_COL]),
                'squad': data[key][Const.SQUAD_POSSESSION.SQUAD_COL],
                'labelOrder': '0'
            });
            possessionData['Touches'].push({
                'type': 'def_3rd',
                'touches': Number(data[key][Const.SQUAD_POSSESSION.TOUCHES_DEF_3RD_COL]),
                'squad': data[key][Const.SQUAD_POSSESSION.SQUAD_COL],
                'labelOrder': '1'
            });
            possessionData['Touches'].push({
                'type': 'mid_3rd',
                'touches': Number(data[key][Const.SQUAD_POSSESSION.TOUCHES_MID_3RD_COL]),
                'squad': data[key][Const.SQUAD_POSSESSION.SQUAD_COL],
                'labelOrder': '2'
            });
            possessionData['Touches'].push({
                'type': 'att_3rd',
                'touches': Number(data[key][Const.SQUAD_POSSESSION.TOUCHES_ATT_3RD_COL]),
                'squad': data[key][Const.SQUAD_POSSESSION.SQUAD_COL],
                'labelOrder': '3'
            });
            possessionData['Touches'].push({
                'type': 'att_pen_area',
                'touches': Number(data[key][Const.SQUAD_POSSESSION.TOUCHES_ATT_PEN_COL]),
                'squad': data[key][Const.SQUAD_POSSESSION.SQUAD_COL],
                'labelOrder': '4'
            });

            // TakeOns
            possessionData['TakeOns'].push({
                'att': Number(data[key][Const.SQUAD_POSSESSION.TAKE_ONS_ATT_COL]),
                'succ': Number(data[key][Const.SQUAD_POSSESSION.TAKE_ONS_SUCC_COL]),
                'img': Const.IMG_URL[data[key][Const.SQUAD_POSSESSION.SQUAD_COL]]
            });

            // Carries
            possessionData['Carries_PrgCarries'].push({
                'carries': Number(data[key][Const.SQUAD_POSSESSION.CARRIES_COL]),
                'prg carries': Number(data[key][Const.SQUAD_POSSESSION.PRG_CARRIES_COL]),
                'img': Const.IMG_URL[data[key][Const.SQUAD_POSSESSION.SQUAD_COL]]
            });
            possessionData['Carries_CarriesIntoFinal3rd'].push({
                'carries': Number(data[key][Const.SQUAD_POSSESSION.CARRIES_COL]),
                'carries into final 3rd': Number(data[key][Const.SQUAD_POSSESSION.CARRIES_INTO_FINAL_3RD_COL]),
                'img': Const.IMG_URL[data[key][Const.SQUAD_POSSESSION.SQUAD_COL]]
            });
            possessionData['Carries_CarriesIntoPenArea'].push({
                'carries': Number(data[key][Const.SQUAD_POSSESSION.CARRIES_COL]),
                'carries into pen area': Number(data[key][Const.SQUAD_POSSESSION.CARRIES_INTO_PEN_AREA_COL]),
                'img': Const.IMG_URL[data[key][Const.SQUAD_POSSESSION.SQUAD_COL]]
            });
        });
        return possessionData;
    }
}