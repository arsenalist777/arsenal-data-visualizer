/**
 * squad-passing processes
 */
class SquadPassing {

    /**
     * process google spreadsheet data
     * @param {Object} data google spreadsheet data 
     * @returns squad passing data
     */
    static processData(data) {
        const passTypes = ['short', 'medium', 'long'];
        let passingData = {
            'xA_A-xAG': [],
            'Att_PrgP': [],
            'Att': [],
            'AttCmp': [],
            'KeyPass': [],
            'IntoFinal3rd': [],
            'IntoPenArea': [],
            'CrossIntoPenArea': []
        };
        Object.keys(data).map(key => {

            // xA_A-xAG
            passingData['xA_A-xAG'].push({
                'xA': Number(data[key][Const.SQUAD_PASSING.XA_COL]),
                'A-xAG': Number(data[key][Const.SQUAD_PASSING.A_XAG_COL]),
                'img': Const.IMG_URL[data[key][Const.SQUAD_PASSING.SQUAD_COL]]
            });

            // Att_PrgP
            passingData['Att_PrgP'].push({
                'att': Number(data[key][Const.SQUAD_PASSING.TOTAL_ATT_COL]),
                'progressive': Number(data[key][Const.SQUAD_PASSING.PRG_P_COL]),
                'img': Const.IMG_URL[data[key][Const.SQUAD_PASSING.SQUAD_COL]]
            });

            // Att
            passingData['Att'].push({
                'type': 'short',
                'passing': Number(data[key][Const.SQUAD_PASSING.SHORT_ATT_COL]),
                'squad': data[key][Const.SQUAD_PASSING.SQUAD_COL]
            });
            passingData['Att'].push({
                'type': 'medium',
                'passing': Number(data[key][Const.SQUAD_PASSING.MEDIUM_ATT_COL]),
                'squad': data[key][Const.SQUAD_PASSING.SQUAD_COL]
            });
            passingData['Att'].push({
                'type': 'long',
                'passing': Number(data[key][Const.SQUAD_PASSING.LONG_ATT_COL]),
                'squad': data[key][Const.SQUAD_PASSING.SQUAD_COL]
            });

            // AttCmp
            passingData['AttCmp'].push({
                'type': passTypes,
                'att': [
                    Number(data[key][Const.SQUAD_PASSING.SHORT_ATT_COL]),
                    Number(data[key][Const.SQUAD_PASSING.SHORT_ATT_COL]) + Number(data[key][Const.SQUAD_PASSING.MEDIUM_ATT_COL]),
                    Number(data[key][Const.SQUAD_PASSING.SHORT_ATT_COL]) + Number(data[key][Const.SQUAD_PASSING.MEDIUM_ATT_COL]) + Number(data[key][Const.SQUAD_PASSING.LONG_ATT_COL])
                ],
                'cmp': [
                    Number(data[key][Const.SQUAD_PASSING.SHORT_CMP_COL]),
                    Number(data[key][Const.SQUAD_PASSING.SHORT_CMP_COL]) + Number(data[key][Const.SQUAD_PASSING.MEDIUM_CMP_COL]),
                    Number(data[key][Const.SQUAD_PASSING.SHORT_CMP_COL]) + Number(data[key][Const.SQUAD_PASSING.MEDIUM_CMP_COL]) + Number(data[key][Const.SQUAD_PASSING.LONG_CMP_COL])
                ],
                'squad': data[key][Const.SQUAD_PASSING.SQUAD_COL],
                'order': Number(data[key][Const.SQUAD_PASSING.SHORT_ATT_COL]) + Number(data[key][Const.SQUAD_PASSING.MEDIUM_ATT_COL]) + Number(data[key][Const.SQUAD_PASSING.LONG_ATT_COL])
            });

            // KeyPass
            passingData['KeyPass'].push({
                'key pass': Number(data[key][Const.SQUAD_PASSING.KEY_PASS_COL]),
                'squad': data[key][Const.SQUAD_PASSING.SQUAD_COL]
            });

            // Into-Final-3rd
            passingData['IntoFinal3rd'].push({
                'passing into final 3rd': Number(data[key][Const.SQUAD_PASSING.INTO_FINAL_3RD_COL]),
                'squad': data[key][Const.SQUAD_PASSING.SQUAD_COL]
            });

            // Into-Box
            passingData['IntoPenArea'].push({
                'passing into pen area': Number(data[key][Const.SQUAD_PASSING.INTO_PEN_AREA_COL]),
                'squad': data[key][Const.SQUAD_PASSING.SQUAD_COL]
            });

            // Cross-Into-Box
            passingData['CrossIntoPenArea'].push({
                'cross into pen area': Number(data[key][Const.SQUAD_PASSING.CROSS_INTO_PEN_AREA_COL]),
                'squad': data[key][Const.SQUAD_PASSING.SQUAD_COL]
            });
        });
        return passingData;
    }

    /**
     * create vegalite layer for AttCmp
     *  
     * @returns layers
     */
    static createAttCmpLayer() {
        const domain = ['short-Att', 'medium-Att', 'long-Att', 'short-Cmp', 'medium-Cmp', 'long-Cmp'];
        const att2Color = '#eee';
        const att1Color = '#ddd';
        const att0Color = '#ccc';
        const cmp2Color = '#9ecae1';
        const cmp1Color = '#6baed6';
        const cmp0Color = '#3182bd';
        const cmpBarSize = 10;

        return [
            {
                'mark': {
                    'type': 'bar',
                    'fill': att0Color
                },
                'encoding': {
                    'x': {
                        'field': 'att[2]',
                    },
                    'color': {
                        'field': 'type',
                        'scale': {
                            'domain': domain,
                            'range': [att2Color, att1Color, att0Color, cmp2Color, cmp1Color, cmp0Color]
                        },
                        'type': 'ordinal'
                    }
                }
            }, {
                'mark': {
                    'type': 'bar',
                    'fill': att1Color
                },
                'encoding': {
                    'x': {
                        'field': 'att[1]',
                    }
                }
            }, {
                'mark': {
                    'type': 'bar',
                    'fill': att2Color
                },
                'encoding': {
                    'x': {
                        'field': 'att[0]',
                    }
                }
            }, {
                'mark': {
                    'type': 'bar',
                    'fill': cmp0Color,
                    'size': cmpBarSize
                },
                'encoding': {
                    'x': {
                        'field': 'cmp[2]',
                    },
                    'stroke': ChartsUtils.getStrokeSetting(),
                    'strokeWidth': ChartsUtils.getStrokeWidthSetting()
                },

            }, {
                'mark': {
                    'type': 'bar',
                    'fill': cmp1Color,
                    'size': cmpBarSize
                },
                'encoding': {
                    'x': {
                        'field': 'cmp[1]',
                    },
                    'stroke': ChartsUtils.getStrokeSetting(),
                    'strokeWidth': ChartsUtils.getStrokeWidthSetting()
                }
            }, {
                'mark': {
                    'type': 'bar',
                    'fill': cmp2Color,
                    'size': cmpBarSize
                },
                'encoding': {
                    'x': {
                        'field': 'cmp[0]',
                    },
                    'stroke': ChartsUtils.getStrokeSetting(),
                    'strokeWidth': ChartsUtils.getStrokeWidthSetting()
                }
            }

        ];
    }
}