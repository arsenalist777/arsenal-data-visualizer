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
         * image urls
         */
        IMG_URL: {
            Arsenal: './img/arsenal.png',
            'Aston Villa': './img/aston-villa.png',
            Bournemouth: './img/bournemouth.png',
            Brentford: './img/brentford.png',
            Brighton: './img/brighton.png',
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
            'Newcastle Utd': './img/newcastle.png',
            'Nott\'ham Forest': './img/nottingham-forest.png',
            'Sheffield Utd': './img/sheffield-united.png',
            Southampton: './img/southampton.png',
            Tottenham: './img/tottenham.png',
            'West Ham': './img/west-ham.png',
            Wolves: './img/wolves.png',
        },

        /**
         * Condition for chart option
         */
        CHART_CONDITION: {
            ARSENAL: 'datum["squad"] === "Arsenal"',
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
                'Aaron Ramsdale',
                'David Raya'
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
                'Aaron Ramsdale',
                'Matt Turner'
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
        DATA_REF: ' (Data: FBREF)'
    };
})();
