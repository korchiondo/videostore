'use strict';
 
angular.module('Home', [
    'chart.js',
    'angularUtils.directives.dirPagination',
    'ui.select'])
 
.controller('HomeController',
    ['$scope',
    function ($scope) {
        $scope.sortType     = 'title';
        $scope.sortReverse  = false;
        $scope.search   = null;

/*        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A', 'Series B'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];*/
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };

        // create the list of sushi rolls
        $scope.data = [
            { title: 'aaa', desc: 'aaaaaa', cat: 'comedy', year: '2015', lang: 'English', length: 90, rating: 5, actors:['Bruce Lee', 'Bred Pit'] },
            { title: 'bbb', desc: 'bbbbbbbbb', cat: 'comedy', year: '2017',lang: 'Spanish', length: 120, rating: 2, actors:['Bruce Lee', 'Bred Pit']  },
            { title: 'cc', desc: 'ccccccccc', cat: 'detective', year: '2012', lang: 'Freanch', length: 100, rating: 4, actors:['Bruce Lee', 'Bred Pit']  },
            { title: 'ddd', desc: 'dddddddddd', cat: 'horror', year: '2011', lang: 'English', length: 90, rating: 5, actors:['Bruce Lee', 'Bred Pit']  }
        ];

        $scope.categories =  $scope.data.map(function(val) {
            return val.cat;
        }).filter(function(val,key,arr) {
            return arr.indexOf(val) == key
        });

        $scope.selectedCategory = $scope.categories[0];

        $scope.onSortClick = function(sortColumn){
            $scope.sortType = sortColumn;
            $scope.sortReverse = !$scope.sortReverse;
        };

        $scope.showCaret = function(sortColumn){
            return $scope.sortType === sortColumn && !$scope.sortReverse;
        }
    }]);