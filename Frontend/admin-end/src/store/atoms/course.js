import {atom} from 'recoil';

const courseState = atom({
    key: 'courseState',
    default: {
        course: null,
        isLoading: true
    }
});

export default courseState;