import React from 'react';
import { SketchPicker } from 'react-color';

const ColorPicker = ({ color, onChange }) => {
    return (
        <SketchPicker
            color={color}
            onChangeComplete={(color) => onChange(color.hex)}
        />
    );
};

export default ColorPicker;