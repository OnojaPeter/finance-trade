$(document).ready(function(){
    const owl = $('.owl-carousel');
    owl.owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            640: {
                items: 2
            },
            1024: {
                items: 3
            }
        }
    });

    $('.custom-next').click(function() {
        owl.trigger('next.owl.carousel');
    });

    $('.custom-prev').click(function() {
        owl.trigger('prev.owl.carousel');
    });
});