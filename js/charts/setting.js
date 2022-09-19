(function () {

    /**
     * initial setting and start execution
     */
    setAndExec = function (callback) {

        // load google charts package
        google.charts.load('current', { packages: ['corechart', 'vegachart'] });
        google.charts.setOnLoadCallback(callback);
    }
})();