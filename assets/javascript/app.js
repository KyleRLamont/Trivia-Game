$(document).ready(function() {
    $("#quiztime").hide();
    $("#start").on('click', trivia.startGame)
    $(document).on('click', '.option', trivia.guessChecker);
});

var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 30,
    timerOn: false,
    timerId : '',

    questions: {
        q1: "Who wrote the 'A Song of Ice And Fire' fantasy novel series?",
        q2: 'What cricketing term denotes a batsman being dismissed with a score of zero?',
        q3: "What is the name of James Dean's character in the 1955 movie 'Rebel Without a Cause'?",
        q4: 'Gannymede is the largest moon of which planet?',
        q5: 'Which car is the first mass-produced hybrid vehicle?',
        q6: 'What is the name of the 2016 studio album by the French electronic music duo Justice?',
        q7: 'In Touhou: Embodiment of Scarlet Devil, what song plays during Flandre Scarlet&#039;s boss fight?',
        q8: 'In which year was Constantinople conquered by the Turks??',
    },
    options: {
        q1: ['George Lucas','George R. R. Martin','George Eliot','George Orwell'],
        q2: ['Duck','Carry','Beamer','Bye'],
        q3: ['Ned Stark','Jim Kane','Jim Stark','Frank Stark'],
        q4: ['Uranus','Mars','Neptune','Jupiter'],
        q5: ['Toyota Prius','Honda Fit','Chevrolet Spark','Peugeot 308 R HYbrid'],
        q6: ['Woman','Randy','Safe and Sound','Pleasure'],
        q7: ['Septette for the Dead Princess','Pierrot of the Star-Spangled Banner','U.N. Owen Was Her','Flowering Night'],
        q8: ['1453','1435','1440','1454'],
    },
    answers: {
        q1: 'George R. R. Martin',
        q2: 'Duck',
        q3: 'Jim Stark',
        q4: 'Jupiter',
        q5: 'Toyota Prius',
        q6: 'Woman',
        q7: 'U.N. Owen Was Her',
        q8: '1453',
    },

    startGame: function() {
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);
        $('#game').show();
        $('#results').html('');
        $('#timer').text(trivia.timer);
        $('#start').hide();
        $('#quiztime').show();
        trivia.nextQuestion();
    },

    nextQuestion: function(){
        trivia.timer = 30;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);
        if(!trivia.timerOn){
          trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }
        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);
        var questionOptions = Object.values(trivia.options)[trivia.currentSet];
        $.each(questionOptions, function(index, key){
          $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
        });
    },

    timerRunning: function(){
        if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
          $('#timer').text(trivia.timer);
          trivia.timer--;
            if(trivia.timer === 4){
              $('#timer').addClass('last-seconds');
            }
        } else if(trivia.timer === -1){
          trivia.unanswered++;
          trivia.result = false;
          clearInterval(trivia.timerId);
          resultId = setTimeout(trivia.guessResult, 1000);
          $('#results').html('<h3>Oh no, out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
        } else if(trivia.currentSet === Object.keys(trivia.questions).length){
          $('#results').html('<h3>Thank you! Here is how you did:</h3>'+
            '<p>Correct: '+ trivia.correct +'</p>'+
            '<p>Incorrect: '+ trivia.incorrect +'</p>'+
            '<p>Unaswered: '+ trivia.unanswered +'</p>'+
            '<p>Would you like to play again?</p>');
          $('#game').hide();
          $('#start').show();
        }
    },
    guessChecker: function() {
    
        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
        
        if($(this).text() === currentAnswer){
            $(this).addClass('btn-success').removeClass('btn-info');
            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Correct Answer!</h3>');
        } else{
            $(this).addClass('btn-danger').removeClass('btn-info');
            trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Better luck next time! The answer was '+ currentAnswer +'</h3>');
        }
    
    },

    guessResult: function(){
        trivia.currentSet++;
        $('#options').empty();
        $('#results').empty();
        trivia.nextQuestion();
      },
};
