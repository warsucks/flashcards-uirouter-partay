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

  $stateProvider.state('newCard',
  {
    url: '/newCard',
    templateUrl: '/js/states/newCardForm.html',
    controller: function($scope)
    {
      console.log("inside new card state");
    }
  });

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
