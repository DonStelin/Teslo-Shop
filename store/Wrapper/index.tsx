import React, { FC } from 'react';

import { CartWrapper } from './CartWrapper';

const AppWrapper: FC = ({ children }) => {
  return <CartWrapper>{children}</CartWrapper>;
};

export default AppWrapper;
