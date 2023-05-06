import { NavLink } from 'react-router-dom';
import { Box, ButtonBase, Icon, styled } from '@mui/material';
import { Paragraph, Span } from '../Typography';
import NavExpansionPanel from './NavExpansionPanel';

const ExtAndIntCommon = {
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '4px',
  height: 44,
  whiteSpace: 'pre',
  marginBottom: '8px',
  textDecoration: 'none',
  justifyContent: 'space-between',
  transition: 'all 150ms ease-in',
  '&:hover': { background: 'rgba(255, 255, 255, 0.08)' },
  '&.compactNavItem': {
    overflow: 'hidden',
    justifyContent: 'center !important',
  },
  '& .icon': {
    fontSize: '18px',
    verticalAlign: 'middle',
  },
};

const ListLabel = styled(Paragraph)(({ theme }) => ({
  fontSize: '12px',
  marginLeft: '24px',
  marginBottom: '10px',
  fontWeight: '600',
  textTransform: 'uppercase',
  color: '#542608',
  display: theme === 'full' ? '' : 'none',
}));

const InternalLink = styled(Box)(() => ({
  '& a': {
    ...ExtAndIntCommon,
    color: '#FFFFFF',
  },
  '& .navItemActive': {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },
}));

const StyledText = styled(Span)(({ theme }) => ({
  fontSize: '0.875rem',
  paddingLeft: '0.8rem',
  lineHeight: '1.5',
  display: theme === 'full' ? '' : 'none',
}));

const SideNav = ({ item, theme }) => {
  const renderNavigation = (data) => {
    return data.map((item, index) => {
      if (item.type === 'label')
        return (
          <ListLabel theme={theme} key={index}>
            {item.label}
          </ListLabel>
        );

      if (item.children) {
        return (
          <NavExpansionPanel theme={theme} item={item} key={index}>
            {renderNavigation(item.children)}
          </NavExpansionPanel>
        );
      } else {
        return (
          <InternalLink key={index}>
            <NavLink to={item.path} className={'compactNavItem'}>
              <ButtonBase key={item.name} name="child" sx={{ width: '100%', paddingLeft: 2 }}>
                <Icon className="icon" sx={{ width: 36, margin: theme === 'full' ? '0 0 0 20px' : '0 auto' }}>
                  {item.icon}
                </Icon>

                <StyledText theme={theme}>{item.name}</StyledText>

                <Box mx="auto" />
              </ButtonBase>
            </NavLink>
          </InternalLink>
        );
      }
    });
  };
  return <div className="navigation">{renderNavigation(item)}</div>;
};

export default SideNav;
