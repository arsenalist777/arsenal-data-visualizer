/**
 * Controller class
 */
class Controller {

    /**
     * cache for instance
     */
    static cache = {};

    /**
     * main method
     * @param {*} season 
     */
    static main(season) {

        // load google charts package
        google.charts.load('current', { packages: ['corechart', 'vegachart'] });
        google.charts.setOnLoadCallback(function () {
            let plemierLeagueAttacking = new PlAttacking(season);
            plemierLeagueAttacking.createPlAttackingData(true);
            Controller.cache['plAttacking' + season] = plemierLeagueAttacking;
            Controller.addEventListener();
        });
    };

    /**
     * add event listener
     */
    static addEventListener() {

        // add event listener
        document.querySelector('#season-select').addEventListener('change', function (e) {
            Common.removeChartDivs();

            // get season
            let season = e.target.value;
            let plemierLeagueAttacking = Controller.cache['plAttacking' + season];
            if (plemierLeagueAttacking) {
                plemierLeagueAttacking.renderCharts();
            } else {
                plemierLeagueAttacking = new PlAttacking(season);
                plemierLeagueAttacking.createPlAttackingData(true);
                Controller.cache['plAttacking' + season] = plemierLeagueAttacking;
            }
        });
    };
}