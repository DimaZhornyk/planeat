import React, {useState} from "react"
import {Card, Slider} from "antd";
import SliderTooltip from "../tooltip/SliderTooltip";

const getFilterRange = (recipes, getParamFunction) => {
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < recipes.length; i++) {
        let param = getParamFunction(recipes[i]);
        if (param < min) min = param;
        if (param > max) max = param;
    }

    return {
        min, max
    };
};

function SliderFilter({
                          recipes,
                          optionName,
                          filter,
                          getParamFunction,
                          units
                      }) {

    const range = getFilterRange(recipes, getParamFunction);

    const [minValue, setMinValue] = useState(range.min);
    const [maxValue, setMaxValue] = useState(range.max);

    function onChange(value) {
        setMinValue(value[0]);
        setMaxValue(value[1]);
        console.log('onChange: ', value);
    }

    function onAfterChange(value) {
        console.log('onAfterChange: ', filter);
        filter(minValue, maxValue);
    }

    return (
        <Card>
            <div style={{display: "flex", alignItems: "center", width: "100%"}}>
                <span style={{display: "block", width: "25%"}}>
                    {optionName}
                </span>
                <Slider
                    range
                    step={1}
                    defaultValue={[range.min, range.max]}
                    min={range.min}
                    max={range.max}
                    onChange={onChange}
                    onAfterChange={onAfterChange}
                    tipFormatter={value => <SliderTooltip value={value + " " + units}/>}
                    style={{display: "block", width: "75%", height: "100%"}}
                />
            </div>
        </Card>
    )
}

export default SliderFilter;