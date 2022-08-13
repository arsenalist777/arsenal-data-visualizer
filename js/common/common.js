/**
 * Common Methods
 */
class Common {

    /**
     * sort array method
     * @param {Array} array 
     * @returns sorted array
     */
    static sortArray(array) {
        array.sort(function (a, b) {
            if (a < b) {
                return -1;
            } if (a > b) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    }
}