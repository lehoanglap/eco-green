$(document).ready(function () {
  $(".close").click(function (e) { 
    e.preventDefault();
    $(".alert").addClass("alert1");
    
    
  });
    anime({
        targets: '#svg2',
        translateX: -45,
        translateY: -70,
        rotate: '1turn',
        
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: true,
        duration: 30000
      });

      anime({
        targets: '#svg1',
        translateX: -45,
        translateY: -55,
        rotate: '0.1turn',
        
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: true,
        duration: 30000
      });
      
});

