
(function()
{

    var LowPassOrder = 4;

    var inputValueModifier = [];
    var outputValueModifier = [];
    var inputValue = [];
    var outputValue = [];
    var valuePosition;

    ButterworthLowPassFilter = function()
    {
        inputValueModifier[0] = 0.098531160923927;
        inputValueModifier[1] = 0.295593482771781;
        inputValueModifier[2] = 0.295593482771781;
        inputValueModifier[3] = 0.098531160923927;

        outputValueModifier[0] = 1.0;
        outputValueModifier[1] = -0.577240524806303;
        outputValueModifier[2] = 0.421787048689562;
        outputValueModifier[3] = -0.0562972364918427;
    }

    Filter = function(val)
    {
        if (!inputValue && !outputValue)
        {
            inputValue = [];
            outputValue = [];

            valuePosition = -1;

            for (i=0; i < LowPassOrder; i++)
            {
                inputValue[i] = val;
                outputValue[i] = val;
            }

            return inputValue;
        }
        else if (inputValue && outputValue)
        {
            valuePosition = IncrementLowOrderPosition(valuePosition);

            inputValue[valuePosition] = val;
            outputValue[valuePosition] = 0;

            var j = valuePosition;

            for (i = 0; i < LowPassOrder; i++)
            {
                    outputValue[valuePosition] += inputValueModifier[i] * inputValue[j] - outputValueModifier[i] * outputValue[j];

                    j = DecrementLowOrderPosition(j);
            }

            return outputValue[valuePosition];
        }
    }

    DecrementLowOrderPosition = function(j)
    {
        if (--j < 0)
        {
            j += LowPassOrder;
        }
        return j;
    }

    IncrementLowOrderPosition = function (position)
    {
        return ((position + 1) % LowPassOrder);
    }

})();