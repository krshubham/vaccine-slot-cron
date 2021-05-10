
function filterByMinAge(centers, minAge) {
    const filtered_sessions = [];
    for(let center of centers) {
        for(let session of center.sessions) {
            if(session.available_capacity > 0 && session.min_age_limit <= minAge) {
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