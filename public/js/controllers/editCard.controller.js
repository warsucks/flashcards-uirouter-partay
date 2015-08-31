app.controller('EditCardController', function ($scope, FlashCardsFactory, $stateParams, $state) {

	var cardId = $stateParams.id;

	FlashCardsFactory.getFlashCardById(cardId)
	.then(function(card)
	{
		$scope.card = card;
	})
	.then(null, console.error);

	$scope.categories = FlashCardsFactory.categories;
	$scope.saveCard = function () {
		FlashCardsFactory.updateCard($scope.card)
		.then(function (updatedCard) {
			$scope.$parent.editing = false;
			$state.go("home");
		});
	};

	$scope.deleteCard = function()
	{
		console.log("controller card id:",$scope.card._id);
		FlashCardsFactory.deleteFlashCardById($scope.card._id)
		.then(function(deletedCard)
		{
			$state.go("home");
		});
	};

});
