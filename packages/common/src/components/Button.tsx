import React from 'react';
import { Button, Text } from '../styled';
import { ButtonProps } from '../types';

export default ({ title, onPress, bold, backgroundColor, titleColor }: ButtonProps) => (
  <Button activeOpacity={0.8} onPress={onPress} backgroundColor={backgroundColor}>
    <Text style={{ color: titleColor }} bold={bold}>
      {title}
    </Text>
  </Button>
);
