/**
 * tean-sequence-styles processes
 */
class TeamSequenceStyles {

    static processData(data) {
        let teamSequenceStyleData = {
            'teamSequenceTime': [],
            'teamSequenceStyle': []
        };
        Object.keys(data).map(key => {
            teamSequenceStyleData['teamSequenceTime'].push({
                'sequence time': Number(data[key][Const.TEAM_SEQUENCE_STYLES.SEQUENCE_TIME_COL]),
                'direct speed': Number(data[key][Const.TEAM_SEQUENCE_STYLES.DILECT_SPEED_COL]),
                'img': Const.IMG_URL[data[key][Const.TEAM_SEQUENCE_STYLES.SQUAD_COL]]
            });
            teamSequenceStyleData['teamSequenceStyle'].push({
                'build up attacks': Number(data[key][Const.TEAM_SEQUENCE_STYLES.BUILD_UP_ATTACKS_COL]),
                'direct attacks': Number(data[key][Const.TEAM_SEQUENCE_STYLES.DIRECT_ATTACKS_COL]),
                'img': Const.IMG_URL[data[key][Const.TEAM_SEQUENCE_STYLES.SQUAD_COL]]
            });
        });
        return teamSequenceStyleData;
    }
}