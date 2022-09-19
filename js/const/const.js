(function () {

    /**
     * Const data
     */
    Const = {

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
         * for expected
         */
        EXPECTED: {
            MIN_COL: 9,
            GLS_COL: 10,
            AST_COL: 11,
            XG_COL: 23,
            NPXG_COL: 24,
            XA_COL: 25,
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
        GOAL_LOG: {
            SCORER_COL: 4,
            ASSIST_COL: 12,
            GCA1_COL: 13,
            GCA1_TYPE_COL: 14,
            GCA2_COL: 15,
            GCA2_TYPE_COL: 16,
            SHEET_NAME: 'Goal Log'
        },

        FILTER_MIN: 30,
        FULLTIME_MIN: 90
    };
})();
