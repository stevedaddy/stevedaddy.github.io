(function(){
  var createClock  = function  createClock(elemClass, elemTime, elemFace){
      clock = jQuery(elemClass).FlipClock(elemTime, {
          countdown: true,
          autoStart: true,
          clockFace: elemFace
      });
      return clock;
    }
}());