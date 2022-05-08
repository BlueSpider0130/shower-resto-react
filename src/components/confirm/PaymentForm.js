// import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// @mui
import { Paper, Stack, Button, Popover, Typography } from '@material-ui/core';
// components
// import Iconify from '../../components/Iconify';
// import { arDZ } from 'date-fns/locale';

// ----------------------------------------------------------------------
const locationId = 'LHWPSKK4YPV8R';
const appId = 'sandbox-sq0idb-GAIKxUpEwpJQxZF5qq8quA';
const prizes = ['📱', '🍫', '🍵', '🍔'];
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
  const [isCVVInfoOpen, setIsCVVInfoOpen] = useState(null);
  const [card, setCard] = useState();
  const [cardToken, setCardToken] = useState();

  const payments = window.Square.payments(appId, locationId);
  const buildPaymentForm = async () => {
    // get ...
    const card = await payments.card(); // payment form builder
    card.attach('#card-container');
    setCard(card);
  };
  useEffect(() => {
    buildPaymentForm();
  }, []);

  const payNowClick = async (event) => {
    event.preventDefault();
    const cardButton = document.getElementById('card-button');
    try {
      // console.log('This is card', card);
      cardButton.disabled = true;
      const token = await tokenize(card);
      console.log('This is locationId', token);
      // setCardToken(token);
      console.log('This is cardToken', token);

      // api call via fetch to backend with lcationId & token
      // const body = JSON.stringify({
      //   locationId,
      //   sourceId: token,
      //   customerId: 'donkii'
      // });
      const paymentResponse = await fetch('http://localhost:3000/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          locationId,
          sourceId: token,
          customerId: 'donkii'
        })
      });

      if (paymentResponse.ok) {
        return paymentResponse.json();
        // displayPaymentResults('SUCCESS');
      }

      const errorBody = await paymentResponse.text();
      throw new Error(errorBody);
    } catch (e) {
      cardButton.disabled = false;
      console.log('This is card', card);
      // displayPaymentResults('FAILURE');
      console.log(e.message);
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
          {/* <TextField fullWidth size="small" label="Name on card" />

          <TextField fullWidth size="small" /> */}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: 'center' }}>
            {/* <TextField size="small" />
            <TextField
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" edge="end" onClick={(event) => setIsCVVInfoOpen(event.currentTarget)}>
                      <InfoIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            /> */}

            <div id="payment-status-container" />
          </Stack>

          <Stack direction="row" spacing={2}>
            <Button id="card-button" fullWidth variant="contained" onClick={payNowClick}>
              Pay $49
            </Button>
            <Button fullWidth>Skip now</Button>
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
