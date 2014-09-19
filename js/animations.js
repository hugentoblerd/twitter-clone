$(document).ready(function () {
  
  // declares variable to capture message in .tweet-compose
   var newMsg = '';

  // initially hide char count, tweet button, Retweets, timestamp, Reply areas
  $('#tweet-controls').hide();
  $('.stats').hide();
  $('.reply').hide();

  // on click doubles the size of the textarea and shows the char count and tweet button
  $('#main-compose').click(function () {
    $(this).addClass('tweet-compose-tall')
    $('#tweet-controls').show();
  });

// when clicking outside of .tweet-compose
  $('.tweet-compose').on('focusout', function () {
    // if message has nothing in it
    if($(this).val() === '') {
      // resets this size of the textarea
      $(this).removeClass('tweet-compose-tall')
      // hides char count and tweet button
      $('#tweet-controls').hide();
    }
  })

// manipulates char count and tweet-submit button
  $('.tweet-compose').on('keyup', function () {
    // puts text into message variable
    newMsg = $('#main-compose').val();
    // creates char countdown starting at 140
    var remaining = 140 - $('.tweet-compose').val().length;
// updates the char count
    $('#char-count').text(remaining);
// changes the char count to red when < 10 char
    if (remaining <= 10) {
      $('#char-count').css({
        color: 'red'
      })
// changes char count back to normal when > 10 char
    }else {
      $('#char-count').css({
        color: ''
      })
    };
// disables Tweet button
    if (remaining < 0) {
      $('#tweet-submit').prop('disabled', true);
// enables Tweet button
    }else {
      $('#tweet-submit').prop('disabled', false)
    };
  });

// shows/hides Retweets, timestamp, Reply areas when clicked
  $('.tweet').click(function () {
    if ($(this).find('.stats').is(':hidden')) {
      $(this).find('.stats').slideDown('fast');
      $(this).find('.reply').slideDown('fast');
    }else {
      $(this).find('.stats').slideUp('fast');
      $(this).find('.reply').slideUp('fast');
    };
  })

// prepares message to be added as tweet and resets the .tweet-compose element
  $('#tweet-submit').click(function () {
    // creates clone of .tweet container
    var tweetClone = $('.tweet:first-child').clone(true);
    // creates dynamic username, fullname and image
    var currentUsername = $('#user-name').clone(true).text();
    var currentFullname = $('#full-name').clone(true).text();
    var currentImage = $('#user-image').clone(true).attr('src');
    // updates the .tweet container clone to include dynamic username, fullname, image and message
    tweetClone.find('.avatar').attr('src', currentImage);
    tweetClone.find('.fullname').html(currentFullname);
    tweetClone.find('.username').html(currentUsername);
    tweetClone.find('.tweet-text').html(newMsg);
    // adds new tweet with dynamic content to live stream
    $('#stream').prepend(tweetClone)
    // resets .tweet-compose area
    $('#tweet-controls').hide();
    $('#char-count').text(140);
    $('#main-compose').val('');
    $('#main-compose').removeClass('tweet-compose-tall');
  });



});



// var tweetTemplate = '<div class="tweet"><div class="content"><img class="avatar" src="img/damenleeturks.jpg" /><strong class="fullname">New Guy</strong><span class="username">@mybff</span><p class="tweet-text">Today is an amazing day.</p><div class="tweet-actions"><ul><li><span class="icon action-reply"></span> Reply</li><li><span class="icon action-retweet"></span> Retweet</li><li><span class="icon action-favorite"></span> Favorite</li><li><span class="icon action-more"></span> More</li></ul></div><div class="stats"><div class="retweets"><p class="num-retweets">30</p><p>RETWEETS</p></div><div class="favorites"><p class="num-favorites">6</p><p>FAVORITES</p></div><div class="users-interact"><div><img src="img/alagoon.jpg" /><img src="img/vklimenko.jpg" /></div></div><div class="time">1:04 PM - 19 Sep 13</div></div><div class="reply"><img class="avatar" src="img/alagoon.jpg" /><textarea class="tweet-compose" placeholder="Reply to @mybff"/></textarea></div></div></div>'