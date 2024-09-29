import { selector } from "recoil";
import adminState from "../atoms/admin.js"

const adminUsername = selector({
    key: 'adminUsername',
    get: ({get})=> {
        const state = get(adminState);
        return state.email;
    }
});

export default adminUsername;