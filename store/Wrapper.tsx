import React, { FC } from 'react';

import { CartWrapper } from './cart';
import { AuthWrapper } from './auth';

const AppWrapper: FC = ({ children }) => {
  return (
    <CartWrapper>
      <AuthWrapper>{children}</AuthWrapper>
    </CartWrapper>
  );
};

export default AppWrapper;
