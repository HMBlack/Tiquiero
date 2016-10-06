function startMove(obj, json, fnEnd)
{
	if(obj.timer)
	{
		clearInterval(obj.timer);
	}
	obj.timer=setInterval(function (){
		doMove(obj, json, fnEnd);
	}, 30);
	
	var oDate=new Date();
	
	if(oDate.getTime()-obj.lastMove>30)
	{
		doMove(obj, json, fnEnd);
	}
}

function getStyle(obj, attr)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj, false)[attr];
	}
}

function doMove(obj, json, fnEnd)
{
	var iCur=0;
	var attr='';
	var bStop=true;	//假设运动已经该停止了
	
	for(attr in json)
	{
		if(attr=='opacity')
		{
			iCur=parseInt(100*parseFloat(getStyle(obj, 'opacity')));
		}
		else
		{
			iCur=parseInt(getStyle(obj, attr));
		}
		
		if(isNaN(iCur))
		{
			iCur=0;
		}
		
		var iSpeed=(json[attr]-iCur)/8;
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		
		if(parseInt(json[attr])!=iCur)
		{
			bStop=false;
		}
		
		if(attr=='opacity')
		{
			obj.style.filter="alpha(opacity:"+(iCur+iSpeed)+")";
			obj.style.opacity=(iCur+iSpeed)/100;
		}
		else
		{
			obj.style[attr]=iCur+iSpeed+'px';
		}
	}
	
	if(bStop)
	{
		clearInterval(obj.timer);
		obj.timer=null;
		
		if(fnEnd)
		{
			fnEnd();
		}
	}
	
	obj.lastMove=(new Date()).getTime();
}


function minibar(){
    var oBtn = document.getElementById('mini_btn');
    var oBottom = document.getElementById('mini_bottom');
    var oBox = document.getElementById('mini_box');
    var oBtnClose = document.getElementById('mini_btn_close');

    oBtn.onclick = open;

    function open()
    {
        startMove(oBottom, {right: 0}, function (){
            oBox.style.display = "block";
            startMove(oBox, {bottom: 0});
        });

        oBtn.onclick = close;
    }

    oBtnClose.onclick = close;

    function close()
    {
        startMove(oBox, {bottom: -315}, function (){
            oBox.style.display = "none";
            startMove(oBottom, {right: -165});
        });

        oBtn.onclick = open;
    }
}

window.onload = function(){
    minibar();
    alert();
}