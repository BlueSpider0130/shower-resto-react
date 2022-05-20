// import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate, NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Paper, Stack, Button, Popover, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import axios from '../../utils/axios';
// import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------
const locationId = 'LVTG3Q9GGBCNW';
const appId = 'sandbox-sq0idb-F9z4qyEBs5Dx_jFioZ71Tw';
// const prizes = ['📱', '🍫', '🍵', '🍔'];
async function tokenize(paymentMethod) {
  const tokenResult = await paymentMethod.tokenize();
  if (tokenResult.status === 'OK') {
    console.log('before get token');
    return tokenResult.token;
  }
  let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
  if (tokenResult.errors) {
    errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
  }
  throw new Error(errorMessage);
}

export default function PaymentNewCardForm() {
  const navigate = useNavigate();
  const [isCVVInfoOpen, setIsCVVInfoOpen] = useState(null);
  const [card, setCard] = useState();
  const [isPayProcessing, setIsPayProcessing] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const personalData = JSON.parse(localStorage.getItem('personalData'));
  const { email, name, phoneNumber, postalCode } = personalData;
  useEffect(() => {
    buildPaymentForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const payments = window.Square.payments(appId, locationId);
  const buildPaymentForm = async () => {
    // get ...
    const card = await payments.card(); // payment form builder
    card.attach('#card-container');
    setCard(card);
  };

  const payNowClick = async (event) => {
    event.preventDefault();
    try {
      setIsPayProcessing(true);
      const token = await tokenize(card);
      console.log('This is locationId', token);
      // setCardToken(token);
      console.log('This is cardToken', token);
      // api call via fetch to backend with lcationId & token
      const body = {
        locationId,
        sourceId: token,
        name,
        email,
        phoneNumber,
        postalCode
      };

      await axios.post('https://shower-resto-backend.herokuapp.com/payment', body).then((res) => {
        console.log(res);
        const { status } = res;
        if (status === 200) {
          enqueueSnackbar('You pay $49 successfully', { variant: 'primary' });
          navigate('/');
        }
      });
    } catch (e) {
      setIsPayProcessing(false);
      console.log('This is error msg', e.message);
    }
  };

  return (
    <>
      <Paper
        sx={{
          p: 2.5,
          mb: 2.5,
          bgcolor: 'background.neutral'
        }}
      >
        <Stack spacing={2}>
          <form id="payment-form">
            <div id="card-container" />
          </form>
          <Typography variant="subtitle1">Pay $49</Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: 'center' }}>
            <div id="payment-status-container" />
          </Stack>

          <Stack direction="row" spacing={2}>
            <Button id="card-button" fullWidth variant="contained" disabled={isPayProcessing} onClick={payNowClick}>
              Pay $49
            </Button>
            <Button component={RouterLink} to="/book/consultation" fullWidth>
              Skip Now
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Popover
        open={Boolean(isCVVInfoOpen)}
        anchorEl={isCVVInfoOpen}
        onClose={() => setIsCVVInfoOpen(null)}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
        PaperProps={{
          sx: {
            p: 1,
            maxWidth: 200
          }
        }}
      >
        <Typography variant="body2" align="center">
          Three-digit number on the back of your VISA card
        </Typography>
      </Popover>
    </>
  );
}
