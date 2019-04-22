jQuery(document).ready(function($){
  var animationDelay = 1500,
    revealDuration = 1600,
    revealAnimationDelay = 1500;

  initHeadline();

  function initHeadline() {
    animateHeadline($(".cd-headline"));
  }

  function animateHeadline($headlines) {
    var duration = animationDelay;
    $headlines.each(function(){
      var headline = $(this);

      var spanWrapper = headline.find(".cd-words-wrapper"),
        newWidth = spanWrapper.width() + 10;
      spanWrapper.css("width", newWidth);

      //trigger animation
      setTimeout(function(){ hideWord( headline.find(".is-visible").eq(0) ); }, duration);
    });
  }

  function hideWord($word) {
    var nextWord = takeNext($word);

    if($word.parents(".cd-headline").hasClass("clip")) {
      $word.parents(".cd-words-wrapper").animate({ width : "2px" }, revealDuration, function(){
        switchWord($word, nextWord);
        showWord(nextWord);
      });
    } else {
      switchWord($word, nextWord);
      setTimeout(function(){ hideWord(nextWord); }, animationDelay);
    }
  }

  function showWord($word) {
    if($word.parents(".cd-headline").hasClass("clip")) {
      $word.parents(".cd-words-wrapper").animate({ "width" : $word.width() + 10 }, revealDuration, function(){
        setTimeout(function(){ hideWord($word); }, revealAnimationDelay);
      });
    }
  }

  function takeNext($word) {
    return (!$word.is(":last-child")) ? $word.next() : $word.parent().children().eq(0);
  }

  function switchWord($oldWord, $newWord) {
    $oldWord.removeClass("is-visible").addClass("is-hidden");
    $newWord.removeClass("is-hidden").addClass("is-visible");
  }
});
