// const FooterNavbar = () => {
//   return (
//     <>
//       <img
//         src='assets/images/logos/prointec.png'
//         alt='logo prointec'
//         style={{
//           maxWidth: '116px',
//           paddingTop: '15px',
//           paddingBottom: '15px',
//           margin: 'auto',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}/>
//     </>
//   )
// };

// export default FooterNavbar;





import { Stack } from '@mui/material';
import React from 'react';

const FooterNavbar = ({ showMiniProintec }) => {
  return (
    <>
      {showMiniProintec ? (
        <Stack>
          <img
            src='assets/images/logos/miniProintec.png' // Reemplaza 'ruta/a' con la ruta correcta de la imagen
            alt='logo miniProintec'
            style={{
              maxWidth: '64px',
              paddingTop: '15px',
              paddingBottom: '15px',
              margin: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </Stack>
      ) : (
        <img
          src='assets/images/logos/prointec.png'
          alt='logo prointec'
          style={{
            maxWidth: '200px',
            paddingTop: '15px',
            paddingBottom: '15px',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      )}
    </>
  );
};

export default FooterNavbar;
