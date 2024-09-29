import { atom } from 'recoil';

const adminState = atom({
    key: 'adminState',
    default: {
        email: ""
    }
});

export default adminState;
