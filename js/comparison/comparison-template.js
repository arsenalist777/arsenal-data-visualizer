/**
 * Template for comparison
 */
class ComparisonTemplate {

    /**
     * executor
     * @param {Array} players player array
     */
    exec(players) {
        let sleep = setInterval(() => {
            players.forEach(player => {
                this.checkLoadData(player);
            });
            this.renderComparisonCharts(players);
            clearInterval(sleep);
        }, 1000);
    }

    /**
     * check finishing loading data
     * @param {Object} player player object
     */
    checkLoadData(player) {
        // must override
    }

    /**
     * rendering comparison charts
     * @param {Array} players 
     */
    renderComparisonCharts(players) {
        // must override
    }
}