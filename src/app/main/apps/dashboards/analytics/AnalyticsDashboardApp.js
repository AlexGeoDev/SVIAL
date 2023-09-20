// import withReducer from 'app/store/withReducer';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import reducer from './store';
// import { selectWidgetsEntities, getWidgets } from './store/widgetsSlice';
// import WidgetHeader from './widgets/WidgetHeader';
// import Widget01 from './widgets/Widget01';
// import Widget02 from './widgets/Widget02';
// import Widget03 from './widgets/Widget03';
// import Widget04 from './widgets/Widget04';
// import Widget05 from './widgets/Widget05';
// import Widget06 from './widgets/Widget06';
// import Stack from '@mui/material/Stack';

// function AnalyticsDashboardApp() {
//   const dispatch = useDispatch();
//   const widgets = useSelector(selectWidgetsEntities);

//   useEffect(() => {
//     dispatch(getWidgets());
//   }, [dispatch]);

//   if (!widgets || widgets.length === 0) {
//     return null;
//   }

//   return (
//     <div className="w-full bg-white">
//       <WidgetHeader />
//       <Stack direction="row" spacing={2} className="mt-4 mb-2 flex justify-center ">
//         <Stack direction="column" spacing={2}>
//           <Widget01 />
//           <Widget03 />
//           <Stack direction="row" spacing={2}>
//             <Widget05 />
//             <Widget06 />
//           </Stack>
//         </Stack>

//         <Stack direction="column" spacing={2}>
//           <Widget02 />
//           <Widget04 />
//         </Stack>
//       </Stack>
//     </div>
//   );
// }

// export default withReducer('analyticsDashboardApp', reducer)(AnalyticsDashboardApp);







import withReducer from 'app/store/withReducer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reducer from './store';
import { selectWidgetsEntities, getWidgets } from './store/widgetsSlice';
import WidgetHeader from './widgets/WidgetHeader';
import Widget01 from './widgets/Widget01';
import Widget02 from './widgets/Widget02';
import Widget03 from './widgets/Widget03';
import Widget04 from './widgets/Widget04';
import Widget05 from './widgets/Widget05';
import Widget06 from './widgets/Widget06';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/material';

function AnalyticsDashboardApp() {
  const dispatch = useDispatch();
  const widgets = useSelector(selectWidgetsEntities);

  useEffect(() => {
    dispatch(getWidgets());
  }, [dispatch]);

  if (!widgets || widgets.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-white">
      <WidgetHeader />
      <Grid container
        style={{
          display: 'flex',
          border: '1px solid blue',
          margin: '0 auto',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        direction={{
          sm: 'column',
          md: 'row',
        }}
        // className="flex justify-around mt-4 mb-2"
      >

        <Grid container item sm={12} md={7} border={1} sx={{display: 'flex', justifyContent: 'center'}}>
          <Grid marginY={1}>
            <Widget01 />
          </Grid>
          <Grid marginY={2}>
            <Widget03 />
          </Grid>

          <Grid container 
            sm={11.5}
            md={{ margin: '0px auto'}}
            margin={'10px auto'}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'space-between',
            }}
          >
            <Grid item sm={6}>
              <Widget05 />
            </Grid>
            <Grid item sm={6}>
              <Widget06 />
            </Grid>
          </Grid>
        </Grid>

        <Grid container border={1}
          spacing={1} sm={11} md={4}
          direction={{sm: 'row', md: 'column'}}
          sx={{
            margin: '10px auto',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Grid item>
            <Widget02 />
          </Grid>
          <Grid item>
            <Widget04 />
          </Grid>
        </Grid>

      </Grid>
    </div>
  );
}

export default withReducer('analyticsDashboardApp', reducer)(AnalyticsDashboardApp);
