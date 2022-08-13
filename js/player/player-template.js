/**
 * PlayerTemplate
 */
class PlayerTemplate {

    /**
     * create template charts.
     */
    createCharts() {
        let sleep = setInterval(() => {
            this.checkLoadData();
            this.createGoalShotCreationChart();
            this.createExpectedChart();
            clearInterval(sleep);
        }, 1000);
    }

    /**
     * check finishing loading data
     */
    checkLoadData() {
        // must override
    }

    /**
     * create goal and shot creation chart
     */
    createGoalShotCreationChart() {
        // override if you render
    }

    /**
     * create expected chart
     */
    createExpectedChart() {
        // override if you render
    }
}