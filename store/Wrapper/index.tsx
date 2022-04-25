import React, { FC } from 'react';

import { CartWrapper } from './CartWrapper';
import { AuthWrapper } from './AuthWrapper';

const AppWrapper: FC = ({ children }) => {
  return (
    <AuthWrapper>
      <CartWrapper>{children}</CartWrapper>
    </AuthWrapper>
  );
};

export default AppWrapper;
