import React, { useState } from 'react';
import Header from './header';
import Main from './main/mainView';
import HomePageClass from './main/routing/home';
import TagPageClass from './main/routing/tag';
import AnswerPageClass from './main/routing/answer';
import NewQuestionPageClass from './main/routing/newQuestion';
import NewAnswerPageClass from './main/routing/newAnswer';
import UserProfilePageClass from './main/routing/profile';
import Login from './login/loginView';
import Registration from './registration/registrationView';


const FakeStackOverflow = () => {
  const [search, setSearch] = useState<string>('');
  const [mainTitle, setMainTitle] = useState<string>('All Questions');
  const [questionOrder, setQuestionOrder] = useState('newest');
  const [qid, setQid] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // State to toggle between login and registration


  const userProfilePage=(
    search = '',
    title = 'User Profile'
  ): void => {
    setSearch(search);
    setMainTitle(title);
    setPageInstance(
      new UserProfilePageClass({
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
        userProfilePage,
      })
    );
  };
 
  const setQuestionPage = (
    search = '',
    title = 'All Questions'
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
        userProfilePage,
      })
    );
  };

  const handleQuestions = () => {
    setSearch('');
    setMainTitle('All Questions');
    setPageInstance(
      new HomePageClass({
        search: '',
        title: 'All Questions',
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
        userProfilePage,
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
        userProfilePage,
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
        userProfilePage,
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
        userProfilePage
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
        userProfilePage
      })
    );
  };

  const clickTag = (tname: string) => {
    setSearch('[' + tname + ']');
    setMainTitle(tname);
    setPageInstance(
      new HomePageClass({
        search: '[' + tname + ']',
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
        userProfilePage,
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
      userProfilePage,
      
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
      {isLoggedIn ? (
        <>
          <Header 
            search={search} 
            userProfilePage={userProfilePage}
            setQuestionPage={setQuestionPage}
            navigateToLogin={() => setIsLoggedIn(false)}
             username=""/>
          <Main 
            page={pageInstance} 
            handleQuestions={handleQuestions} handleTags={handleTags}
          />
        </>
      ) : (
        isRegistering ? (
          <Registration 
            setIsLoggedIn={setIsLoggedIn} 
            navigateToLogin={() => setIsRegistering(false)} 
          />
        ) : (
          <Login 
            setIsLoggedIn={setIsLoggedIn} 
            navigateToRegister={() => setIsRegistering(true)} 
          />
        )
      )}
    
          {/* <Header 
            search={search} 
            setQuestionPage={setQuestionPage} />
          <Main 
            page={pageInstance} 
            handleQuestions={handleQuestions} handleTags={handleTags}
          /> */}
     
    </>
  );
};

export default FakeStackOverflow;
