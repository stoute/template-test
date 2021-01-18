import React from 'react';
import { Flex, Icon, IconButton, iconSizes } from '@bsmp/react';
import { Css } from '@bsmp/core';
import { IoAddCircle } from 'react-icons/io5';
import EntityViewer from '../../common/EntityViewer';

export default function IconTest() {
  const renderIcons = (name) => {
    return Object.keys(iconSizes).map((key) => (
      <Icon name={name} size={String(iconSizes[key]) + 'px'} />
    ));
  };
  const renderIconButtons = (
    name,
    padding = 0,
    margin = 0,
    backgroundColor = Css.getVar('bsm-gray-300')
  ) => {
    return Object.keys(iconSizes).map((key) => (
      <IconButton
        name={name}
        padding={padding}
        margin={margin}
        size={String(iconSizes[key]) + 'px'}
        backgroundColor={backgroundColor}
      />
    ));
  };
  const renderIconButtonsChildren = (
    name,
    padding = 0,
    margin = 0,
    backgroundColor = Css.getVar('bsm-gray-300')
  ) => {
    return Object.keys(iconSizes).map((key) => (
      <IconButton
        padding={padding}
        margin={margin}
        size={String(iconSizes[key]) + 'px'}
        backgroundColor={backgroundColor}
      >
        <IoAddCircle size={String(iconSizes[key]) + 'px'} />
      </IconButton>
    ));
  };

  return (
    <>
      <Flex
        container
        className={''}
        flexDirection={'row'}
        padding={'0'}
        alignItems={'center'}
        justifyContent={'space-around'}
      >
        {renderIcons('layers-outline')}
        {renderIconButtons('layers-outline', 0, 0)}
      </Flex>
      <Flex
        container
        className={''}
        flexDirection={'column'}
        padding={'0'}
        alignItems={'center'}
        justifyContent={'space-around'}
      >
        {renderIconButtonsChildren(undefined, 0, 0)}
        {renderIconButtonsChildren(undefined, 0, 0, 'transparent')}
      </Flex>
    </>
  );
}
