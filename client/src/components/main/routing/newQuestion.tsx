import React from "react";
import PageClass from ".";
import NewQuestion from "../newQuestion/newQuestionView";

export default class NewQuestionPageClass extends PageClass {
  getContent(): React.ReactNode {
    console.log(this);
    return <NewQuestion handleQuestions={this.handleQuestions} />;
  }

  getSelected(): string {
    return "";
  }
}
