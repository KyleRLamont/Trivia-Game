$(document).ready(function() {
    $("#time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.answerChecker);
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
        q1: 'Who wrote the &quot;A Song of Ice And Fire&quot; fantasy novel series?',
        q2: 'What cricketing term denotes a batsman being dismissed with a score of zero?',
        q3: 'What is the name of James Dean&#039;s character in the 1955 movie &quot;Rebel Without a Cause&quot;?',
        q4: 'Gannymede is the largest moon of which planet?',
        q5: 'Which car is the first mass-produced hybrid vehicle?',
        q6: 'What is the name of the 2016 studio album by the French electronic music duo Justice?',
        q7: 'In Touhou: Embodiment of Scarlet Devil, what song plays during Flandre Scarlet&#039;s boss fight?',
        q8: 'How much radiation does a banana emit?',
    },
    options: {
        q1:
        q2:
        q3:
        q4:
        q5:
        q6:
        q7:
        q8:
    },