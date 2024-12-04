import React from "react";
import PageClass from ".";
import Profile from "../profile/profileView";

export default class UserProfilePageClass extends PageClass {
  getContent(): React.ReactNode {
    console.log(this);
    return <Profile userProfilePage={this.userProfilePage} />;
  }


  getSelected(): string {
    return "";
  }
}