/**
 * Created by Sunshine on 16/6/24.
 */

var ph = {};

ph.tools = {};

ph.tools.getByClass = function(oParent,sClass){           //IE不支持getElementsByClassName
    var aEle = oParent.getElementsByTagName('*');
    var arr = [];

    for(var i=0;i<aEle.length;i++)
    {
        if(aEle[i].className == sClass){
            arr.push(aEle[i]);
        }
    }
    return arr;
}

ph.tools.getStyle = function(obj,attr){
    if(obj.currentStyle)
    {
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}


ph.ui = {};

ph.ui.fadeIn = function(obj){
    var iCur = ph.tools.getStyle(obj,'opacity');
    if(iCur == 1) return false;

    var value = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var iSpeed = 2;
        if(value == 100)
        {
            clearInterval(obj.timer);
        }else{
            value += iSpeed;
            obj.style.opacity = value/100;
            obj.style.filter = 'alpha(opacity = '+value+')';
        }
    },50);
}

ph.ui.fadeOut = function(obj){
    var iCur = ph.tools.getStyle(obj,'opacity');
    if(iCur == 0) return false;

    var value = 100;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var iSpeed = -2;
        if(value == 0)
        {
            clearInterval(obj.timer);
        }else{
            value += iSpeed;
            obj.style.opacity = value/100;
            obj.style.filter = 'alpha(opacity = '+value+')';
        }
    },50);
}


ph.app = {};

ph.app.topBanner = function(){
    var gallery = document.getElementById('cont-gallery');
    var aLi = gallery.getElementsByTagName('li');

    var oPrevBg = ph.tools.getByClass(gallery,'prev_bg')[0];
    var oNextBg = ph.tools.getByClass(gallery,'next_bg')[0];
    var oPrev = ph.tools.getByClass(gallery,'prev')[0];
    var oNext = ph.tools.getByClass(gallery,'next')[0];

    //var oPrev = gallery.getElementsByClassName("prev");
    //var oNext =  gallery.getElementsByClassName("next");
    //var oPrevBg = gallery.getElementsByClassName("prev_bg");
    //var oNextBg =  gallery.getElementsByClassName("next_bg");

    var oIndex = document.getElementById('index');
    var iLi = oIndex.getElementsByTagName('li');

    var iNow = 0;
    var timer = setInterval(auto,3500);

    function auto(){
        if(iNow == aLi.length-1)
        {
            iNow = 0;
        }else{
            iNow++;
        }

        for(var i = 0;i<aLi.length;i++)
        {
            ph.ui.fadeOut(aLi[i]);
            iLi[i].className = "";
            iLi[iNow].className = "selected"
        }
        ph.ui.fadeIn(aLi[iNow]);

    }

    function autoPrev(){
        if(iNow == 0)
        {
            iNow = aLi.length-1;
        }else{
            iNow--;
        }

        for(var i = 0;i<aLi.length;i++)
        {
            ph.ui.fadeOut(aLi[i]);
            iLi[i].className = "";
            iLi[iNow].className = "selected"
        }
        ph.ui.fadeIn(aLi[iNow]);

    }

    oPrevBg.onmouseover =function(){
        oPrev.style.display = 'block';
    }
    oPrev.onmouseover = function(){
        oPrev.style.display = 'block';
        clearInterval(timer);
    }
    oPrevBg.onmouseout =function(){
        oPrev.style.display = 'none';
    }
    oPrev.onmouseout = function(){
        oPrev.style.display = 'none';
        timer = setInterval(auto,3500);
    }
    oNextBg.onmouseover =function(){
        oNext.style.display = 'block';
    }
    oNext.onmouseover = function(){
        oNext.style.display = 'block';
        clearInterval(timer);
    }
    oNextBg.onmouseout =function(){
        oNext.style.display = 'none';
    }
    oNext.onmouseout = function(){
        oNext.style.display = 'none';
        timer = setInterval(auto,3500);
    }

    oPrev.onclick = function(){
        autoPrev();
    }

    oNext.onclick = function(){
        auto();
    }
}


window.onload = function(){
    ph.app.topBanner();
}