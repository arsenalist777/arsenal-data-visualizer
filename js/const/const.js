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

        FILTER_MIN: 30,
        FULLTIME_MIN: 90
    };
})();
