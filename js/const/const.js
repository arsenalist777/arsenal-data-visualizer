(function () {

    /**
     * Const data
     */
    Const = {

        /**
         * Div for chart
         */
        CHART_DIV: '<div class= "col d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom border-right">'
            + '<h2 class="h2">${title}</h2>'
            + '<div class="btn-toolbar mb-2 mb-md-0">'
            + '<div class="btn-group me-2">'
            + '<div class="icon-help" onclick="Common.showGlossary(\'${chartId}\')"></div>'
            + '<button id="export-${chartId}" type="button" class="btn btn-sm btn-outline-secondary disabled">'
            + '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
            + 'Loading...'
            + '</button>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '<div id="${chartId}" class= "text-center">'
            + '<div class="spinner-border" role="status">'
            + '</div>'
            + '</div>',

        /**
         * Div for chart col2
         */
        CHART_DIV_COL2: '<div class="container">'
            + '<div class="row">'
            + '<div class="col-md-6">'
            + '${col1}'
            + '</div>'
            + '<div class="col-md-6">'
            + '${col2}'
            + '</div>'
            + '</div>'
            + '</div>',

        /**
         * glossary
         */
        GLOSSARY_CONTENT: {
            xG: '<p><b>xG(Expected Goals)</b><br>Expected Goals (xG) measures the quality of a shot based on several variables such as assist type, shot angle and distance from goal, whether it was a headed shot and whether it was defined as a big chance. Adding up a player or team\'s expected goals can give us an indication of how many goals a player or team should have scored on average, given the shots they have taken.</p>',
            SP: '<p><b>SP(Set Play)</b><br>Chances occuring as a result of a corner, direct free kick, indirect free kick or throw-in. There is no data about 2022-23 season.</p>',
            xA: '<p><b>xA(Expected Assists)</b><br>The likelihood each completed pass becomes a goal assists given the pass type, phase of play, location and distance. Provided by Opta. Minimum 30 minutes played per squad game to qualify as a leader.</p>',
            xAG: '<p><b>xAG(Expected Assisted Goals)</b><br>xG which follows a pass that assists a shot.',
            progressive: '<p><b>Progressive Passes</b><br>Completed passes that move the ball towards the opponent\'s goal line at least 10 yards from its furthest point in the last six passes, or any completed pass into the penalty area. Excludes passes from the defending 40% of the pitch.</p>',
            short: '<p><b>Short Passes</b><br>Passes between 5 and 15 yards.</p>',
            medium: '<p><b>Medium Passes</b><br>Passes between 15 and 30 yards.</p>',
            long: '<p><b>Long Passes</b><br>Passes longer than 30 yards.</p>',
            cmp: '<p><b>Cmp(Pass Completion)</b><br>Pass Completion.</p>',
            keyPass: '<p><b>Key Passes</b><br>Passes that directly lead to a shot (assisted shots).</p>',
            final3rd: '<p><b>Passes into Final Third</b><br>Completed passes that enter the 1/3 of the pitch closest to the goal. Not including set pieces.</p>',
            passPenArea: '<p><b>Passes into the Penalty Area</b><br>Completed passes into the 18-yard box. Not including set pieces.</p>',
            crossPenArea: '<p><b>Crosses into the Penalty Area</b><br>Completed crosses into the 18-yard box. Not including set pieces.</p>',
            sca: '<p><b>SCA(Shot Creating Actions)</b><br>The two offensive actions directly leading to a shot, such as passes, take-ons and drawing fouls. Note: A single player can receive credit for multiple actions and the shot-taker can also receive credit.</p>',
            gca: '<p><b>GCA(Goal Creating Actions)</b><br>The two offensive actions directly leading to a goal, such as passes, take-ons and drawing fouls. Note: A single player can receive credit for multiple actions and the goal-scorer can also receive credit.</p>',
            gca1: '<p><b>GCA1</b><br>The first offensive action leading directly to a shot, such as passes, take-ons, and drawing fouls. Note: A single player can receive credit for multiple actions and the shot-taker can also receive credit.</p>',
            gca2: '<p><b>GCA2</b><br>The second offensive action leading directly to a shot, such as passes, take-ons, and drawing fouls. Note: A single player can receive credit for multiple actions and the shot-taker can also receive credit.</p>',
            str: '<p><b>STR(Strength)</b><br>This indicates the strength of GCA between players. Weighted addition is performed in the order of assists, GCA1, and GCA2. If assists and GCA1 are from the same player, assists take priority.</p>',
            touches: '<p><b>Touches</b><br>Number of times a player touched the ball. Note: Receiving a pass, then dribbling, then sending a pass counts as one touch.</p>',
            takeOns: '<p><b>Successful Take-Ons</b><br>Number of defenders taken on successfully, by dribbling past them. Unsuccessful take-ons include attempts where the dribbler retained possession but was unable to get past the defender</p>',
            carries: '<p><b>Carries</b><br>Number of times the player controlled the ball with their feet.</p>',
            prgCarries: '<p><b>Progressive Carries</b><br>Carries that move the ball towards the opponent\'s goal line at least 10 yards from its furthest point in the last six passes, or any carry into the penalty area.Excludes carries which end in the defending 50% of the pitch.</p>',
            carriesFinal3rd: '<p><b>Carries into Final Third</b><br>Carries that enter the 1/3 of the pitch closest to the goal.</p>',
            carriesPenArea: '<p><b>Carries into the Penalty Area</b><br>Carries into the 18-yard box.</p>',
            sequence: '<p><b>Sequence</b><br>Sequences are defined as passages of play which belong to one team and are ended by defensive actions, stoppages in play or a shot. There is no data about 2022-23 season.</p>',
            sequenceTime: '<p><b>Sequence Time</b><br>The average time (in seconds) per sequence.</p>',
            dilectSpeed: '<p><b>Dilect Speed</b><br>A measure of how quickly a team progresses the ball upfield (metres/second).</p>',
            buildUpAttacks: '<p><b>Build-Up Attacks</b><br>The number of open play sequences that contains 10 or more passes and either ends in a shot or has at least one touch in the box.</p>',
            directAttacks: '<p><b>Direct Attacks</b><br>The number of open play sequences that starts just inside the team\'s own half and has at least 50% of movement towards the opposition\'s goal and ends in a shot or a touch in the opposition box.</p> ',
            xGAgainst: '<p><b>xG(Expected Goals)</b><br>Expected Goals (xG) measures the quality of a shot based on several variables such as assist type, shot angle and distance from goal, whether it was a headed shot and whether it was defined as a big chance. Adding up a player or team\'s expected goals can give us an indication of how many goals a player or team should have scored on average, given the shots they have taken. There is no data about 2022-23 season.</p>',
            highTurnOvers: '<p><b>High Turnovers</b><br>The number of sequences that start in open play and begin 40m or less from the opponent\'s goal. There is no data about 2022-23 season.</p>',
            shotEndingHighTruenOvers: '<p><b>Shot Ending High Turnovers</b><br>The number of shot-ending sequences that start in open play and begin 40m or less from the opponent\'s goal. There is no data about 2022-23 season.</p>',
            goalEndingHighTurnOvers: '<p><b>Goal Ending High Turnovers</b><br>The number of goal-ending sequences that start in open play and begin 40m or less from the opponent\'s goal. There is no data about 2022-23 season.</p>',
            ppda: '<p><b>PPDA</b><br>PPDA is the number of opposition passes allowed outside of the pressing team\'s own defensive third, divided by the number of defensive actions by the pressing team outside of their own defensive third. A lower figure indicates a higher level of pressing, while a higher figure indicates a lower level of pressing. There is no data about 2022-23 season.</p>',
        },

        /**
         * glossary keys for each chart
         */
        GLOSSARY: {

            // attacking
            'shots-xG-tier': ['xG'],
            'xG-G-xG-tier': ['xG'],
            'spshots-spxG-tier': ['xG', 'SP'],
            'spxG-G-xG-tier': ['xG', 'SP'],
            'xA-A-xAG-tier': ['xA', 'xAG'],
            'att-progressive-tier': ['progressive'],
            'passing-att': ['short', 'medium', 'long'],
            'passing-att-cmp': ['short', 'medium', 'long', 'cmp'],
            'key-pass': ['keyPass'],
            'passing-final-third': ['final3rd'],
            'passing-pen-area': ['passPenArea'],
            'cross-pen-area': ['crossPenArea'],
            'sca-type': ['sca'],
            'gca-type': ['gca'],
            'gca-network': ['gca', 'gca1', 'gca2', 'str'],
            'touches': ['touches'],
            'take-ons-tier': ['takeOns'],
            'carries-prgCarries-tier': ['carries', 'prgCarries'],
            'carries-intoFinal3rd-tier': ['carries', 'carriesFinal3rd'],
            'carries-intoPenArea-tier': ['carries', 'carriesPenArea'],
            'sequence-time': ['sequence', 'sequenceTime', 'dilectSpeed'],
            'sequence-style': ['sequence', 'buildUpAttacks', 'directAttacks'],

            // defending
            'shots-xG-against-tier': ['xGAgainst'],
            'spshots-xG-against-tier': ['xGAgainst', 'SP'],
            'xG-G-xG-against-tier': ['xGAgainst'],
            'spxG-G-xG-against-tier': ['xGAgainst', 'SP'],
            'shot-ending-high-turnovers-tier': ['highTurnOvers', 'shotEndingHighTruenOvers'],
            'goal-ending-high-turnovers-tier': ['highTurnOvers', 'goalEndingHighTurnOvers'],
            'ppda': ['ppda']
        },

        /**
         * image urls
         */
        IMG_URL: {
            Arsenal: './img/arsenal.png',
            'Aston Villa': './img/aston-villa.png',
            Bournemouth: './img/bournemouth.png',
            Brentford: './img/brentford.png',
            Brighton: './img/brighton.png',
            'Brighton and Hove Albion': './img/brighton.png',
            Burnley: './img/burnley.png',
            Chelsea: './img/chelsea.png',
            'Crystal Palace': './img/crystal-palace.png',
            Everton: './img/everton.png',
            Fulham: './img/fulham.png',
            'Leeds United': './img/leeds.png',
            'Leicester City': './img/leicester.png',
            Liverpool: './img/liverpool.png',
            'Luton Town': './img/luton-town.png',
            'Manchester City': './img/manchester-city.png',
            'Manchester Utd': './img/manchester-united.png',
            'Manchester United': './img/manchester-united.png',
            'Newcastle Utd': './img/newcastle.png',
            'Newcastle United': './img/newcastle.png',
            'Nott\'ham Forest': './img/nottingham-forest.png',
            'Nottingham Forest': './img/nottingham-forest.png',
            'Sheffield Utd': './img/sheffield-united.png',
            'Sheffield United': './img/sheffield-united.png',
            Southampton: './img/southampton.png',
            'Tottenham Hotspur': './img/tottenham.png',
            Tottenham: './img/tottenham.png',
            'West Ham': './img/west-ham.png',
            'West Ham United': './img/west-ham.png',
            Wolves: './img/wolves.png',
            'Wolverhampton Wanderers': './img/wolves.png'
        },

        /**
         * Condition for chart option
         */
        CHART_CONDITION: {
            ARSENAL: 'datum["squad"] === "Arsenal"',
        },

        /**
         * for expected goals for
         */
        EXPECTED_GAOLS_FOR: {
            SQUAD_COL: 1,
            SP_SHOTS_COL: 6,
            SP_XG_COL: 7,
            SP_GOALS_COL: 8,
            SHEET_NAME: 'Expected Goals For'
        },

        /**
         * for expected goals against
         */
        EXPECTED_GAOLS_AGAINST: {
            SQUAD_COL: 1,
            OP_SHOTS_COL: 3,
            OP_XG_COL: 4,
            OP_GOALS_COL: 5,
            SP_SHOTS_COL: 6,
            SP_XG_COL: 7,
            SP_GOALS_COL: 8,
            SHEET_NAME: 'Expected Goals Against'
        },

        /**
         * for goal and shot creation
         */
        GOAL_SHOT_CREATION: {
            MIN_COL: 9,
            SCA_COL: 10,
            SCA_DEAD_COL: 12,
            GCA_COL: 17,
            GCA_DEAD_COL: 19,
            SHEET_NAME: 'Goal and Shot Creation'
        },

        /**
         * for squad-shooting
         */
        SQUAD_SHOOTING: {
            SQUAD_COL: 0,
            SH_COL: 4,
            XG_COL: 15,
            G_XG_COL: 18,
            SHEET_NAME: 'Squad Shooting'
        },

        /**
         * for squad-passing
         */
        SQUAD_PASSING: {
            SQUAD_COL: 0,
            TOTAL_ATT_COL: 4,
            SHORT_CMP_COL: 8,
            SHORT_ATT_COL: 9,
            MEDIUM_CMP_COL: 11,
            MEDIUM_ATT_COL: 12,
            LONG_CMP_COL: 14,
            LONG_ATT_COL: 15,
            XA_COL: 19,
            A_XAG_COL: 20,
            KEY_PASS_COL: 21,
            INTO_FINAL_3RD_COL: 22,
            INTO_PEN_AREA_COL: 23,
            CROSS_INTO_PEN_AREA_COL: 24,
            PRG_P_COL: 25,
            SHEET_NAME: 'Squad Passing'
        },

        /**
         * for squad-goal-and-shot-creation
         */
        SQUAD_GOAL_AND_SHOT_CREATION: {
            SQUAD_COL: 0,
            SCA_PASS_LIVE_COL: 5,
            SCA_PASS_DEAD_COL: 6,
            SCA_TAKE_ON_COL: 7,
            SCA_SHOT_COL: 8,
            SCA_FOUL_DRAWN_COL: 9,
            SCA_DEFENSIVE_ACTION_COL: 10,
            GCA_PASS_LIVE_COL: 13,
            GCA_PASS_DEAD_COL: 14,
            GCA_TAKE_ON_COL: 15,
            GCA_SHOT_COL: 16,
            GCA_FOUL_DRAWN_COL: 17,
            GCA_DEFENSIVE_ACTION_COL: 18,
            SHEET_NAME: 'Squad Goal and Shot Creation'
        },

        /**
         * for squad-possession
         */
        SQUAD_POSSESSION: {
            SQUAD_COL: 0,
            TOUCHES_DEF_PEN_COL: 5,
            TOUCHES_DEF_3RD_COL: 6,
            TOUCHES_MID_3RD_COL: 7,
            TOUCHES_ATT_3RD_COL: 8,
            TOUCHES_ATT_PEN_COL: 9,
            TAKE_ONS_ATT_COL: 11,
            TAKE_ONS_SUCC_COL: 12,
            CARRIES_COL: 16,
            PRG_CARRIES_COL: 19,
            CARRIES_INTO_FINAL_3RD_COL: 20,
            CARRIES_INTO_PEN_AREA_COL: 21,
            SHEET_NAME: 'Squad Possession'
        },

        /**
         * team sequence styles
         */
        TEAM_SEQUENCE_STYLES: {
            SQUAD_COL: 1,
            SEQUENCE_TIME_COL: 2,
            DILECT_SPEED_COL: 4,
            BUILD_UP_ATTACKS_COL: 6,
            DIRECT_ATTACKS_COL: 7,
            SHEET_NAME: 'Team Sequence Styles'
        },

        /**
         * team sequence pressures
         */
        TEAM_SEQUENCE_PRESSURES: {
            SQUAD_COL: 1,
            PPDA_COL: 2,
            HIGH_TURNOVER_TOTAL_COL: 3,
            SHOT_ENDING_COL: 4,
            GOAL_ENDING_COL: 5,
            SHEET_NAME: 'Team Sequence Pressures'
        },
        /**
         * for expected
         */
        EXPECTED: {
            MIN_COL: 9,
            GLS_COL: 10,
            AST_COL: 11,
            XG_COL: 22,
            NPXG_COL: 23,
            XA_COL: 24,
            SHEET_NAME: 'Summary'
        },

        /**
         * for passing
         */
        PASSING: {
            SHORT_CMP_COL: 15,
            SHORT_ATT_COL: 16,
            MEDIUM_CMP_COL: 18,
            MEDIUM_ATT_COL: 19,
            LONG_CMP_COL: 21,
            LONG_ATT_COL: 22,
            SHEET_NAME: 'Passing'
        },

        /**
         * for possession
         */
        POSSESSION: {
            OPPONENT_COL: 8,
            POSS_COL: 9,
            DEF_PEN_COL: 11,
            DEF_3RD_COL: 12,
            MID_3RD_COL: 13,
            ATT_3RD_COL: 14,
            ATT_PEN_COL: 15,
            SHEET_NAME: 'Possession'
        },

        /**
         * for goal log
         */
        GOAL_LOGS: {
            SCORER_COL: 4,
            ASSIST_COL: 14,
            GCA1_COL: 15,
            GCA1_TYPE_COL: 16,
            GCA2_COL: 17,
            GCA2_TYPE_COL: 18,
            DIFFERENT_NAME_TABLE: {
                'Gabriel Dos Santos': 'Gabriel Magalhaes',
                'Martinelli': 'Gabriel Martinelli',
            },
            SHEET_NAME: 'Goal Logs'
        },

        /**
         * defensive actions
         */
        DEFENSIVE_ACTIONS: {
            OPPONENT_COL: 8,
            PRESSURES_SUC_PER_COL: 20,
            PRESSURES_DEF_3RD_COL: 21,
            PRESSURES_MID_3RD_COL: 22,
            PRESSURES_ATT_3RD_COL: 23,
            SHEET_NAME: 'Defensive Actions'
        },




        /**
         * css option
         */
        CSS: {
            SCHEMA: 'blues',
            BAR_CHART_SCHEMA: '#6baed6',
            BAR_CHART_STROKE_SCHEMA: '#f0b429',
            PRESSURE: ['#1B435D', '#8CD790', '#F99F48', '#EE817B', '#1B435D'],
            POSSESSION: ['#1B435D', '#77AF9C', '#8CD790', '#FFC042', '#F99F48', '#EE817B'],
            COMPARE: ['#1B435D', '#F99F48'],
            DEFAULT: ['#1B435D', '#77AF9C']
        },

        PLAYER_LIST: {
            '2023-24': [
                'Gabriel Jesus',
                'Gabriel Martinelli',
                'Eddie Nketiah',
                'Leandro Trossard',
                'Reiss Nelson',
                'Thomas Partey',
                'Bukayo Saka',
                'Martin Ødegaard',
                'Emile Smith Rowe',
                'Jorginho',
                'Fabio Vieira',
                'Mohamed Elneny',
                'Kai Havertz',
                'Declan Rice',
                'Ben White',
                'Gabriel Magalhaes',
                'William Saliba',
                'Jakub Kiwior',
                'Takehiro Tomiyasu',
                'Oleksandr Zinchenko',
                'Jurrien Timber',
                'Cedric Soares',
                'Aaron Ramsdale',
                'David Raya',
                'karl Hein'
            ],
            '2022-23': [
                'Gabriel Jesus',
                'Gabriel Martinelli',
                'Eddie Nketiah',
                'Leandro Trossard',
                'Reiss Nelson',
                'Thomas Partey',
                'Bukayo Saka',
                'Martin Ødegaard',
                'Emile Smith Rowe',
                'Jorginho',
                'Fabio Vieira',
                'Mohamed Elneny',
                'Granit Xhaka',
                'Kieran Tierney',
                'Ben White',
                'Gabriel Magalhaes',
                'William Saliba',
                'Jakub Kiwior',
                'Rob Holding',
                'Takehiro Tomiyasu',
                'Oleksandr Zinchenko',
                'Cedric Soares',
                'Aaron Ramsdale',
                'Matt Turner',
                'karl Hein'
            ]
        },

        /**
         * player default data
         */
        PLAYER: {
            'Pierre-Emerick Aubameyang': {
                name: 'Aubameyang',
                x: 0.55,
                y: 0.9
            },
            'Gabriel Jesus': {
                name: 'Jesus',
                x: 0.55,
                y: 0.9
            },
            'Alexandre Lacazette': {
                name: 'Lacazette',
                x: 0.5,
                y: 0.85
            },
            'Eddie Nketiah': {
                name: 'Nketiah',
                x: 0.35,
                y: 0.9
            },
            'Bukayo Saka': {
                name: 'Saka',
                x: 0.8,
                y: 0.8
            },
            'Nicolas Pépé': {
                name: 'Pépé',
                x: 0.75,
                y: 0.7
            },
            'Martinelli': {
                name: 'Martinelli',
                x: 0.2,
                y: 0.8
            },
            'Emile Smith Rowe': {
                name: 'Smith Rowe',
                x: 0.15,
                y: 0.7
            },
            'Martin Ødegaard': {
                name: 'Ødegaard',
                x: 0.6,
                y: 0.65
            },
            'Fabio Vieira': {
                name: 'Vieira',
                x: 0.5,
                y: 0.7
            },
            'Granit Xhaka': {
                name: 'Xhaka',
                x: 0.4,
                y: 0.65
            },
            'Thomas Partey': {
                name: 'Partey',
                x: 0.5,
                y: 0.55
            },
            'Mohamed Elneny': {
                name: 'Elneny',
                x: 0.55,
                y: 0.5
            },
            'Kieran Tierney': {
                name: 'Tierney',
                x: 0.2,
                y: 0.45
            },
            'Oleksandr Zinchenko': {
                name: 'Zinchenko',
                x: 0.3,
                y: 0.45
            },
            'Nuno Tavares': {
                name: 'Tavares',
                x: 0.25,
                y: 0.35
            },
            'Gabriel Dos Santos': {
                name: 'Gabriel',
                x: 0.4,
                y: 0.4
            },
            'Rob Holding': {
                name: 'Holding',
                x: 0.5,
                y: 0.4
            },
            'Ben White': {
                name: 'White',
                x: 0.7,
                y: 0.4
            },
            'William Saliba': {
                name: 'Saliba',
                x: 0.6,
                y: 0.4
            },
            'Takehiro Tomiyasu': {
                name: 'Tomiyasu',
                x: 0.8,
                y: 0.45
            },
            'Cédric Soares': {
                name: 'Cédric',
                x: 0.75,
                y: 0.35
            },
            'Aaron Ramsdale': {
                name: 'Ramsdale',
                x: 0.5,
                y: 0.3
            }
        },

        FILTER_MIN: 30,
        FULLTIME_MIN: 90,
        AXIS_RATE: 'rate',
        DATA_REF_FBREF: ' (Data: FBREF)',
        DATA_REF_OPTA: ' (Data: Opta)'
    };
})();
