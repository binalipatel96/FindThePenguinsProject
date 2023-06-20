let score = 0, highScore = 0;
let pos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let see = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const tickAudio = new Audio('audio/tick.mp3');
const bombAudio = new Audio('audio/bomb.mp3');
const tadaAudio = new Audio('audio/tada.mp3');

$(document).ready(function () {
    $('.penguin').hide();
    begin();
    $('#resetBtn').click(() => {
        $('.penguin').removeAttr('style');
        $('.penguin').on('click');
        $('#messageBox').css('display', 'none');
        startGame();
        see = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        score = 0;
        $('#usc').text(score);
    });
});

const startGame = () => {
    randomPeng(pos);
    console.log(pos);
    $('.penguin').click(function () {
        let id = $(this).attr('id');

        if (pos[id - 1] != 9) {
            $('#' + id).css('background-image', 'url("images/penguin_' + pos[id - 1] + '.png")');
            score += 1;
            see[id - 1] = 1;
            $(this).off('click');
            tickAudio.play();
            win();
            if (score > highScore) {
                highScore = score;
                $('#highScore').text(highScore);
            }
            $('#usc').text(score);
        } else {
            $('#' + id).css('background-image', 'url("images/yeti.png")');
            bombAudio.play();
            for (let x = 0; x < 9; x++) {
                let id = x + 1;
                if (see[x] == 1) {
                    $('#' + id).animate({ opacity: '0' }, 1000);
                }
            }
            $('.penguin').off('click');
            lost();
        }
    });
};

//executes when user wins the game
const win = () => {
    if (score == 8) {
        $('.penguin').off('click');
        $('#messageBox').css('display', 'block');
        $('#message').html('Congratulations!!');
        $('#yourScore').html('Your score = ' + score);
        tadaAudio.play();
    }
};

//executes when user lost the game
const lost = () => {
    $('#messageBox').css('display', 'block');
    $('#message').html('Yarrrrrrr....Game OVER!!!!');
    $('#yourScore').html('Your score = ' + score);
    $('#usc').text(score);
};

//random penguin
const randomPeng = arg => {
    arg.sort(() => {
        return Math.random() - 0.5;
    });
};

const begin = () => {
    $('.penguin').show();
    startGame();
};
