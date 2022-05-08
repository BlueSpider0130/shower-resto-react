import React, { useEffect, useState } from 'react';
import isWeekend from 'date-fns/isWeekend';
import PropTypes from 'prop-types';
import { Box, Grid, Card, CardContent, Typography, Stack, TextField, useMediaQuery } from '@material-ui/core';
import { TimePicker, StaticDatePicker } from '@material-ui/lab';
// hooks

// ----------------------------------------------------------------------

SelectDate.propTypes = {
  getBookDatas: PropTypes.object,
  setBookDate: PropTypes.func
};

export default function SelectDate({ getBookDatas, setBookDate }) {
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const serviceDatas = getBookDatas;
  // const [callScheduleDate, setCallScheduleDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [sumAddOn, setSumAddOn] = useState(0);

  useEffect(() => {
    if (serviceDatas.selectedPackage) {
      setSumAddOn(Number(serviceDatas.selectedPackage.budget));
      serviceDatas.selectedPackage.add_ons.map((item) => {
        if (item.checked) setSumAddOn((pre) => pre + Number(item.budget));
        return 'sdf';
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(date);
    setBookDate(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      {/* {console.log(serviceDatas)} */}
      {/* <Grid item xs={12}> */}
      <Card sx={{ width: '100%' }}>
        {/* <CardHeader title="Static Calendar" /> */}
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={12} lg={8}>
              <StaticDatePicker
                orientation={isMdUp ? 'landscape' : 'portrait'}
                openTo="day"
                value={date}
                shouldDisableDate={isWeekend}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item md={12} lg={4}>
              <TimePicker
                label="12 hours"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField fullWidth {...params} margin="normal" />}
              />
              <Box>
                <Typography variant="h6" paragraph>
                  {serviceDatas.serviceTypeData.type}
                </Typography>
                {serviceDatas.selectedPackage && (
                  <>
                    <Typography variant="p" paragraph>
                      {serviceDatas.selectedPackage.title} &nbsp;$
                      {serviceDatas.selectedPackage.budget}
                    </Typography>
                    <Typography>Add on</Typography>
                    {serviceDatas.selectedPackage.add_ons.map((addOn, index) => (
                      <Box key={index}>
                        {addOn.checked && <Typography>{`$${addOn.budget} ${addOn.service}`}</Typography>}
                      </Box>
                    ))}
                    <Typography>Total</Typography>
                    <Typography>${sumAddOn}</Typography>
                  </>
                )}
                {console.log('final:', serviceDatas)}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* <Typography>{serviceDatas.type}</Typography> */}
      {/* </Grid> */}
    </Stack>
  );
}
