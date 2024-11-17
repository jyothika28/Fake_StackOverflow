import { useState } from "react";
import Header from "./header";
import Main from "./main/mainView";
import HomePageClass from "./main/routing/home";
import TagPageClass from "./main/routing/tag";
import AnswerPageClass from "./main/routing/answer";
import NewQuestionPageClass from "./main/routing/newQuestion";
import NewAnswerPageClass from "./main/routing/newAnswer";

const FakeStackOverflow = () => {
  const [search, setSearch] = useState<string>("");
  const [mainTitle, setMainTitle] = useState<string>("All Questions");
  const [questionOrder, setQuestionOrder] = useState("newest");
  const [qid, setQid] = useState("");

  const setQuestionPage = (
    search = "",
    title = "All Questions"
  ): void => {
    setSearch(search);
    setMainTitle(title);
    setPageInstance(
      new HomePageClass({
        search,
        title,
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      })
    );
  };

  const handleQuestions = () => {
    setSearch("");
    setMainTitle("All Questions");
    setPageInstance(
      new HomePageClass({
        search: "",
        title: "All Questions",
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      })
    );
  };

  const handleTags = () => {
    setPageInstance(
      new TagPageClass({
        search,
        title: mainTitle,
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      })
    );
  };

  const handleAnswer = (qid: string) => {
    setQid(qid);
    setPageInstance(
      new AnswerPageClass({
        search,
        title: mainTitle,
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      })
    );
  };

  const clickTag = (tname: string) => {
    setSearch("[" + tname + "]");
    setMainTitle(tname);
    setPageInstance(
      new HomePageClass({
        search: "[" + tname + "]",
        title: tname,
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      })
    );
  };

  const handleNewQuestion = () => {
    setPageInstance(
      new NewQuestionPageClass({
        search,
        title: mainTitle,
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      })
    );
  };

  const handleNewAnswer = () => {
    setPageInstance(
      new NewAnswerPageClass({
        search,
        title: mainTitle,
        setQuestionPage,
        questionOrder,
        setQuestionOrder,
        qid,
        handleQuestions,
        handleTags,
        handleAnswer,
        clickTag,
        handleNewQuestion,
        handleNewAnswer,
      })
    );
  };

  const [pageInstance, setPageInstance] = useState(new HomePageClass({
      search: "",
      title: "All Questions",
      setQuestionPage,
      questionOrder,
      setQuestionOrder,
      qid,
      handleQuestions,
      handleTags,
      handleAnswer,
      clickTag,
      handleNewQuestion,
      handleNewAnswer,
    })
  );

  console.log("Before: ", pageInstance);
  pageInstance.search = search;
  pageInstance.questionOrder = questionOrder;
  pageInstance.qid = qid;
  pageInstance.title = mainTitle;
  console.log("After: ", pageInstance);

  return (
    <>
      <Header 
        search={search} 
        setQuestionPage={setQuestionPage} />
      <Main 
        page={pageInstance} 
        handleQuestions={handleQuestions} handleTags={handleTags}
      />
    </>
  );
};

export default FakeStackOverflow;
