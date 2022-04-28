import React, { FC } from 'react';

import { CartWrapper } from './CartWrapper';
import { AuthWrapper } from './AuthWrapper';

const AppWrapper: FC = ({ children }) => {
  return (
    <CartWrapper>
      <AuthWrapper>{children}</AuthWrapper>
    </CartWrapper>
  );
};

export default AppWrapper;
