import { React, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import convert from 'color-convert';
import axios from 'axios';

const pickerSize = 300;

function ColorPicker() {
  const picker = useRef();
  const pickerPointer = useRef();
  const dmxtra = useRef();
  const groupButtons = useRef();

  const [groups, setGroups] = useState([]);
  const [activeGroupId, setActiveGroupId] = useState();

  const getGroups = () => axios.get('/universes/1/groups')
    .then((res) => {
      setGroups(res.data);
      return res.data;
    });

  useEffect(() => {
    getGroups()
      .then((data) => setActiveGroupId(data[0]?.id));
  }, []);

  useEffect(() => {
    if (groupButtons.current.querySelector('.inactiveGroup')) {

      groupButtons.current.querySelector('.inactiveGroup').style.backgroundColor = 'transparent';
      groupButtons.current.querySelector('.activeGroup').style.backgroundColor = `rgba(255,255,255,0.4)`;

    }
  }, [activeGroupId]);

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
    axios.put(`/universes/1/groups/${activeGroupId}/transmit`, {
      red: rgb[0],
      green: rgb[1],
      blue: rgb[2],
    });

    document.body.style.backgroundColor = color;
    dmxtra.current.style.color = color;
    pickerPointer.current.style.backgroundColor = color;
    groupButtons.current.querySelector('.activeGroup').style.backgroundColor = `hsla(${deg}, 100%, ${lightness}%, 0.3)`;
    groupButtons.current.querySelector('.activeGroup > *').style.backgroundColor = color;
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

  const handleOff = (e) => {
    e.preventDefault();
    axios.put(`/universes/1/groups/${activeGroupId}/off`);
  };

  const handleGroupSelection = (id) => {
    setActiveGroupId(id);
  };

  return (
    <Controller>
      <Title ref={dmxtra}>MNMT</Title>
      <PickerWrapperWrapper>
        <PickerWrapper>
          <Picker ref={picker} onMouseDown={(e) => handleColorPress(e)}>
            <HueLayer />
            <LightnessLayer />
            <Pointer ref={pickerPointer} />
          </Picker>
        </PickerWrapper>
      </PickerWrapperWrapper>
      {/* <OffButton onClick={(e) => handleOff(e)}>Off</OffButton> */}
      <GroupButtons ref={groupButtons}>
        {groups.map((group) => (
          <GroupButton
            className={activeGroupId === group.id ? 'activeGroup' : 'inactiveGroup'}
            onClick={() => handleGroupSelection(group.id)}
            key={group.id}
            red={group.red}
            green={group.green}
            blue={group.blue}
            brightness={group.brightness / 255}
          >
            <GroupSwatch />
            {group.name}
          </GroupButton>
        ))}
      </GroupButtons>
    </Controller>
  );
}

const Title = styled.h1`
  font-size: 4em;
  text-align: center;
  color: white;
  margin-top: 20px;
`;

const PickerWrapperWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const GroupSwatch = styled.span`
  display: inline-block;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0px 8px 20px rgba(47, 47, 47, 0.58);
`;

const GroupButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  position: absolute;
  bottom: 20px;
`;

const GroupButton = styled.div`
  width: 100px;
  height: 130px;
  margin: 5px;
  border-radius: 10px;
  color: white;
  padding: 5px;
  background-color: rgba(${(props) => (props.red + ', ' + props.green + ', ' + props.blue + ', 0.5')});
  & > ${GroupSwatch} {
    background-color: rgba(${(props) => (props.red + ', ' + props.green + ', ' + props.blue)});
  }
  box-shadow: 0px 8px 20px rgba(47, 47, 47, 0.58);
  text-align: center;
  padding-top: 10px;
  &:hover > ${GroupSwatch} {
    transform: scale(1.03);
    transition: transform 0.1s ease-in-out;
  }
  &:active > ${GroupSwatch} {
    transform: scale(0.98);
    transition: transform 0.1s ease-in-out;
  }
`;

const OffButton = styled.button`
`;

const Controller = styled.section`
  position: absolute;
  background-color: #222;
  top: 12px;
  bottom: 12px;
  left: 12px;
  right: 12px;
  border-radius: 5px;
  /* display: flex;
  align-items: center;
  justify-content: center; */
`;

const Pointer = styled.span`
  width: 50px;
  height: 50px;
  top: 30%;
  left: 30%;
  position: absolute;
  display: inline-block;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0px 8px 10px rgba(47, 47, 47, 0.38);
`;

const PickerWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 300px;
  height: 300px;
  margin-top: 20px;
`;

const Picker = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0px 8px 30px rgba(47, 47, 47, 0.38);
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
