import React, { useState, useEffect } from 'react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@material-ui/core';
//
import { LoadingButton } from '@material-ui/lab';
import { useSnackbar } from 'notistack';
import { varFadeInUp, MotionInView } from '../../animate';
import { GetPersonalData } from '../../booking';
import { ContactMap } from '../contact';

import { submitContact } from '../../../utils/API';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(28, 0),
  backgroundColor: theme.palette.grey[900]
}));

// ----------------------------------------------------------------------

export default function LandingContactUs() {
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState();
  const [contactInfo, setContactInfo] = useState({});
  const [validation, setValidation] = useState({
    name: false,
    description: false,
    email: false,
    validEmail: false,
    phone: false,
    validPhone: false,
    postal: false,
    validPostal: false
  });
  const handlePersonalData = (personalData) => {
    setContactInfo(personalData);
  };
  useEffect(() => {
    console.log(contactInfo);
  }, [contactInfo]);

  const submit = async () => {
    console.log('first');
    if (contactInfo.name.length === 0) {
      setValidation({ name: true });
    } else if (contactInfo.description.length === 0) {
      setValidation({ description: true });
    } else if (contactInfo.email.length === 0) {
      setValidation({ email: true });
    } else if (
      contactInfo.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) === false
    ) {
      setValidation({ validEmail: true });
    } else if (contactInfo.phoneNumber.length === 0) {
      setValidation({ phone: true });
    } else if (Number.isNaN(Number(contactInfo.phoneNumber)) || contactInfo.phoneNumber.length < 9) {
      setValidation({ validPhone: true });
    } else if (contactInfo.postalCode.length === 0) {
      setValidation({ postal: true });
    } else if (contactInfo.postalCode.length < 5) {
      setValidation({ validPostal: true });
    } else {
      setIsSubmitting(true);
      const result = await submitContact(contactInfo); // api call function
      setIsSubmitting(false);
      if (result === true) {
        window.scrollTo(0, 0);
        enqueueSnackbar('Thank you. We will be in touch very soon', { variant: 'primary' });
      }
      console.log(result);
    }
  };

  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Box
          component="img"
          alt="image shape"
          src="/static/home/shape.svg"
          sx={{
            top: 0,
            right: 0,
            bottom: 0,
            my: 'auto',
            position: 'absolute',
            filter: 'grayscale(1) opacity(48%)',
            display: { xs: 'none', md: 'block' }
          }}
        />

        <Grid container spacing={5} direction="row-reverse" justifyContent="space-between">
          <Grid item xs={12} md={12}>
            <Typography variant="h4" paragraph sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
              Complete Shower Restoration Co.
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              10872148 Canada Incorporated 15 Vicora Linkway Unit 503 Toronto, ON M3C 1A7 Canada
            </Typography>
            <Typography variant="h4" paragraph sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
              Tel 647-871-SHWR (7497)
            </Typography>
            <Typography variant="h4" paragraph sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
              Email
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>quote@completeshowerrestoration.ca</Typography>
            <Typography variant="h4" paragraph sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
              Hours
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Monday – Saturday 8:00 am – 8:00 pm</Typography>
            <Typography variant="h4" paragraph sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
              Service Areas
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Toronto, Mississauga, Newmarket, Brampton, Scarborough, Pickering, Oshawa and more!
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <MotionInView variants={varFadeInUp}>
              <Typography variant="h3" color="#ffffff">
                Feel free to contact us. <br />
                We'll be glad to hear from you, buddy.
              </Typography>
              {/* <ContactForm /> */}
              <GetPersonalData
                isDescriptionField
                inputSx={{ color: 'white', backgroundColor: 'dark' }}
                sx={{ width: '100%', paddingBottom: 3 }}
                getPersonalDataProps={handlePersonalData}
                validationProps={validation}
              />
              <LoadingButton
                // color="inherit"
                loading={isSubmitting}
                fullWidth
                size="large"
                variant="contained"
                // disabled={valid}
                onClick={() => submit()}
                sx={{ mr: 1 }}
              >
                Submit
              </LoadingButton>
            </MotionInView>
          </Grid>
          <Grid item xs={12} md={6}>
            <ContactMap />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
