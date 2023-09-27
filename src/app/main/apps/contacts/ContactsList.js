import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Avatar from '@mui/material/Avatar';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactsMultiSelectMenu from './ContactsMultiSelectMenu';
import ContactsTable from './ContactsTable';
import {
  openEditContactDialog,
  removeContact,
  toggleStarredContact,
  selectContacts,
} from './store/contactsSlice';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

function ContactsList(props) {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const routeParams = useSelector(({ contactsApp }) => contactsApp.contacts.routeParams);
  const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText);
  const user = useSelector(({ contactsApp }) => contactsApp.user);

  const [filteredData, setFilteredData] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);

  const columns = useMemo(
    () => [
      // {
      //   Header: ({ selectedFlatRows }) => {
      //     const selectedRowIds = selectedFlatRows.map((row) => row.original.id);

      //     return (
      //       selectedFlatRows.length > 0 && (
      //         <ContactsMultiSelectMenu selectedContactIds={selectedRowIds} />
      //       )
      //     );
      //   },
      //   accessor: 'avatar',
      //   Cell: ({ row }) => {
      //     return <Avatar className="mx-8" alt={row.original.name} src={row.original.avatar} />;
      //   },
      //   className: 'justify-center',
      //   width: 64,
      //   sortable: false,
      // },
      {
        width: 128,
        accessor: 'active',
        sortable: true,
        Cell: ({ row }) => (
          <div className="flex flex-1 items-center justify-center">
            <IconButton
              onClick={(ev) => {
                ev.stopPropagation();
                dispatch(toggleStarredContact(row.original.id));
              }}
              size="large"
            >
              {row.original.active ? (
                <ManageAccountsIcon sx={{color: 'green'}} fontSize='large' />
              ) : (
                <PersonOutlineIcon sx={{color: 'orange'}} fontSize='large'/>
              )}
            </IconButton>
          </div>
        ),
      },
      {
        Header: 'Nombre',
        accessor: 'name',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Correo electrónico',
        accessor: 'mail',
        sortable: true,
      },
      {
        Header: 'Perfil',
        accessor: 'isAdmin',
        sortable: false,
        // Cell: ({ value }) => (
        //   <div>
        //     {value ? <span>Administrador</span> : <span>Usuario</span>}
        //   </div>
        // ),
        Cell: ({ value }) => <div>{
          value ? <span>Administrador</span> : <span>Usuario</span>
          }</div>,
      },
      {
        id: 'action',
        width: 128,
        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            {/* <IconButton
              onClick={(ev) => {
                ev.stopPropagation();
                dispatch(toggleStarredContact(row.original.id));
              }}
              size="large"
            >
              {user.starred && user.starred.includes(row.original.id) ? (
                <Icon className="text-yellow-700">star</Icon>
              ) : (
                <Icon>star_border</Icon>
              )}
            </IconButton> */}
            <IconButton
              onClick={(ev) => {
                ev.stopPropagation();
                setSelectedContactId(row.original.id);
                // dispatch(removeContact(true));
                setDeleteDialogOpen(true);
              }}
            >
              <Icon>delete</Icon>
            </IconButton>
          </div>
        ),
      },
    ],
    [dispatch, user.starred]
  );

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return entities;
      }
      return FuseUtils.filterArrayByString(entities, _searchText);
    }

    function filterByParams(entities, params) {
      if (params.state) {
        return entities.filter((item) => {
          if (params.state === 'activos') return item.active;
          return !item.active;
        });
      }
      if (params.profile) {
        return entities.filter((item) => {
          if (params.profile === 'admin') return item.isAdmin;
          return !item.isAdmin;
        });
      }
      return entities;
    }

    if (contacts) {
      const _contacts = filterByParams(contacts, routeParams);
      setFilteredData(getFilteredArray(_contacts, searchText));
    }
  }, [contacts, searchText, routeParams]);

  const handleDeleteContact = () => {
    dispatch(removeContact(selectedContactId));
    setDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
        ¡No se han creado usuarios!
        </Typography>
      </div>
    );
  }
  console.log(filteredData)

  return (
    <>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
        className="flex flex-auto w-full max-h-full"
      >
        <ContactsTable
          columns={columns}
          data={filteredData}
          onRowClick={(ev, row) => {
            if (row) {
              dispatch(openEditContactDialog(row.original));
            }
          }}
        />
      </motion.div>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas eliminar este contacto?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancelar</Button>
          <Button onClick={handleDeleteContact} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>    
    </>
  );
}

export default ContactsList;
