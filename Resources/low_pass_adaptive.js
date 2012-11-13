
(function()
{

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

})();