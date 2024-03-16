/**
 * goal log processes
 */
class GoalLogs {

    static ASSIST_POINT = 3;
    static GCA1_POINT = 2;
    static GCA2_POINT = 1;
    static EXCULDE_GCA_TYPE = ['Fouled'];

    /**
     * process google spreadsheet data
     * @param {Object} data google spreadsheet data
     * @param {String} season season
     * @returns gca data for heatmap
     */
    static processData(data, season) {
        let playerList = GoalLogs.createPlayerList(season);
        Object.keys(data).map(key => {

            let scorer = data[key][Const.GOAL_LOGS.SCORER_COL];
            let assist = data[key][Const.GOAL_LOGS.ASSIST_COL];
            let gca1 = data[key][Const.GOAL_LOGS.GCA1_COL];
            let gca1Type = data[key][Const.GOAL_LOGS.GCA1_TYPE_COL];
            let gca2 = data[key][Const.GOAL_LOGS.GCA2_COL];
            let gca2Type = data[key][Const.GOAL_LOGS.GCA2_TYPE_COL];

            Object.keys(Const.GOAL_LOGS.DIFFERENT_NAME_TABLE).map(player => {
                if (scorer === player) {
                    scorer = Const.GOAL_LOGS.DIFFERENT_NAME_TABLE[player];
                }
                if (assist === player) {
                    assist = Const.GOAL_LOGS.DIFFERENT_NAME_TABLE[player];
                }
                if (gca1 === player) {
                    gca1 = Const.GOAL_LOGS.DIFFERENT_NAME_TABLE[player];
                }
                if (gca2 === player) {
                    gca2 = Const.GOAL_LOGS.DIFFERENT_NAME_TABLE[player];
                }
            });

            // assist
            if (!Common.isBlank(assist) && Const.PLAYER_LIST[season].includes(scorer) && Const.PLAYER_LIST[season].includes(assist)) {
                playerList[scorer][assist] = GoalLogs.calcPoint(playerList[scorer][assist], GoalLogs.ASSIST_POINT);
            }

            // gca1
            if (!Common.isBlank(assist) && !Common.isBlank(gca1) && assist !== gca1 && !GoalLogs.EXCULDE_GCA_TYPE.includes(gca1Type)
                && Const.PLAYER_LIST[season].includes(assist) && Const.PLAYER_LIST[season].includes(gca1)) {

                // when assist and gca1 are different player
                playerList[assist][gca1] = GoalLogs.calcPoint(playerList[assist][gca1], GoalLogs.GCA1_POINT);
            } else if (!Common.isBlank(gca1) && !GoalLogs.EXCULDE_GCA_TYPE.includes(gca1Type)
                && Const.PLAYER_LIST[season].includes(scorer) && Const.PLAYER_LIST[season].includes(gca1)) {

                // when scorer and gca1 are same player
                playerList[scorer][gca1] = GoalLogs.calcPoint(playerList[scorer][gca1], GoalLogs.GCA1_POINT);
            }

            // gca2
            if (!Common.isBlank(gca1) && !Common.isBlank(gca2) && gca1 !== gca2 && !GoalLogs.EXCULDE_GCA_TYPE.includes(gca2Type)
                && Const.PLAYER_LIST[season].includes(gca1) && Const.PLAYER_LIST[season].includes(gca2)) {
                playerList[gca1][gca2] = GoalLogs.calcPoint(playerList[gca1][gca2], GoalLogs.GCA2_POINT);
            }
        });

        let result = {
            field: {
                x: 'receiver',
                y: 'supplier',
                fill: 'STR'
            },
            data: []
        };
        Object.keys(playerList).map(receiver => {
            Object.keys(playerList[receiver]).map(supplier => {
                result.data.push({
                    receiver: receiver,
                    supplier: supplier,
                    STR: playerList[receiver][supplier]
                });
            });
        });
        return result;

    }

    /**
     * calc point about gca relation
     * @param {*} relation gca relation
     * @param {*} point point
     * @returns gca relation
     */
    static calcPoint(relation, point) {
        if (relation == null) {
            relation = point;
        } else {
            relation += point;
        }
        return relation;
    }

    /**
     * create player list object
     * @returns player list object
     */
    static createPlayerList(season) {
        let playerList = {};
        Const.PLAYER_LIST[season].forEach(element => {
            Const.PLAYER_LIST[season].forEach(element2 => {
                if (!playerList.hasOwnProperty(element)) {
                    playerList[element] = {};
                }
                playerList[element][element2] = null;
            });
        });
        return playerList;
    }
}