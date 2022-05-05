import { React, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import convert from 'color-convert';
import axios from 'axios';

const pickerSize = 300;

function ColorPicker() {
  const picker = useRef();
  const pickerPointer = useRef();
  const dmxtra = useRef();

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get('/universes/1/groups')
      .then((res) => setGroups(res.data));
  }, []);

  const placePointer = (e) => {
    const pickerBounds = picker.current.getBoundingClientRect();
    const [x, y] = [e.clientX - pickerBounds.left - 3, e.clientY - pickerBounds.top - 10];
    pickerPointer.current.style.top = `${y}px`;
    pickerPointer.current.style.left = `${x}px`;
  };

  const handleColorSelection = (e) => {
    const pickerBounds = picker.current.getBoundingClientRect();
    const [x, y] = [
      e.clientX - pickerBounds.left - (pickerSize / 2),
      e.clientY - pickerBounds.top - (pickerSize / 2),
    ];
    const rad = Math.atan2(x, y);
    const deg = 180 - Math.round((rad * 180) / Math.PI);
    const distance = Math.sqrt((x * x) + (y * y));
    const lightness = Math.round(100 - (distance / (pickerSize / 100)));
    const color = `hsl(${deg}, 100%, ${lightness}%)`;

    placePointer(e);
    const rgb = convert.hsl.rgb(deg, 100, lightness);
    axios.put('/universes/1/groups/2/transmit', {
      red: rgb[0],
      green: rgb[1],
      blue: rgb[2],
    }).then((res) => console.log(res.status));

    document.body.style.backgroundColor = color;
    dmxtra.current.style.color = color;
    // picker.current.style.borderColor = color;
    pickerPointer.current.style.backgroundColor = color;
  };

  const handleColorPress = (e) => {
    handleColorSelection(e);
    picker.current.addEventListener('mousemove', handleColorSelection);
    picker.current.addEventListener('mouseup', () => {
      picker.current.removeEventListener('mousemove', handleColorSelection);
    });
    picker.current.addEventListener('mouseleave', () => {
      picker.current.removeEventListener('mousemove', handleColorSelection);
    });
  };

  return (
    <Controller>
      <h1 ref={dmxtra}>DMXtra</h1>
      {groups.map((group) => (
        <div key={group.id}>
          {group.name}
        </div>
      ))}
      <PickerWrapper>
        <Picker ref={picker} onMouseDown={(e) => handleColorPress(e)}>
          <HueLayer />
          <LightnessLayer />
          <Pointer ref={pickerPointer} />
        </Picker>
      </PickerWrapper>
    </Controller>
  );
}

const Controller = styled.section`
  position: absolute;
  background-color: #333;
  top: 5px;
  bottom: 5px;
  left: 5px;
  right: 5px;
  border-radius: 5px;
  /* display: flex;
  align-items: center;
  justify-content: center; */
`;

const Pointer = styled.span`
  width: 50px;
  height: 50px;
  position: absolute;
  display: inline-block;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 5px solid white;
  /* background-color: red; */
`;

const PickerWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 300px;
  height: 300px;
`;

const Picker = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 50%;
  border: 5px solid white;
`;

const HueLayer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: conic-gradient(
    from 0deg,
    rgb(255,0,0),
    rgb(255,255,0),
    rgb(0,255,0),
    rgb(0,255,255),
    rgb(0,0,255),
    rgb(255,0,255),
    rgb(255,0,0)
    );
  border-radius: 50%;
`;

const LightnessLayer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: radial-gradient(
    circle closest-side,
    rgb(255,255,255),
    rgba(255,255,255, .75) 35%,
    rgba(255,255,255, .3) 70%,
    transparent 90%
  );
  border-radius: 50%;
`;

export default ColorPicker;
