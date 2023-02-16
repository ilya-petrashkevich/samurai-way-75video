import React, {FC} from 'react';
import Profile from "./Profile";
import {PostsType, ProfileType} from "../redux/store";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";
import {compose} from "redux";
import {getStatus, getUserProfile, updateStatus} from "../redux/profile-reducer";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import WithAuthRedirect from "../../hoc/withAuthRedirect";

type PathParamsType = {
    userId: string
}

type MapStatePropsType = {
    posts: PostsType[]
    newPostText: string
    profile: ProfileType
    // isAuth: boolean
    status: string
}

type MapDispatchPropsType = {
    getUserProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
}

type ProfileContainerPropsType =
    MapStatePropsType
    & MapDispatchPropsType;

type NewProfileContainerPropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType;

class ProfileContainer extends React.Component<NewProfileContainerPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            //мой id '26879' //this.props.profile.userId.toString(); <=== это потом понадобится!!!!!! и работает видимо что бы получить свой id с сервера когда залогинен!!!!!!!
            userId = this.props.profile.userId.toString();
        }
        // console.log(userId)
        this.props.getUserProfile(userId);
        // console.log(this.props.profile)
        this.props.getStatus(userId)

        // this.props.getStatus(userId);
        console.log(this.props.status)

    }

    render() {

        return (
            <div>
                <Profile
                    {...this.props}
                    posts={this.props.posts}
                    newPostText={this.props.newPostText}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}
                />
            </div>
        )
    }
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile,
        status: state.profilePage.status
    }
}

export default WithAuthRedirect(compose<FC>(connect(mapStateToProps, {getUserProfile , getStatus, updateStatus}), withRouter)(ProfileContainer))
