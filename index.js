const AvailabilityChecker = require('./AvailabilityChecker');
const districts = require('./districts.json');
const fs = require("fs");
const notifier = require('node-notifier');
const open = require('open');
const os = require("os");
const path = require("path");
const Dose = require('./Dose');
const {getCurrentDateInDDMMYYYY, filterByMinAge} = require('./Utils');

const DISTRICT_NAME = "SAS Nagar";
const MIN_AGE = 18;

function main() {
    let districtId = null;
    for(let i = 0; i < districts.length; i++) {
        if(districts[i].district_name.toLowerCase() === DISTRICT_NAME.toLowerCase()) {
            districtId = districts[i].district_id;
            break;
        }
    }
    if(districtId === null) {
        console.log(`District with name ${DISTRICT_NAME} not found`);
        return;
    }

    const date = getCurrentDateInDDMMYYYY();
    console.log(`Checking vaccine availability for week starting from ${date}`);
    AvailabilityChecker.getAvailabilityForGivenDistrictAndWeek(districtId,date)
        .then(centers => filterByMinAge(centers, MIN_AGE, Dose.FIRST))
        .then(sessions => {
            if(sessions.length > 0) {
                console.log(`${sessions.length} sessions available for the week of ${date}`);
                fs.writeFileSync(`${path.join(os.homedir(), "results.json")}`, JSON.stringify(sessions, null, 2));
                for(let session of sessions) {
                    console.log(`${session.available_capacity} doses available at ${session.center.name}, ${session.center.block_name} on ${session.date}`)
                }
                console.log(`Please check results.json for all details`);
                notifier.notify({
                    title: 'Vaccine Checker',
                    message: 'Vaccine is available click here for more details',
                    sound: 'Hero',
                    timeout: 15,
                }, async (err, resp, metadata) => {
                    if(resp === 'activate') {
                        await open(`${path.join(os.homedir(), "results.json")}`);
                    }
                });
            } else {
                console.log(`No matching sessions for age ${MIN_AGE} in ${DISTRICT_NAME} for the week of ${date}`);
            }
        })
        .catch(err => console.log(err));
}


main();