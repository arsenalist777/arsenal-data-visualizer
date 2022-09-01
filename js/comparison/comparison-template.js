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
            let isLoaded = true;
            let playerLength = players.length;
            for (let i = 0; i < playerLength; i++) {
                if (!this.isLoadedData(players[i])) {
                    isLoaded = false;
                    break;
                }
            }
            if (!isLoaded) {
                return;
            }
            this.renderComparisonCharts(players);
            clearInterval(sleep);
        }, 1000);
    }

    /**
     * check finishing loading data
     * @param {Object} player player object
     * @returns check result(boolean)
     */
    isLoadedData(player) {
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