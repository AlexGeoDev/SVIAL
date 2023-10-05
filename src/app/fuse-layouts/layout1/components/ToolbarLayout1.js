import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
import NavbarToggleButton from 'app/fuse-layouts/shared-components/NavbarToggleButton';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import FullScreenToggle from '../../shared-components/FullScreenToggle';
import Typography from '@mui/material/Typography'
import { Stack, Grid } from '@mui/material';
import MapButton from './buttons/MapButton';
import MenuButton from './buttons/MenuButton';
import PieButton from './buttons/PieButton';
import SearchButton from './buttons/SearchButton';

function ToolbarLayout1(props) {
  const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
  const navbar = useSelector(({ fuse }) => fuse.navbar);
  const toolbarTheme = useSelector(selectToolbarTheme);

  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar
        id="fuse-toolbar"
        className={clsx('flex relative z-20 shadow-md', props.className)}
        color="default"
        sx={{ backgroundColor: '#429df0'}}
        position="relative"
      >
        <Grid>
          <Toolbar className="flex p-0 sm:w-600 md:w-900">
            <div className="flex flex-1 items-center">
              {config.navbar.display && config.navbar.position === 'left' && (
                <>
                  <Hidden lgDown>
                    {(config.navbar.style === 'style-3' ||
                      config.navbar.style === 'style-3-dense') && (
                      <NavbarToggleButton className="w-40  p-0 mx-0" />
                    )}

                    {config.navbar.style === 'style-1' && !navbar.open && (
                      <NavbarToggleButton className="w-40  p-0 mx-0" />
                    )}
                  </Hidden>

                  <Hidden lgUp>
                    <NavbarToggleButton className="w-40 p-0 mx-0 sm:mx-8" />
                  </Hidden>                  
                </>
              )}

              <Stack sx={{ml: 2}} direction={'row'} spacing={2}>
                <SearchButton />
                <MapButton />
                <MenuButton />
                <PieButton />
              </Stack>

              <Stack className='flex flex-1 items-center justify-center'>
                <Typography variant="h4" color="white" fontWeight={'bold'}>SVIAL</Typography>
              </Stack>

              <FullScreenToggle />
              <UserMenu />
            </div>
            {config.navbar.display && config.navbar.position === 'right' && (
              <>
                <Hidden lgDown>
                  {!navbar.open && <NavbarToggleButton className="w-40 p-0 mx-0" />}
                </Hidden>

                <Hidden lgUp>
                  <NavbarToggleButton className="w-40 p-0 mx-0 sm:mx-8" />
                </Hidden>
              </>
            )}
          </Toolbar>
        </Grid>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(ToolbarLayout1);
