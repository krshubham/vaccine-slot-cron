const Axios = require('Axios');
const {BASE_URL, CALENDAR_BY_DISTRICT} = require("./Routes");


/**
 * Returns the availability of the entire week
 * @param district_id The ID of the district as per CoWin API
 * @param date The date for the starting week
 * @returns {Promise<*>} returns the available list of centers
 */
async function getAvailabilityForGivenDistrictAndWeek(district_id, date) {
    const response = await Axios.get(BASE_URL + CALENDAR_BY_DISTRICT, {
        params: {
            district_id: district_id,
            date, date
        },
        headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"
        }
    });
    const centers = response.data.centers;
    return await centers;
}

module.exports = {
    getAvailabilityForGivenDistrictAndWeek
};