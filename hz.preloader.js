/**
 * Created by HAMZA on 28/02/2017.
 */
(function ( $ ) {
    var CurrentColor=0;
    var Colors=['#51BBA7','#F44336', '#9C27B0', '#E91E63'];
    var trigger=false;

    function initializ(container){
        $("head").append('<style type="text/css"></style>');
        var newStyleElement = $("head").children(':last');
        newStyleElement.html('@keyframes loading {0% {transform: rotate(0);}100% {transform: rotate(360deg);}}' +
            '@keyframes loading-circle {0% {stroke-dashoffset: 10;}100% {stroke-dashoffset: -800;}}');
        container.append('<div id="loading-container">' +
            '<svg id="load" x="0px" y="0px" viewBox="0 0 150 150">' +
            '<circle id="loading-inner" cx="75" cy="75" r="60"/>' +
            '</svg>'+
            '</div>');

        $('#load').css({
            width: '50px',
            animation: 'loading 3s linear infinite'
        });

        $('#loading-inner').css({
            'stroke-dashoffset': '0',
            'stroke-dasharray': '450',
            'stroke-width': '10',
            'stroke-miterlimit': '10',
            'stroke-linecap': 'round',
            'animation': 'loading-circle 2s linear infinite',
            'stroke': '#E91E63',
            'fill': 'transparent'
        });
        $('#loading-container').css({
            'display': 'none',
            'position': 'fixed',
            'height': '50px',
            'width': '50px',
            'margin': '0 auto',
            'top': '5%',
            'left': '48%'
        });
    }
    function Coloriz(){



        $('#loading-inner').css({
            'stroke': Colors[CurrentColor]

        });
        setTimeout(Coloriz, 2000);
        if(CurrentColor<3){CurrentColor++;}else{CurrentColor=0;}
    }





    $.fn.hzPreloader = function( options ) {

        // default options fi7alat ma.
        var settings = $.extend({
            container: "body",
            auto: true
        }, options );


        if(!exists()){
            initializ(this);
            trigger=settings.auto;

        }



        if(options=='show'){
            $('#loading-container').show();
            return this;
        }else if(options=='hide'){
            $('#loading-container').fadeOut('slow').remove();
            return this;
        }








        setTimeout(Coloriz, 1000);
        if (trigger){ $('#loading-container').show();}
        return this;
    };


    function exists(){
        return (this.find('#loading-container').length>0)
    }

}( jQuery ));
