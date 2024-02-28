/**
 * Squad Goal and Shot Creation
 */
class SquadGoalAndShotCreation {

    /**
     * process google spreadsheet data
     * @param {Object} data google spreadsheet data 
     * @returns squad goal and shot creation data
     */
    static processData(data) {
        let goalAndShotCreationData = {
            'SCA': [],
            'GCA': [],
            'SCATakeOn': []
        };
        Object.keys(data).map(key => {

            // SCA
            goalAndShotCreationData['SCA'].push({
                'type': 'pass live',
                'sca': Number(data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.SCA_PASS_LIVE_COL]),
                'squad': data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.SQUAD_COL],
                'labelOrder': '0'
            });
            goalAndShotCreationData['SCA'].push({
                'type': 'pass dead',
                'sca': Number(data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.SCA_PASS_DEAD_COL]),
                'squad': data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.SQUAD_COL],
                'labelOrder': '1'
            });
            goalAndShotCreationData['SCA'].push({
                'type': 'take-on',
                'sca': Number(data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.SCA_TAKE_ON_COL]),
                'squad': data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.SQUAD_COL],
                'labelOrder': '2'
            });
            goalAndShotCreationData['SCA'].push({
                'type': 'shot',
                'sca': Number(data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.SCA_SHOT_COL]),
                'squad': data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.SQUAD_COL],
                'labelOrder': '3'
            });
            goalAndShotCreationData['SCA'].push({
                'type': 'foul drawn',
                'sca': Number(data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.SCA_FOUL_DRAWN_COL]),
                'squad': data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.SQUAD_COL],
                'labelOrder': '4'
            });
            goalAndShotCreationData['SCA'].push({
                'type': 'defensive action',
                'sca': Number(data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.SCA_DEFENSIVE_ACTION_COL]),
                'squad': data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.SQUAD_COL],
                'labelOrder': '5'
            });

            // GCA
            goalAndShotCreationData['GCA'].push({
                'type': 'pass live',
                'gca': Number(data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.GCA_PASS_LIVE_COL]),
                'squad': data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.SQUAD_COL],
                'labelOrder': '0'
            });

            goalAndShotCreationData['GCA'].push({
                'type': 'pass dead',
                'gca': Number(data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.GCA_PASS_DEAD_COL]),
                'squad': data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.SQUAD_COL],
                'labelOrder': '1'
            });

            goalAndShotCreationData['GCA'].push({
                'type': 'take-on',
                'gca': Number(data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.GCA_TAKE_ON_COL]),
                'squad': data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.SQUAD_COL],
                'labelOrder': '2'
            });

            goalAndShotCreationData['GCA'].push({
                'type': 'shot',
                'gca': Number(data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.GCA_SHOT_COL]),
                'squad': data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.SQUAD_COL],
                'labelOrder': '3'
            });

            goalAndShotCreationData['GCA'].push({
                'type': 'foul drawn',
                'gca': Number(data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.GCA_FOUL_DRAWN_COL]),
                'squad': data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.SQUAD_COL],
                'labelOrder': '4'
            });

            goalAndShotCreationData['GCA'].push({
                'type': 'defensive action',
                'gca': Number(data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.GCA_DEFENSIVE_ACTION_COL]),
                'squad': data[key][Const.SQUAD_GOAL_AND_SHOT_CREATION.SQUAD_COL],
                'labelOrder': '5'
            });

        });
        return goalAndShotCreationData;
    }
}