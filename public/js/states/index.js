app.config(function($stateProvider)
{
  $stateProvider.state('home',
  {
    url: '/',
    templateUrl: '/js/states/home.html',
    controller: function($scope)
    {
      console.log("inside home state");
    }
  });

  $stateProvider.state('manageCard',
  {
    url: '/manage-cards/:id',
    templateUrl: '/js/states/editForm.html',
    controller: "EditCardController"
  })
  .state('manageCard.deleteCard',
  {
    url: '/delete-card/',
    templateUrl: '/js/states/deletePrompt.html',
    //controlle
  });

  $stateProvider.state('newCard',
  {
    url: '/new-card',
    templateUrl: '/js/states/newCardForm.html',
    controller: "NewCardController"
  });


  // $stateProvider.state('editCard',
  // {
  //   url: '/edit-card/:id',
  //   templateUrl: '/js/states/editForm.html',
  //   controller: "EditCardController"
  // });

  $stateProvider.state('stats',
  {
    url: '/stats',
    templateUrl: '/js/states/stats.html',
    controller: function ($scope, ScoreFactory) {
        $scope.scores = ScoreFactory.scores;
    }
  });
  // $stateProvider.state('flashcard',
  // {
  //   url: '/flashcards',
  //   templateUrl: '/js/states/stats.html',
  //   controller: function ($scope) {
  //       $scope.scores = ScoreFactory.scores;
  //   }
  // });
});
