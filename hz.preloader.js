/**
 * Created by HAMZA on 28/02/2017.
 */
(function ( $ ) {
    var CurrentColor=0,
    Colorz=[],
    trigger=false,
    loadID=randID(),
    innerID=randID(),
    containerID=randID();

    var exStyle='@keyframes loading {0% {transform: rotate(0);}100% {transform: rotate(360deg);}}' +
                '@keyframes loading-circle {0% {stroke-dashoffset: 10;}100% {stroke-dashoffset: -800;}}';
    var exHtml='<div id="'+containerID+'">' +
                '<svg id="'+loadID+'" x="0px" y="0px" viewBox="0 0 150 150">' +
                '<circle id="'+innerID+'" cx="75" cy="75" r="60"/>' +
                '</svg>'+
                '</div>'





    function initializ(container){
        
        $("head").append('<style type="text/css"></style>');
        var newStyleElement = $("head").children(':last');
        newStyleElement.html(exStyle);
        container.append(exHtml);

        $('#'+loadID).css({
            width: '50px',
            animation: 'loading 3s linear infinite'
        });

        $('#'+innerID).css({
            'stroke-dashoffset': '0',
            'stroke-dasharray': '450',
            'stroke-width': '10',
            'stroke-miterlimit': '10',
            'stroke-linecap': 'round',
            'animation': 'loading-circle 2s linear infinite',
            'stroke': '#E91E63',
            'fill': 'transparent'
        });
        $('#'+containerID).css({
            'display': 'none',
            'position': 'fixed',
            'height': '50px',
            'width': '50px',
            'margin': '0 auto',
            'top': '5%',
            'left': 50-((25*100)/window.innerWidth)+'%'
        });
    }
    function Coloriz(){
        $('#'+innerID).css({
            'stroke': Colorz[CurrentColor]
            });
        setTimeout(Coloriz, 2000);
        if(CurrentColor<3){CurrentColor++;}else{CurrentColor=0;}
    }





    $.fn.hzPreloader = function( options ) {
        // default options fi7alat ma.
        var settings = $.extend({
            container: "body",
            auto: true,
            colors: ['#51BBA7','#F44336', '#9C27B0', '#E91E63']
        }, options );

        Colorz=settings.colors;



        if(!exists()){
            initializ(this);
            trigger=settings.auto;
            }



        if(options=='show'){
            $('#'+containerID).show();
            return this;
        }else if(options=='hide'){
            $('#'+containerID).fadeOut('slow').remove();
            return this;
        }








        setTimeout(Coloriz, 1000);
        if (trigger){ $('#'+containerID).show();}
        return this;
    };


    function exists(){
        return (this.find('#'+containerID).length>0)
    }
    function randID(){
    var text = "hzpl_";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
    }

}( jQuery ));
