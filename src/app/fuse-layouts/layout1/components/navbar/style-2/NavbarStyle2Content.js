import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Logo from 'app/fuse-layouts/shared-components/Logo';
import NavbarToggleButton from 'app/fuse-layouts/shared-components/NavbarToggleButton';
import Navigation from 'app/fuse-layouts/shared-components/Navigation';
import UserNavbarHeader from 'app/fuse-layouts/shared-components/UserNavbarHeader';
import clsx from 'clsx';
import { memo, useState } from 'react';
import { Stack } from '@mui/material';
import FooterNavbar from 'app/fuse-layouts/shared-components/FooterNavbar';

const Root = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  '& ::-webkit-scrollbar-thumb': {
    boxShadow: `inset 0 0 0 20px ${
      theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.24)' : 'rgba(255, 255, 255, 0.24)'
    }`,
  },
  '& ::-webkit-scrollbar-thumb:active': {
    boxShadow: `inset 0 0 0 20px ${
      theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.37)' : 'rgba(255, 255, 255, 0.37)'
    }`,
  },
}));

const StyledContent = styled(FuseScrollbars)(({ theme }) => ({
  overscrollBehavior: 'contain',
  overflowX: 'hidden',
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch',
  background:
    'linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 40px, 100% 10px',
  backgroundAttachment: 'local, scroll',
}));

function NavbarStyle2Content(props) {
  const theme = useTheme();
  const [showMiniProintec, setShowMiniProintec] = useState(false);

  const handleMouseLeave = () => {
    setShowMiniProintec(true);
  };

  const handleMouseEnter = () => {
    setShowMiniProintec(false);
  };

  return (
    <Root 
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={clsx('flex flex-auto flex-col overflow-hidden h-full', props.className)}>
      <AppBar
        color="primary"
        position="relative"
        sx={{backgroundColor: '#9ecdf8'}}
        className="flex flex-row items-center shrink h-64 md:h-64 min-h-64 md:min-h-64 shadow-0"
      >
        <div>
          <Logo />
        </div>

        <Stack alignItems={'center'} flex={1}>
          <NavbarToggleButton className="w-60 h-60 p-0" />
        </Stack>
      </AppBar>


      <StyledContent option={{ suppressScrollX: true, wheelPropagation: false }}>
        {/* <UserNavbarHeader /> */}

        <Stack mt={5}>
          <Navigation layout="vertical" />
        </Stack>
        
        <Stack mt={5}>
          <FooterNavbar showMiniProintec={showMiniProintec} />
        </Stack>
      </StyledContent>
      

    </Root>
  );
}

export default memo(NavbarStyle2Content);
