/**
 * Controller class
 */
class Controller {

    /**
     * cache for instance
     */
    static cache = {};

    /**
     * showing statistic (default: plAttacking)
     */
    static statistic = 'plAttacking';

    /**
     * showing season
     */
    static season = '';

    /**
     * template Class mapping
     */
    static templates = {
        'plAttacking': PlAttacking,
        'plDefending': PlDefending,
    }

    /**
     * main method
     * @param {*} season 
     */
    static main(season) {
        Controller.season = season;

        // load google charts package
        google.charts.load('current', { packages: ['corechart', 'vegachart'] });
        google.charts.setOnLoadCallback(function () {
            let plemierLeagueAttacking = new PlAttacking(season);
            plemierLeagueAttacking.createData();
            Controller.cache['plAttacking' + season] = plemierLeagueAttacking;
            Controller.addEventListener();
        });
    };

    static getStatisticInstance(name, season) {
        let instance = Controller.cache[name + season];
        if (!instance) {
            instance = Reflect.construct(Controller.templates[name], [season]);
            Controller.cache[name + season] = instance;
        }
        return instance;
    }

    /**
     * add event listener
     */
    static addEventListener() {

        // add event listener for season select
        document.querySelector('#season-select').addEventListener('change', function (e) {

            // remove chart divs
            Common.removeChartDivs();

            // get statistic for create instance
            const statistic = Controller.statistic;

            // get season
            Controller.season = e.target.value;
            Controller.getStatisticInstance(statistic, Controller.season).createData();
        });

        // add event listener for attack link
        document.querySelector('#attacking').addEventListener('click', function (e) {

            // remove chart divs
            Common.removeChartDivs();
            Controller.statistic = 'plAttacking';
            Controller.getStatisticInstance(Controller.statistic, Controller.season).createData();
        });

        // add event listener for defense link
        document.querySelector('#defending').addEventListener('click', function (e) {

            // remove chart divs
            Common.removeChartDivs();
            Controller.statistic = 'plDefending';
            Controller.getStatisticInstance(Controller.statistic, Controller.season).createData();
        });
    }
}