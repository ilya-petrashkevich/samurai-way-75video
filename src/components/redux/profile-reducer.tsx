import React from 'react';
import {ActionsTypes, PostsType, ProfilePageType, ProfileType} from "./store";
import store from "./redux-store";
import {Dispatch} from "redux";
import {getProfile, profileAPI} from "../../api/api";


let initialState: ProfilePageType = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "It`s my first post", likesCount: 5}
    ],
    newPostText: 'it-kamasutra.com', //эта строчка под снос
    profile: {
        "aboutMe": '!!!!!!!!!!!!',
        "contacts": {
            "facebook": "!!!!!",
            "website": null,
            "vk": "!!!!!",
            "twitter": "!!!!!!!!!!!!",
            "instagram": "!!!!!!!!!!!",
            "youtube": null,
            "github": "!!!!!!!!!!!!",
            "mainLink": null
        },
        "lookingForAJob": true,
        "lookingForAJobDescription": "!!!!!!!!!!!!!!",
        "fullName": "!!!!!!!!!!!!!",
        "userId": 26879, //26879 //store.getState().auth.userId
        "photos": {
            "small": ''/*"https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0"*/,
            "large": ''/*"https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0"*/
        }
    },
    status: ""
};

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes) => {

    switch (action.type) {
        case "ADD-POST": {
            let newPost: PostsType = {
                id: state.posts.length + 1, // или просто номер вставлять вручную
                message: action.postMessage, //state.profilePage.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case "UPDATE-NEW-POST-TEXT": {
            return {
                ...state,
                newPostText: action.newText
            };
        }
        case "SET-USER-PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "SET-STATUS":
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }
    // ВНИМАНИЕ ВАЖНЫЙ КОММЕНТ К КОДУ!!!!! ниже это то что было то того как мы использовали switch case, в редюсерах видимо принято использовать switch case!!!
    // if (action.type === 'ADD-POST') {
    //     let newPost: PostsType = {
    //         id: state.posts.length + 1, // или просто номер вставлять вручную
    //         message: action.postMessage, //state.profilePage.newPostText,
    //         likesCount: 0
    //     }
    //     state.posts.push(newPost);
    //     state.newPostText = '';
    // store._state.profilePage.posts.push(newPost);
    // store._state.profilePage.newPostText = '';
    // this._onChange();
    // } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
    //     state.newPostText = action.newText;
    //     // this._onChange();
    // }

};
export const addPostAC = (postMessage: string)/*: AddPostActionType*/ => {
    return {
        type: "ADD-POST",
        postMessage: postMessage
    } as const
}
export const setUserProfile = (profile: ProfileType) => {
    return {
        type: "SET-USER-PROFILE",
        profile
    } as const
}
export const updateNewPostTextAC = (newText: string)/*: UpdateNewPostTextActionType*/ => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newText: newText
    } as const
}
export const setStatusAC = (status: string) => {
    return {
        type: "SET-STATUS",
        status
    } as const
}

//==========================thunk===========================
export const getUserProfile = (userId: string) => (dispatch: Dispatch<ActionsTypes>) => {
    getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data));
        })
}
export const getStatus = (userId: string) => (dispatch: Dispatch<ActionsTypes>) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatusAC(response.data));
        })
}
export const updateStatus = (status: string) => (dispatch: Dispatch<ActionsTypes>) => {
    profileAPI.updateStatus(status)
        .then(response => {
            //0 - значит респонс удачный
            if (response.data.resultCode === 0) {
                dispatch(setStatusAC(status));
            }
            //пока ошибки не обрабатываем!!!
        })
}