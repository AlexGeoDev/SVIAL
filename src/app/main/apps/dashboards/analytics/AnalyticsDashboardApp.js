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
import Stack from '@mui/material/Stack';

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
      <Stack direction="row" spacing={2} className="mt-4 mb-2 flex justify-center ">
        <Stack direction="column" spacing={2}>
          <Widget01 />
          <Widget03 />
          <Stack direction="row" spacing={2}>
            <Widget05 />
            <Widget06 />
          </Stack>
        </Stack>

        <Stack direction="column" spacing={2}>
          <Widget02 />
          <Widget04 />
        </Stack>
      </Stack>
    </div>
  );
}

export default withReducer('analyticsDashboardApp', reducer)(AnalyticsDashboardApp);
