/**
 * League Template
 */
class LeagueTemplate extends Template {

    /**
     * create template chart(Override)
     */
    createCharts() {
        let sleep = setInterval(() => {
            if (!this.isLoadComplated()) {
                return;
            }

            // for attack stats
            this.createShootingChart();
            this.createExpectedGoalsForChart();
            this.createPassingChart();
            this.createGoalAndShotCreationChart();
            this.createPossessionChart();
            this.createTeamSequenceStylesChart();

            // for defense stats
            this.createExpectedGoalsAgainstChart();
            this.createTeamSequencePressuresChart();
            clearInterval(sleep);
        }, 1000);
    }

    /**
     * check finishing loading data
     * @returns check result(boolean)
     */
    isLoadComplated() {
        // must override
    }

    /**
     * create shooting chart
     */
    createShootingChart() {
        // override if you render
    }

    /**
     * create expected goals for chart
     */
    createExpectedGoalsForChart() {
        // override if you render
    }

    /**
     * create passing chart
     */
    createPassingChart() {
        // override if you render
    }

    /**
     * create goal and shot creation chart
     */
    createGoalAndShotCreationChart() {
        // override if you render
    }

    /**
     * create possession chart
     */
    createPossessionChart() {
        // override if you render
    }

    /**
     * create team sequence style chart
     */
    createTeamSequenceStylesChart() {
        // override if you render
    }

    /**
     * create expected goals against chart
     */
    createExpectedGoalsAgainstChart() {
        // override if you render
    }

    /**
     * create team sequence pressures chart
     */
    createTeamSequencePressuresChart() {
        // override if you render
    }
}