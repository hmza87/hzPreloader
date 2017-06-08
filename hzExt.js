hz = function(str){
    var this_;
    var lst_=[];
    var x=[];
    
    if(chnoType(str)=='string'){
        if(str.indexOf(", ")>0){
            var x = str.split(", ")
        }
        
        if(x.length==0){
            lst_ = getDOM(str);
        }else{
            for(i=0;i<x.length;++i){
                var ls = getDOM(x[i]);
                for(h=0;h<ls.length;h++){
                    lst_.push(ls[h]);
                }
            }
        }
        
        this_ = lst_[0];
    }else if(chnoType(str)=='htmlcollection'){
        this_ = str[0];
        lst_ = str;
    }else{
        this_ = str;
        lst_ = [this_];
    }
    
    spanta = {
        css: function(prop){
            this.each(function(e){
                doCss(e, prop);
            });
            
            return hz(lst_);
            
        }
        ,attr: function(prop){
            return this_[prop];
        }
        ,hide: function(){
            this.each(function(e){
                e.style['display']='none';
            });
            
             return hz(lst_);
        }
        ,show: function(){
            this.each(function(e){
                e.style['display']='';
            });
            
             return hz(lst_);
        }
        ,each: function(func){
            for(i=0;i<lst_.length;i++){
                func(lst_[i]);
            }
             return hz(lst_);
        }
        ,append: function(html){
            for(i=0;i<lst_.length;i++){
                lst_[i].innerHTML += html
            }
             return hz(lst_);
        }
        ,html: function(html){
            if(html==null){return this_.innerHTML}
            for(i=0;i<lst_.length;i++){
                lst_[i].innerHTML = html
            }
             return hz(lst_);
        }
        ,children: function(filter){
            if(filter==null){
                return this_.childNodes;

            }else{
                if(filter=='last'){
                    return hz(this_.childNodes[this_.childNodes.length-1]);
                }else if(filter=='first'){
                    return hz(this_.childNodes[0]);
                }
            }
        }
        ,getType:function(){
            return chnoType(this_);            
        }
        
        ,preLoader:function(options){
            hzPreLoader(hz(this_), options);

        }
    }


    function doCss(elem, css){
        
        var obj = elem.id==undefined?getDOM(elem)[0]:elem;
    
        for(i=0;i<Object.keys(css).length;i++){
            obj.style[Object.keys(css)[i]] = css[Object.keys(css)[i]];
            

        }
        return obj;
        
    }

    function getDOM(string){
        if(string.substr(0,1)=='.'){
            return document.getElementsByClassName(string.substr(1, string.length))
        }else if(string.substr(0,1)=='#'){
            return [document.getElementById(string.substr(1, string.length))]
        }else{
            return document.getElementsByTagName(string)

        }
    }
    function chnoType(thing){
        if(thing===null)return "null"; // special case
        return Object.prototype.toString.call(thing).replace('[object ', '').replace(']', '').toLowerCase();
    }






    hzPreLoader=function(cntainer, options){
    var CurrentColor=0,
    Colorz=['#E91E63', '#9C27B0', '#F44336', '#2196F3', '#FF9800'],
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
                '</div>';

    function initializ(container){
        
        hz("head").append('<style type="text/css"></style>');
        var newStyleElement = hz("head").children('last');
        newStyleElement.html(exStyle);
        container.append(exHtml);

        hz('#'+loadID).css({
            width: '50px',
            animation: 'loading 3s linear infinite'
        });

        hz('#'+innerID).css({
            'stroke-dashoffset': '0',
            'stroke-dasharray': '450',
            'stroke-width': '10',
            'stroke-miterlimit': '10',
            'stroke-linecap': 'round',
            'animation': 'loading-circle 2s linear infinite',
            'stroke': '#E91E63',
            'fill': 'transparent'
        });
        hz('#'+containerID).css({
            'display': 'block',
            'position': 'fixed',
            'height': '50px',
            'width': '50px',
            'margin': '0 auto',
            'top': '5%',
            'left': 50-((25*100)/window.innerWidth)+'%'
        });
        setTimeout(Coloriz(), 1000);
        return container;
    }
    function Coloriz(){
            if(CurrentColor<Colorz.length){CurrentColor++;}else{CurrentColor=0;}
            hz('#'+innerID).css({
                'stroke': Colorz[CurrentColor]
                });
            setTimeout(Coloriz, 2000);
        }

        function exists(container){
        
        
        
       
        return (hz('#'+containerID).length>0) && (hz('#'+containerID).parent()==(container==undefined?this:container))
    }
    function randID(LENGTH,PREFIX){
        if(LENGTH==undefined) LENGTH = 5;
        var text = (PREFIX==undefined) ? "hzpl_" : PREFIX;
        for( var i=0; i < LENGTH; i++ )
            text += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 62));
        return text;
    }
    function hzException(message) {
        this.message = message;
        this.name = 'hzPreloaderException';
    }







        // CREATION
            var cnt=0;
            initializ(cntainer);
            
            hz('img, style').each(function(e){
                e.addEventListener("load", function () {
                    cnt--;
                    
                    if(cnt<=0){
                        hz('#'+containerID).hide();
                    }
                });
                cnt++;
                
            });
            

        return cntainer;
}


    return spanta;
}


