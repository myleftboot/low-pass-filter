// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

Ti.include('butterworth.js');
Ti.include('low_pass_adaptive.js');
//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var label1 = Titanium.UI.createLabel({
	color:'#999',
	text:'Raw',
	borderColor:'black',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:150,
	height:30,
	top:0
});

win1.add(label1);

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'Butter',
	borderColor:'black',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	height:30,
	top:80,
	width:150
});

win1.add(label2);

var label3 = Titanium.UI.createLabel({
	color:'#999',
	text:'Low',
	borderColor:'black',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	height:30,
	top:150,
	width:150
});

win1.add(label3);

ButterworthLowPassFilter();

Ti.API.info('Platform'+Ti.Platform.version);
var ver = Ti.Platform.version
Ti.API.info('Platform'+ver.substring(0, ver.indexOf('.')));

fred = function(e)  {
	var raw = Math.atan(e.z/e.y);
	var pitch = Filter(raw)
	var low = lowPassFilter(raw);
	label1.text = pitch;
	label2.text = raw;
	label3.text =  low;
	
	
	Ti.API.info('Raw :'+raw+' filtered : '+pitch+ ' low '+low);
};
Ti.Accelerometer.addEventListener('update', fred);
//
//  add tabs
//
tabGroup.addTab(tab1);  


// open tab group
tabGroup.open();
