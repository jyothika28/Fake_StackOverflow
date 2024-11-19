import React from "react";
import PageClass from ".";
import QuestionPage from "../questionPage/questionPageView";

export default class HomePageClass extends PageClass {
  getContent(): React.ReactNode {
    return (
      <QuestionPage
        title_text={this.title}
        order={this.questionOrder.toLowerCase()}
        search={this.search}
        setQuestionOrder={this.setQuestionOrder}
        clickTag={this.clickTag}
        handleAnswer={this.handleAnswer}
        handleNewQuestion={this.handleNewQuestion}
      />
    );
  }

  getSelected(): string {
    return "q";
  }
}
