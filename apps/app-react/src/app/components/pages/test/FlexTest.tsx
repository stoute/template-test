import React, {CSSProperties} from "react";
import {Flex} from '@bsmp/react';

const ImageStyle: CSSProperties = {
  width: 65,
  height: 65,
  borderRadius: 65
}

const Message: CSSProperties = {
  fontSize: 14,
}

const NameStyle: CSSProperties = {
  margin: 0
}

const DateStyle: CSSProperties = {
  margin: 0,
  color: 'grey',
  fontWeight: 'normal'
}

export default function FlexTest() {
  return (
    <>
      <MessageWithFlex/>
      <MessageNoFlex/>
    </>
  );
}

const MessageWithFlex = () => (
  <Flex container width="300px" margin="32px auto">
    <img
      style={ImageStyle}
      src="https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg"
      alt="Profile"
    />
    <Flex flex={'1'} margin="0 0 0 16px">
      <Flex container justifyContent="space-between">
        <h4 style={NameStyle}> John Doe </h4>
        <h5 style={DateStyle}> 5 Hours Ago </h5>
      </Flex>
      <p style={Message}>
        This message DOES the Flex component.
      </p>
    </Flex>
  </Flex>
)

const CardContainerStyle = {
  width: 300,
  margin: '32px auto',
  borderRadius: 5,
  display: 'flex',
}

const RightColumn = {
  flex: 1,
  marginLeft: 16
}

const NameAndDate = {
  display: 'flex',
  justifyContent: 'space-between',
}

const MessageNoFlex = () => (
  <div style={CardContainerStyle}>
    <img
      style={ImageStyle}
      src="https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg"
      alt="Profile"
    />
    <div style={RightColumn}>
      <div style={NameAndDate}>
        <h4 style={NameStyle}> John Doe </h4>
        <h5 style={DateStyle}> 5 Hours Ago </h5>
      </div>
      <p style={Message}>
        This message  not use the Flex component.
      </p>
    </div>
  </div>
)
