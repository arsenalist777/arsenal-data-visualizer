/**
 * tean-sequence-pressures processes
 */
class TeamSequencePressures {

    static processData(data) {
        let teamSequencePressuresData = {
            'shotEndingHighTurnOvers': [],
            'goalEndingHighTurnOvers': [],
            'ppda': [],
        };
        Object.keys(data).map(key => {
            teamSequencePressuresData['shotEndingHighTurnOvers'].push({
                'high turnovers': Number(data[key][Const.TEAM_SEQUENCE_PRESSURES.HIGH_TURNOVER_TOTAL_COL]),
                'shot ending high turnovers': Number(data[key][Const.TEAM_SEQUENCE_PRESSURES.SHOT_ENDING_COL]),
                'img': Const.IMG_URL[data[key][Const.TEAM_SEQUENCE_PRESSURES.SQUAD_COL]]
            });
            teamSequencePressuresData['goalEndingHighTurnOvers'].push({
                'high turnovers': Number(data[key][Const.TEAM_SEQUENCE_PRESSURES.HIGH_TURNOVER_TOTAL_COL]),
                'goal ending high turnovers': Number(data[key][Const.TEAM_SEQUENCE_PRESSURES.GOAL_ENDING_COL]),
                'img': Const.IMG_URL[data[key][Const.TEAM_SEQUENCE_PRESSURES.SQUAD_COL]]
            });
            teamSequencePressuresData['ppda'].push({
                'ppda': Number(data[key][Const.TEAM_SEQUENCE_PRESSURES.PPDA_COL]),
                'squad': data[key][Const.TEAM_SEQUENCE_PRESSURES.SQUAD_COL]
            });
        });
        return teamSequencePressuresData;
    }
}