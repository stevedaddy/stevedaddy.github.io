angular.module('myApp', [])
    .constant('NAME', " name")
    .constant('JOB', "job title")
    .constant('TASK', "tedious task")
    .constant('DIRTY', "dirty task")
    .constant('CELEB', "celebrity")
    .constant('USLESS', "useless skill")
    .constant('OBNOX', "obnoxiuous celbertity")
    .constant('HUGE', "huge number")
    .constant('ADJ', "adjective")

    .controller('inputCtrl', function(NAME, JOB, TASK, DIRTY, CELEB, USLESS, OBNOX, HUGE, ADJ, $scope){
        $scope.gender = {
            "men":{
                "formal": "Male",
                "posessive": "his",
                "descriptive": "he"
            },
            "women":{
                "formal": "Female",
                "posessive": "her",
                "descriptive": "she"
            }
        };
        //wrap the token in curly braces and replace whitespace so it can't word-wrap
        function placeHolderMaker(placeHolder){
            placeHolder = '{{ '+ placeHolder +' }}';
            placeHolder = placeHolder.replace(/\s/g, "\xa0");
            return placeHolder;
        }
        //female by default
        $scope.genderchecker = "female";
        // this name token is handeled diffrently because it has gender switching
        $scope.ph_femalename =  $scope.gender.women.formal + NAME;
        $scope.nameToken = placeHolderMaker($scope.ph_femalename);

        $scope.RadioChange = function (s) {
            //change the value on the radio
            $scope.GenderSelected = s;
            //change the value of this varible back and fourth each time too
            $scope.genderchecker = s;

            if($scope.genderchecker == "female"){
                $scope.genderchecker = $scope.gender.women.formal;
            }
            else{
                $scope.genderchecker = $scope.gender.men.formal;
            }
            //update the value seen in the name token/placeholder when the radio is changed
            $scope.ph_femalename = $scope.genderchecker + NAME;
            $scope.nameToken = placeHolderMaker($scope.ph_femalename)
        };
        
        $scope.ph_jobtitle = JOB;
        $scope.jobtitleToken = placeHolderMaker($scope.ph_jobtitle);

        $scope.ph_tedioustask = TASK;
        $scope.tedioustaskToken = placeHolderMaker($scope.ph_tedioustask);

        $scope.ph_dirtytask = DIRTY;
        $scope.dirtytaskToken = placeHolderMaker($scope.ph_dirtytask);

        $scope.ph_celebrity = CELEB;
        $scope.celebrityToken = placeHolderMaker($scope.ph_celebrity);

        $scope.ph_uselessskill = USLESS;
        $scope.uselessskillToken = placeHolderMaker($scope.ph_uselessskill);

        $scope.ph_obnoxiuous = OBNOX;
        $scope.obnoxiuousToken = placeHolderMaker($scope.ph_obnoxiuous);

        $scope.ph_huge = HUGE;
        $scope.hugeToken = placeHolderMaker($scope.ph_huge);

        $scope.ph_adjective = ADJ;
        $scope.adjectiveToken = placeHolderMaker($scope.ph_adjective);


    });
