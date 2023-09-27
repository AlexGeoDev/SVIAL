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
      <Grid container  paddingX={{md: 1}}
        direction={{ sm: 'column', md: 'row'}}
        style={{
          display: 'flex',
          margin: '0 auto',
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}
      >
          <Grid container item sm={12} md={6.6}
            sx={{
              display: 'flex', 
              justifyContent: 'center'
              }
            }
          >
            <Grid>
              <Widget01 />
            </Grid>
            <Grid marginY={2}>
              <Widget03 />
            </Grid>

            <Grid container sm={11.5} md={12} direction={'row'} spacing={{md: 3}}>
              <Grid item sm={6}>
                <Widget05 />
              </Grid>
              <Grid item sm={6}>
                <Widget06 />
              </Grid>
            </Grid>
          </Grid>

          <Grid sm={11.5} md={4.4} direction={{sm: 'row', md: 'column'}}

            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Grid item sm={6} md={12}>
              <Widget02 />
            </Grid>
            <Grid item sm={6} md={12}>
              <Widget04 />
            </Grid>
          </Grid>

      </Grid>
    </div>
  );
}

export default withReducer('analyticsDashboardApp', reducer)(AnalyticsDashboardApp);