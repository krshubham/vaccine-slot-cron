const Axios = require('axios');
const fs = require("fs");
const Constants = require("./Constants");
const {DISTRICTS_BY_STATE} = require("./Routes");
const {BASE_URL} = require("./Routes");


function init() {
    let districts = [];
    for(let state = 1; state <= 36; state++) {
        setTimeout(async (state_id) => {
            console.log(`Getting Districts for state ${state_id}`);
            const response = await Axios.get(BASE_URL + DISTRICTS_BY_STATE + '/' + state_id, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"
                }
            });
            const districtsForState = response.data.districts;
            console.log(response.data)
            districts = districts.concat(districtsForState);
            if(state_id == 36) {
                fs.writeFileSync(Constants.DISTRICS_JSON_FILE, JSON.stringify(districts, null, 2));
            }
        }, 5000*state, state);
    }
}

init();