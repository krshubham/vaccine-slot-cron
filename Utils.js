const Dose = require('./Dose');

/**
 *
 * @param centers The centers which have vaccine available
 * @param minAge The minimum age to check for vaccine
 * @param dose Either first or second
 * @returns {*[]} list of all sessions and centers matching the filter criteria
 */
function filterByMinAge(centers, minAge, dose) {
    const filtered_sessions = [];
    for(let center of centers) {
        for(let session of center.sessions) {
            if(session.available_capacity > 0 && session.min_age_limit <= minAge) {
                if(dose === Dose.FIRST) {
                    if(session.available_capacity_dose1 <= 0) {
                        continue;
                    }
                } else {
                    if(session.available_capacity_dose2 <= 0) {
                        continue;
                    }
                }
                session.center = center;
                filtered_sessions.push(session);
            }
        }
        delete center.sessions;
    }
    return filtered_sessions;
}


function getCurrentDateInDDMMYYYY() {
    const dateObject = new Date();
    const date = padDigit(dateObject.getDate());
    const month = padDigit(dateObject.getMonth() + 1);
    const year = padDigit(dateObject.getFullYear());
    return `${date}-${month}-${year}`;
}


function padDigit(digit) {
    if(digit < 10) {
        return '0' + digit;
    }
    return digit;
}

module.exports = {
    filterByMinAge,
    getCurrentDateInDDMMYYYY
};