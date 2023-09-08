import FuseUtils from '@fuse/utils/FuseUtils';
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import _ from '@lodash';
import * as yup from 'yup';

import {
  removeContact,
  updateContact,
  addContact,
  closeNewContactDialog,
  closeEditContactDialog,
} from './store/contactsSlice';
import { MenuItem, Select } from '@mui/material';

const defaultValues = {
  name: '',
  mail: '',
  password: '',
	isAdmin: false,
	active: false,
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required('You must enter a name'),
});

function ContactDialog(props) {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const dispatch = useDispatch();
  const contactDialog = useSelector(({ contactsApp }) => contactsApp.contacts.contactDialog);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const id = watch('id');
  const name = watch('name');
  const avatar = watch('avatar');

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (contactDialog.type === 'edit' && contactDialog.data) {
      reset({ ...contactDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (contactDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...contactDialog.data,
        // id: FuseUtils.generateGUID(),
      });
    }
  }, [contactDialog.data, contactDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (contactDialog.props.open) {
      initDialog();
    }
  }, [contactDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  // function closeComposeDialog() {
  //   return contactDialog.type === 'edit'
  //     ? dispatch(closeEditContactDialog())
  //     : dispatch(closeNewContactDialog());
  // }

  function closeComposeDialog() {
    const closeAction = contactDialog.type === 'edit' 
      ? closeEditContactDialog() 
      : closeNewContactDialog();
    dispatch(closeAction);
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    if (contactDialog.type === 'new') {
      dispatch(addContact(data));
    } else {
      dispatch(updateContact({ 
        ...contactDialog.data, 
        ...data 
      }));
    }
    closeComposeDialog();
  }

  function onSubmit(data) {
    const newContactData = {
      name: data.name,
      password: data.password,
      mail: data.mail,
      isAdmin: data.isAdmin,
      active: data.active,
      projects: selectedProjects,
    };

    if (contactDialog.type === 'new') {
      dispatch(addContact(newContactData));
    } else {
      dispatch(updateContact({ 
        ...contactDialog.data, 
        ...data 
      }));
    }
    closeComposeDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeContact(id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      {...contactDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {contactDialog.type === 'new' ? 'New Contact' : 'Edit Contact'}
          </Typography>
        </Toolbar>
        <div className="flex flex-col items-center justify-center pb-24">
          <Avatar className="w-96 h-96" alt="contact avatar" src={avatar} />
          {contactDialog.type === 'edit' && (
            <Typography variant="h6" color="inherit" className="pt-8">
              {name}
            </Typography>
          )}
        </div>
      </AppBar>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:overflow-hidden"
      >
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Nombre"
                  id="name"
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <Controller
              control={control}
              name="mail"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Correo electronico"
                  id="mail"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className='flex'>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Contraseña"
                  id="password"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex flex-col">
              <Typography variant="body1" color="initial" sx={{ mb: 1 }}>
                Perfil
              </Typography>
              <Controller
                name="isAdmin"
                control={control}
                render={({ field: { onChange, value: formPerfilVal } }) => (
                  <Select
                    id="isAdmin"
                    value={formPerfilVal}
                    defaultValue={'Usuario'}
                    onChange={(event) => onChange(event.target.value)}
                  >
                    <MenuItem value={false}>Usuario</MenuItem>
                    <MenuItem value={true}>Administrador</MenuItem>
                  </Select>
                )}
              />
            </div>

            <div className="mb-16">
              <div className="flex items-center justify-start p-12">
                <Typography variant="body1" color="initial">
                  Estado
                </Typography>
                <div className="flex">
                  <Controller
                    name="active"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div className="flex">
                        <IconButton
                          tabIndex={-1}
                          disableRipple
                          onClick={(ev) => onChange(!value)}
                          size="large"
                        >
                          {value ? (
                            <Icon color="secondary">check_circle</Icon>
                          ) : (
                            <Icon color="action">radio_button_unchecked</Icon>
                          )}
                        </IconButton>
                      </div>                      
                    )}
                  />
                </div>
              </div>
            </div>
        </DialogContent>

        {contactDialog.type === 'new' ? (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Add
              </Button>
            </div>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Save
              </Button>
            </div>
            <IconButton onClick={handleRemove} size="large">
              <Icon>delete</Icon>
            </IconButton>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default ContactDialog;
