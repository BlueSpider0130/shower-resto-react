import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Stack, TextField } from '@material-ui/core';
// hooks
import { varFadeInRight, MotionInView } from '../animate';

// ----------------------------------------------------------------------

GetPersonalData.propTypes = {
  getPersonalDataProps: PropTypes.func,
  validationProps: PropTypes.object
};

export default function GetPersonalData({ getPersonalDataProps, validationProps }) {
  const [name, setName] = useState('Vadim Postnicov');
  const [email, setEmail] = useState('topwebdev.0612@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('6135550153');
  const [postalCode, setPostalCode] = useState('98012');

  const [hasName, setHasName] = useState(false);
  const [hasEmail, setHasEmail] = useState(false);
  const [hasPhoneNumber, setHasPhoneNumber] = useState(false);
  const [hasPostalCode, setHasPostalCode] = useState(false);

  const [hasNameErrorText, setHasNameErrorText] = useState('');
  const [hasEmailErrorText, setHasEmailErrorText] = useState('');
  const [hasPhoneNumberErrorText, setHasPhoneNumberErrorText] = useState('');
  const [hasPostalCodeErrorText, setHasPostalCodeErrorText] = useState('');

  const [personalData, setPersonalData] = useState({});

  useEffect(() => {
    const dataObj = {
      name,
      email,
      phoneNumber,
      postalCode
    };
    setPersonalData(dataObj);
  }, [name, email, phoneNumber, postalCode]);

  useEffect(() => {
    getPersonalDataProps(personalData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personalData]);

  useEffect(() => {
    if (validationProps.name) {
      setHasName(true);
      setHasNameErrorText('The name is required!');
    } else if (validationProps.email) {
      setHasEmail(true);
      setHasEmailErrorText('The email is required!');
    } else if (validationProps.validEmail) {
      setHasEmail(true);
      setHasEmailErrorText('Please provide correct email!');
    } else if (validationProps.phone) {
      setHasPhoneNumber(true);
      setHasPhoneNumberErrorText('The phone number is required!');
    } else if (validationProps.validPhone) {
      setHasPhoneNumber(true);
      setHasPhoneNumberErrorText('Please provide correct phone number!');
    } else if (validationProps.postal) {
      setHasPostalCode(true);
      setHasPostalCodeErrorText('The postal code is required!');
    } else if (validationProps.validPostal) {
      setHasPostalCode(true);
      setHasPostalCodeErrorText('Please provide correct postal code!');
    }
  }, [validationProps]);

  const handleChangeName = (e) => {
    if (e.target.value.length === 0) {
      setHasName(true);
      setHasNameErrorText('The name is required!');
    } else {
      setHasName(false);
      setHasNameErrorText('');
    }
    setName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    if (e.target.value.length === 0) {
      setHasEmail(true);
      setHasEmailErrorText('The email is required!');
    } else if (
      !e.target.value.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setHasEmail(true);
      setHasEmailErrorText('Please provide correct email!');
    } else {
      setHasEmail(false);
      setHasEmailErrorText('');
    }
    setEmail(e.target.value);
  };

  const handleChangePhoneNumber = (e) => {
    if (e.target.value.length === 0) {
      setHasPhoneNumber(true);
      setHasPhoneNumberErrorText('The phone number is required!');
    } else if (e.target.value.length < 9 || Number.isNaN(Number(e.target.value))) {
      setHasPhoneNumber(true);
      setHasPhoneNumberErrorText('Please provide correct phone number!');
    } else {
      setHasPhoneNumber(false);
      setHasPhoneNumberErrorText('');
    }
    setPhoneNumber(e.target.value);
  };

  const handleChangePostalCode = (e) => {
    if (e.target.value.length === 0) {
      setHasPostalCode(true);
      setHasPostalCodeErrorText('The postal code is required!');
    } else if (e.target.value.length < 5 || Number.isNaN(Number(e.target.value))) {
      setHasPostalCode(true);
      setHasPostalCodeErrorText('Please provide correct postal code!');
    } else {
      setHasPostalCode(false);
      setHasPostalCodeErrorText('');
    }
    setPostalCode(e.target.value);
  };

  return (
    <Stack spacing={3} sx={{ width: '70%' }}>
      <MotionInView variants={varFadeInRight}>
        <TextField
          error={hasName}
          helperText={hasNameErrorText}
          value={name}
          fullWidth
          onChange={handleChangeName}
          label="FIRST AND LAST NAME"
        />
      </MotionInView>

      <MotionInView variants={varFadeInRight}>
        <TextField
          error={hasEmail}
          helperText={hasEmailErrorText}
          value={email}
          type={email}
          onChange={handleChangeEmail}
          fullWidth
          label="EMAIL"
        />
      </MotionInView>

      <MotionInView variants={varFadeInRight}>
        <TextField
          error={hasPhoneNumber}
          helperText={hasPhoneNumberErrorText}
          value={phoneNumber}
          name="phone"
          pattern="[0-9]*"
          onChange={handleChangePhoneNumber}
          fullWidth
          label="PHONE NUMBER"
        />
      </MotionInView>

      <MotionInView variants={varFadeInRight}>
        <TextField
          error={hasPostalCode}
          helperText={hasPostalCodeErrorText}
          value={postalCode}
          onChange={handleChangePostalCode}
          fullWidth
          label="POSTAL CODE"
        />
      </MotionInView>
    </Stack>
  );
}
