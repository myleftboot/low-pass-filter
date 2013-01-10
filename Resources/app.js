// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

var noiseAttenuation = 3;
var accelerometerMinStep = 0.02;
var filterConstant = 0.2;

var alpha     = 0;
var lastValue = 0;

clamp = function(val) {
	if (val > 1) return 1
	if (val < 0) return 0;
	return val;
}

lowPassFilter = function(val)
{
    var diff = clamp(Math.abs(lastValue - val) / accelerometerMinStep);
    
    alpha = (1.0 - diff) * filterConstant / noiseAttenuation + diff * filterConstant
    
    lastValue = val * alpha + lastValue * (1.0 - alpha);
    
    return lastValue;
}
//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
});

var layout = Ti.UI.createView({layout: 'vertical'});

var rawSlider = Ti.UI.createSlider({max: 2
	                               ,min:-2});
var lowSlider = Ti.UI.createSlider({max: 2
	                               ,min:-2});
var truncSlider = Ti.UI.createSlider({max: 2
	                               ,min:-2});
var rawLabel = Titanium.UI.createLabel({});
var lowLabel = Titanium.UI.createLabel({});
var truncLabel = Titanium.UI.createLabel({});

layout.add(rawSlider);
layout.add(rawLabel);
layout.add(lowSlider);
layout.add(lowLabel);
layout.add(truncSlider);
layout.add(truncLabel);
win1.add(layout);

updateSliders = function(e)  {
	var raw = Math.atan(e.z/e.y);
	var low = lowPassFilter(raw);
	rawLabel.text = 'raw '+parseFloat(raw).toFixed(4);
	rawSlider.value = raw;
	lowLabel.text =  'low '+parseFloat(low).toFixed(4);
	lowSlider.value = low;
	truncLabel.text =  'truncated '+parseFloat(raw).toFixed(1);
	truncSlider.value = parseFloat(raw).toFixed(1);
};

Ti.Accelerometer.addEventListener('update', updateSliders);

win1.open();
