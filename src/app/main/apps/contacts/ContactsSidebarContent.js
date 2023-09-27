import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { openNewContactDialog } from './store/contactsSlice';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  color: 'inherit!important',
  textDecoration: 'none!important',
  height: 40,
  width: '100%',
  borderRadius: 6,
  paddingLeft: 12,
  paddingRight: 12,
  marginBottom: 4,
  '&.active': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'rgba(0, 0, 0, .05)!important'
        : 'rgba(255, 255, 255, .1)!important',
    pointerEvents: 'none',
    '& .list-item-icon': {
      color: 'inherit',
    },
  },
  '& .list-item-icon': {
    fontSize: 16,
    width: 16,
    height: 16,
    marginRight: 16,
  },
}));

function ContactsSidebarContent(props) {
  const dispatch = useDispatch();

  return (
    <div 
      style={{marginTop: 3}}
      className="p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4" 
    >
      <Paper
        component={motion.div}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
        className="rounded-0 shadow-none lg:rounded-16 lg:shadow"
      >
        <div className="p-24">
          <Button
            variant="contained"
            color="secondary"
            className="w-full flex flex-1 justify-around"
            style={{color: 'white'}}
            onClick={(ev) => dispatch(openNewContactDialog())}
          >
            NUEVO USUARIO
            <PersonAddIcon />
          </Button>
        </div>

        <List className="pt-0 px-12">
          <StyledListItem
            button
            component={NavLinkAdapter}
            to="/apps/contacts/all"
            activeClassName="active"
          >
            <Icon 
              className="list-item-icon text-16"
              color="action"
            >
              menu
            </Icon>
            <ListItemText 
              className="truncate flex justify-center" 
              style={{marginRight: '16px'}}
              primary="TODOS" 
              disableTypography
            />
          </StyledListItem>

          <Stack sx={{my: 2}}>
            <Typography fontWeight={'bold'}>
              ESTADO
            </Typography>
            <StyledListItem
              button
              component={NavLinkAdapter}
              to="/apps/contacts/status/activos"
              activeClassName="active"
            >
              <PersonIcon style={{color: 'green'}} />
              <ListItemText 
                className="truncate pl-10"
                primary="Activo" 
                disableTypography 
              />
            </StyledListItem>
            <StyledListItem
              button
              component={NavLinkAdapter}
              to="/apps/contacts/status/baja"
              activeClassName="active"
            >
              <PersonIcon style={{color: 'orange'}} />
              <ListItemText 
                className="truncate pl-10"
                primary="Inactivo" 
                disableTypography 
              />
            </StyledListItem>
          </Stack>

          <Stack>
            <Typography variant="body1" fontWeight={'bold'}>
              PERFIL
            </Typography>
            <StyledListItem
              button
              component={NavLinkAdapter}
              to="/apps/contacts/profiles/admin"
              activeClassName="active"
            >
              <ManageAccountsIcon />
              <ListItemText 
                className="truncate pl-10"
                primary="Administrador" 
                disableTypography 
              />
            </StyledListItem>
            <StyledListItem
              button
              component={NavLinkAdapter}
              to="/apps/contacts/profiles/user"
              activeClassName="active"
            >
              <PersonOutlineIcon />
              <ListItemText 
                className="truncate pl-10"
                primary="Usuario" 
                disableTypography 
              />
            </StyledListItem>
          </Stack>
        </List>
      </Paper>
    </div>
  );
}

export default ContactsSidebarContent;
