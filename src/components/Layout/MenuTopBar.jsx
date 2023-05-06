import React from 'react';
import { Box, styled, Menu } from '@mui/material';
import { useState } from 'react';

const MenuButton = styled(Box)(() => ({
  display: 'inline-block',
  color: 'rgba(52, 49, 76, 1)',
  '& div:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

const MenuTopBar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const children = React.Children.toArray(props.children);
  let { shouldCloseOnItemClick = true, horizontalPosition = 'left' } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MenuButton onClick={handleClick}>{props.menuButton}</MenuButton>

      <Menu
        elevation={8}
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: horizontalPosition,
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: horizontalPosition,
        }}
      >
        {children.map((child, index) => (
          <div onClick={shouldCloseOnItemClick ? handleClose : () => {}} key={index}>
            {child}
          </div>
        ))}
      </Menu>
    </>
  );
};

export default MenuTopBar;
