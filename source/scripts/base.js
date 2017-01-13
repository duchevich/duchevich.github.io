$(document).ready(function() {

	/*---- MASONRY ----*/
      
      var container = document.querySelector('#container');
      var msnry = new Masonry( container, {
      // Настройки
            columnWidth: '.item',
            itemSelector: '.item'
      });
   /*---- WRAP ----*/

      $(function() {
            $('.img').click(function() {
                  if($(this).hasClass('img-ver')){
                        //var wrap = $(this).parent().css('transform');
                        if($(this).parent().css('transform') == 'matrix(1, 0, 0, 1, 0, 0)') {
                              $(this).parent().css({'transform':'rotateX(180deg)'});
                              $(this).parent().css({'box-shadow':'0 -5px 10px rgba(0,0,0,0.5)'});
                        } 
                        else {
                              $(this).parent().css({'transform':'rotateX(0deg)'});
                              $(this).parent().css({'box-shadow':'0 5px 10px rgba(0,0,0,0.5)'});
                        }
                  }
                  else{
                        //var wrap = $(this).parent().css('transform');
                        if($(this).parent().css('transform') == 'matrix(1, 0, 0, 1, 0, 0)') {
                              $(this).parent().css({'transform':'rotateY(180deg)'});
                        } 
                        else {
                              $(this).parent().css({'transform':'rotateY(0deg)'});
                        }
                  }
            });
      });

})