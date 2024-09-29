import { selector } from "recoil";
import courseState from "../atoms/course";

export const courseDetails = selector({
    key: 'courseDetailsState',
    get: ({get})=> {
        const state = get(courseState);
        return state.course;
    }
});

export const isCourseLoading = selector({
    key: 'isCourseLoading',
    get: ({get}) => {
        const state = get(courseState);
        return state.isLoading;
    }
})

export const courseTitle = selector({
    key: 'courseTitleState',
    get: ({get})=> {
        const state = get(courseState);
        if(!state.course)  return "";
        return state.course.title;
    }
});

export const courseCreator = selector({
    key: 'courseCreatorState',
    get: ({get})=> {
        const state = get(courseState);
        if(!state.course)  return "";
        return state.course.createdBy;
    }
});

export const courseDescription = selector({
    key: 'courseDescriptionState',
    get: ({get})=> {
        const state = get(courseState);
        if(!state.course)  return "";
        return state.course.description;
    }
});

export const coursePrice = selector({
    key: 'coursePriceState',
    get: ({get})=> {
        const state = get(courseState);
        if(!state.course)  return "";
        return state.course.price;
    }
});

export const courseImage = selector({
    key: 'courseImageState',
    get: ({get})=> {
        const state = get(courseState);
        if(!state.course)  return "";
        return state.course.imageLink;
    }
});