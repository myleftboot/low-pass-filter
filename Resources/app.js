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
});

var layout = Ti.UI.createView({layout: 'vertical'});

var rawSlider = Ti.UI.createSlider({max: 2
	                               ,min:-2});
var butterSlider = Ti.UI.createSlider({max: 2
	                               ,min:-2});
var lowSlider = Ti.UI.createSlider({max: 2
	                               ,min:-2});
var truncSlider = Ti.UI.createSlider({max: 2
	                               ,min:-2});
var rawLabel = Titanium.UI.createLabel({});

var butterLabel = Titanium.UI.createLabel({});

var lowLabel = Titanium.UI.createLabel({});
var truncLabel = Titanium.UI.createLabel({});
layout.add(rawSlider);
layout.add(rawLabel);
layout.add(butterSlider);
layout.add(butterLabel);
layout.add(lowSlider);
layout.add(lowLabel);
layout.add(truncSlider);
layout.add(truncLabel);
win1.add(layout);

ButterworthLowPassFilter();

updateSliders = function(e)  {
	var raw = Math.atan(e.z/e.y);
	var butter = Filter(raw)
	var low = lowPassFilter(raw);
	rawLabel.text = 'raw '+parseFloat(raw).toFixed(4);
	rawSlider.value = raw;
	butterLabel.text = 'butterworth '+parseFloat(butter).toFixed(4);
	butterSlider.value = butter;
	lowLabel.text =  'low '+parseFloat(low).toFixed(4);
	lowSlider.value = low;
	truncLabel.text =  'truncated '+parseFloat(raw).toFixed(1);
	truncSlider.value = parseFloat(raw).toFixed(1);
};

Ti.Accelerometer.addEventListener('update', updateSliders);

win1.open();
