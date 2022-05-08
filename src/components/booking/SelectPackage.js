import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
  FormControlLabel,
  Typography,
  Stack,
  Checkbox
} from '@material-ui/core';
// hooks

// ----------------------------------------------------------------------

SelectPackage.propTypes = {
  handlePackageData: PropTypes.object,
  onNext: PropTypes.func,
  bookDataWithCheckedValue: PropTypes.func
};

export default function SelectPackage({ handlePackageData, onNext, bookDataWithCheckedValue }) {
  const serviceDatas = handlePackageData.serviceTypeData;
  // const [checkState, setCheckState] = useState([]);
  const handleChecking = (indexPackage, indexAddOn) => {
    console.log(indexPackage, indexAddOn);
    serviceDatas.packages[indexPackage].add_ons[indexAddOn].checked =
      !serviceDatas.packages[indexPackage].add_ons[indexAddOn].checked;
    bookDataWithCheckedValue(serviceDatas);
    // console.log(handlePackageData);
  };

  // useEffect(() => {
  //   console.log(serviceDatas.add_ons);
  // }, [serviceDatas]);

  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>{serviceDatas.type}</Typography>
        </Grid>
        {serviceDatas.packages.map((item, indexPackage) => (
          <Grid key={indexPackage} item md={12} lg={4}>
            <Card>
              <CardHeader title={item.title} />
              <CardContent>
                <Typography variant="h5" paragraph>
                  ${item.budget}
                </Typography>
                <Typography variant="p" paragraph>
                  {item.services}
                </Typography>
                {item.add_ons.map((addOn, indexAddOn) => (
                  <Box key={indexAddOn} md={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={addOn.checked}
                          onChange={() => handleChecking(indexPackage, indexAddOn)}
                          name={`${indexAddOn}`}
                        />
                      }
                      label={`${addOn.service}  $${addOn.budget}`}
                    />
                  </Box>
                ))}
              </CardContent>

              <Button
                // color="inherit"
                fullWidth
                size="large"
                variant="contained"
                // disabled={activeStep === 0}
                sx={{ mr: 1 }}
                onClick={() => onNext(item)}
                // startIcon={<ArrowBackIosIcon />}
              >
                Next
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
