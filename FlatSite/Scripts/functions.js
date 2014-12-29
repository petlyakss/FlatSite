function ViewForgotDiv()
{
	el = document.getElementById('divforgot');
	if (el.style.display == 'none')
		el.style.display  = "block";
	else	
		el.style.display  = "none";

}

function ChangeLang()
{
	document.changeLang.submit();
}

function MakeOn(url)
{
//	var expand = document.getElementById('expand');
//	url = url+"&expand="+expand.value;
	location.href=url;
}

function open_window(url)
{
	cwin = window.open(url,"attach","width=350,height=400,toolbar=no,resizable=yes");
}

function ViewResume(id)
{
	var targetId = "res"+id;
	var buf = document.getElementById(targetId);
	if (buf.style.visibility == "")
	{
		buf.style.visibility = "hidden";
		buf.style.display = "none";		
	}
	else 
	{
		buf.style.visibility = "";
		buf.style.display = "";		
	}
}

var done = 0;
function Upload(id, module)
{
	document.getElementById('bs').disabled = true;
	document.getElementById('br').disabled = true;
	document.getElementById('info_'+id).innerHTML = "Loading...";
	done = 1;
	var upl = document.getElementById(id);
	setTimeout('checkUpload(\''+id+'\')', 1000);
	JsHttpRequest.query('include/upload.php',{upl: upl, module: module}, 
	function(result, errors) {UploadDone(result, id);}, true);
	return false;
}

function UploadDone(result, id)
{
	done = 0;
	var temp = new Array();
	temp = result.split('#');
	var res = document.getElementById('info_'+id);
	if (temp[0] == "-2")
	{
		alert('Файл с таким именем уже существует на сервере! Будет подключен существующий');	
		res.innerHTML = 'Файл с таким именем уже существует на сервере! Будет подключен существующий';
		document.getElementById('hidden_'+id).value = temp[1];		
	}
	else if (temp[0] == "-1")
	{
		alert('При загрузке файла на сервер возникла ошибка! Попробуйте еще раз!');	
		res.innerHTML = 'При загрузке файла на сервер возникла ошибка! Попробуйте еще раз!';
	}
	else
	{	
		document.getElementById('hidden_'+id).value = temp[1];		
		res.innerHTML = 'Файл успешно загружен!';
	}
	document.getElementById('bs').disabled = false;
	document.getElementById('br').disabled = false;	
}

function checkUpload(id)
{
	JsHttpRequest.query('include/checkUpload.php',{}, 
	function(result, errors) {checkUploadDone(result, id);}, true);
	return false;
}

function checkUploadDone(result, id)
{
	if (done == 1)
	{
		document.getElementById('info_'+id).innerHTML = result;	
		setTimeout('checkUpload(\''+id+'\')', 2000);
	}
}

function clearFile()
{
//	var f = document.forms[0] 
	var f = document.getElementById('form1');
	for (var i=0;i<f.elements.length; i++) 
	{ 		
		if (f.elements[i].type == "file")
		{
			var temp = new Array();
			temp = f.elements[i].name.split('_');
			if (temp[0] == "file")
				f.elements[i].disabled = true;				
		}
	}
}

function setOC(id)
{
	set_visibleSelf('tr_'+id);
	var buf = document.getElementById('aoc_'+id);
	if (buf.innerHTML == text_open)
		set_html('aoc_'+id, text_close);
	else set_html('aoc_'+id, text_open);
}
 
function set_visible(id,show)
{
	var buf = document.getElementById(id);
	if (!buf) return;
	if (show == 1)
	{
		buf.style.visibility = "";
		buf.style.display = "";		
	}
	else 
	{
		buf.style.visibility = "hidden";
		buf.style.display = "none";		
	}
}

function set_visibleSelf(id)
{
	var buf = document.getElementById(id);
	if (!buf) return;
	if (buf.style.display == "none")
	{
		buf.style.visibility = "";
		buf.style.display = "";		
	}
	else 
	{
		buf.style.visibility = "hidden";
		buf.style.display = "none";		
	}
}

function set_html(id,text)
{
	var buf = document.getElementById(id);
	if (buf) buf.innerHTML = text;
}

function set_src(id,src)
{
	var buf = document.getElementById(id);
	if (buf) buf.src = src;
}

function set_href(id,href)
{
	var buf = document.getElementById(id);
	if (buf) buf.href = href;
}

function set_value(id,value)
{
	var buf = document.getElementById(id);
	if (buf) buf.value = value;
}

function get_value(id)
{
	var buf = document.getElementById(id);
	if (buf) return buf.value;
	return false;
}

function swap(id)
{
	pic	= document.getElementById(id);
	if (pic.style.display)
	{
		pic.style.visibility = "";
		pic.style.display = "";		
	}
	else 
	{
		pic.style.visibility = "hidden";
		pic.style.display = "none";		
	}
}

function update_type(result)
{
	if (!result) return;
	set_html('types',result['types']);
}

function select_type(id)
{
	JsHttpRequest.query(
		'/include/core/ajax_file.php',
		{id:id,action:'insert'},
		function(result, errors) {update_type(result);},
		true);
}

function showPopup(table, pid, fname, val, defname, numpage)
{
	var buf = document.getElementById('div_'+fname);
	buf.style.display = "";
	var buf = document.getElementById('div_'+fname);
	buf.innerHTML = '<div style="position: absolute; right: 4px; top: 0px;"><a href="javascript: void(0);" onClick="hidePopup(\''+fname+'\')" style="text-decoration: none;"><b>x</b></a></a></div>Please wait...';	
	JsHttpRequest.query('/include/core/showPopup.php', {table:table,pid:pid,fname:fname,val:val,defname:defname,numpage:numpage}, function(result, errors) {showPopupDone(result, fname);}, true);	
}

function showPopupDone(result, fname)
{
	var buf = document.getElementById('div_'+fname);
	
	buf.innerHTML = result['html'];
}

function showPopupAdd(table, pid, fname, val, defname, numpage, newname)
{
	var buf2 = document.getElementById('newname');
	var newname = buf2.value;
	if (newname)
	{
		var buf = document.getElementById('div_'+fname);
		buf.style.display = "";
		var buf = document.getElementById('div_'+fname);
		buf.innerHTML = '<div style="position: absolute; right: 4px; top: 0px;"><a href="javascript: void(0);" onClick="hidePopup(\''+fname+'\')" style="text-decoration: none;"><b>x</b></a></a></div>Please wait...';		
		JsHttpRequest.query('/include/core/showPopupAdd.php', {table:table,pid:pid,fname:fname,val:val,defname:defname,numpage:numpage,newname:newname}, function(result, errors) {showPopupAddDone(result, table, pid, fname, val, defname, numpage);}, true);	
	}
	else alert(error_popup_enter_name);
}

function showPopupAddDone(result, table, pid, fname, val, defname, numpage)
{
	var buf = document.getElementById('div_'+fname);
	buf.style.display = "";
	var buf = document.getElementById('div_'+fname);
	buf.innerHTML = '<div style="position: absolute; right: 4px; top: 0px;"><a href="javascript: void(0);" onClick="hidePopup(\''+fname+'\')" style="text-decoration: none;"><b>x</b></a></a></div>Please wait...';	
	JsHttpRequest.query('/include/core/showPopup.php', {table:table,pid:pid,fname:fname,val:val,defname:defname,numpage:numpage}, function(result, errors) {showPopupDone(result, fname);}, true);	
}

function hidePopup(fname)
{
	var buf = document.getElementById('div_'+fname);
	buf.style.display = "none";
}

function searchPopup(table, fname, defname, numpage)
{
	var popup_search = document.getElementById('popup_search_'+fname);
	var buf = document.getElementById('div_'+fname);
	buf.innerHTML = '<div style="position: absolute; right: 4px; top: 0px;"><a href="javascript: void(0);" onClick="hidePopup(\''+fname+'\')">x</a></a></div>Please wait...';	
	if (popup_search.value)
		JsHttpRequest.query('/include/core/searchPopup.php', {table:table,fname:fname,popup_search:popup_search.value,defname:defname,numpage:numpage}, function(result, errors) {showPopupDone(result, fname);}, true);	
	else showPopup(table, 0, fname, '', '', 1);
}

function setValuePopup(field,id,text)
{
	obj = document.getElementById(field);

	if ((obj) && (obj.type == "select-one")){
	
		while(obj.options.length > 0) 
			obj.options[0] = null;
			
		var newOpt = document.createElement("OPTION");
		newOpt.text = '<--';
		newOpt.value = '';
		obj.options.add(newOpt);
		var newOpt = document.createElement("OPTION");
		newOpt.text = text;
		newOpt.value = id;
		obj.options.add(newOpt);
			
		obj.selectedIndex = 1;
		document.getElementById('div_'+field).style.display = "none";
	}	
	else
		if ((obj) && (obj.type == "select-multiple")){	
			var i = 0;
			while(i <= (obj.options.length-1)){ 
				if (obj.options[i].value == id){
						obj.options[i].selected = true;

						break;
				}		
				i = i + 1;
			}	
			if (i == obj.options.length){
				var newOpt = document.createElement("OPTION");
				newOpt.text = text;
				newOpt.value = id;
				newOpt.selected = true;

				obj.options.add(newOpt);
			}
		}	
		else
			document.getElementById('div_'+field).style.display = "none";
	return false;		
}	

function deleteValuePopup(field,id){
	obj = document.getElementById(field);
		if ((obj) && (obj.type == "select-multiple")){						
			var i = 0;
			while(i <= (obj.options.length-1)){ 
				if (obj.options[i].value == id){
						obj.options[i] = null;
						break;
				}		
				i = i + 1;
			}	
	}		
	else if ((obj) && (obj.type == "select-one"))			
	{
		while(obj.options.length > 0) 
			obj.options[0] = null;
			
		var newOpt = document.createElement("OPTION");
		newOpt.text = '<--';
		newOpt.value = '0';	
		newOpt.selected = true;
		obj.options.add(newOpt);
		document.getElementById('div_'+field).style.display = "none";
	}
	return false;
}

function myBookmark(a) 
{  
	var ua = navigator.userAgent.toLowerCase();
	var isIE = (ua.indexOf("msie") != -1 && ua.indexOf("opera") == -1 && ua.indexOf("webtv") == -1);
	var isOpera = (ua.indexOf("opera") != -1);

	if (isOpera && window.print)
	{  
		var mbm = a;  
		mbm.setAttribute("rel", "sidebar");  
		mbm.setAttribute("title", document.title);  
		mbm.setAttribute("href", window.location.href);  
		mbm.click();  
	}  
	else if (window.sidebar) 
	{  
		window.sidebar.addPanel(document.title, window.location.href, "");  
	}  
	else if(isIE) 
	{ 
		window.external.AddFavorite(window.location.href, document.title);  
	}  
	else  
	{ 
		alert('You need to press Ctrl + D to bookmark our site.'); 
	}
	return false;
} 

var ua = navigator.userAgent.toLowerCase();
var isOpera = (ua.indexOf('opera')  > -1);
var isIE = (!isOpera && ua.indexOf('msie') > -1);
 
function getDocumentHeight() 
{
  return Math.max(document.compatMode != 'CSS1Compat' ? document.body.scrollHeight : document.documentElement.scrollHeight, getViewportHeight());
}
 
function getDocumentWidth() 
{
  return Math.max(document.compatMode != 'CSS1Compat' ? document.body.scrollWidth : document.documentElement.scrollWidth, getViewportWidth());
}
 
function getViewportHeight() 
{
  return ((document.compatMode || isIE) && !isOpera) ? (document.compatMode == 'CSS1Compat') ? document.documentElement.clientHeight : document.body.clientHeight : (document.parentWindow || document.defaultView).innerHeight;
}
 
function getViewportWidth() 
{
  return ((document.compatMode || isIE) && !isOpera) ? (document.compatMode == 'CSS1Compat') ? document.documentElement.clientWidth : document.body.clientWidth : (document.parentWindow || document.defaultView).innerWidth;
}

function showBack()
{
	var buf = document.getElementById('backlayer');
	var size_height = getDocumentHeight();
	buf.style.height = size_height+"px";
	buf.style.zIndex = 100;
	buf.style.display = "";
}

function hideBack()
{
	var buf = document.getElementById('backlayer');
	buf.style.display = "none";
}

function changeGroupDopImg(id, img)
{
	var bufm = document.getElementById('delgroupdopimg');
	var target = "dopimg_"+id;
	var buf = document.getElementById(target);
	if (buf.checked)
		bufm.value = bufm.value+"#"+img;
	else bufm.value = bufm.value.replace('#'+img, '');	
}

function changeGroupUpdates(id, color)
{
	var bufm = document.getElementById('groupupdates');	
	var target = "rec_"+id;
	var buf = document.getElementById(target);
	if (buf.checked)	
	{
		bufm.value = bufm.value+"#"+id;
		for(var i=1; i<=td_id; i++)
			document.getElementById('td_'+id+'_'+i).style.backgroundColor = "#ffcc99";		
	}
	else 
	{
		bufm.value = bufm.value.replace('#'+id, '');	
		for(var i=1; i<=td_id; i++)
			document.getElementById('td_'+id+'_'+i).style.backgroundColor = color;		
	}
}

function changeGroupUpdatesTD(id, color)
{
	var target = "rec_"+id;
	var buf = document.getElementById(target);
	if (buf.checked)
	{
		buf.checked = false;
		for(var i=1; i<=td_id; i++)
			document.getElementById('td_'+id+'_'+i).style.backgroundColor = color;
	}
	else 
	{
		buf.checked = true;
		for(var i=1; i<=td_id; i++)
			document.getElementById('td_'+id+'_'+i).style.backgroundColor = "#ffcc99";
	}
	changeGroupUpdates(id);
}

function groupupdateSubmit(id)
{
	var buf = document.getElementById('groupupdate_action');
	buf.value = id;
	var buf = document.getElementById('groupupdate');
	buf.submit();
}

function myCheckAll()
{
	var buf = document.getElementById('mycheckall');
	var bufm = document.getElementById('groupupdates');
	bufm.value = "";
	var scolor = "#ffffff";
	for (var i=0; i<recs.length; i++)
	{
		var target = "rec_"+recs[i];
		var buf2 = document.getElementById(target);
		buf2.checked = buf.checked;		
		if (buf.checked && (buf2.value == 1))
			bufm.value = bufm.value+"#"+recs[i];					
		
		for(var j=1; j<=td_id; j++)
		{
			if (buf.checked)
				document.getElementById('td_'+recs[i]+'_'+j).style.backgroundColor = "#ffcc99";			
			else document.getElementById('td_'+recs[i]+'_'+j).style.backgroundColor = scolor;			
		}
		if (scolor == "#ffffff")
			scolor = "#dfdfff";
		else scolor = "#ffffff";		
	}
}

function myCheckAllDop()
{	
	var bufm = document.getElementById('delgroupdopimg');
	bufm.value = "";	
	var buf = "";
	for (var i=0; i<recsdop.length; i++)
	{
		var target = "dopimg_"+recsdop[i];
		var buf2 = document.getElementById(target);
		if (i == 0)
		{
			if (buf2.checked)
				buf = false;
			else buf = true;
		}
		buf2.checked = buf;		
		if (buf && (buf2.value == 1))
		{
			bufm.value = bufm.value+"#"+document.getElementById('img_dopimg_'+recsdop[i]).value;
		}
	}
}

function goPage()
{
	var url = mainurl;
	var buf = document.getElementById('numpage');
	if (buf.value)		
	{
		url = url+"&page="+buf.value;	
		location.href = url;
	}
}