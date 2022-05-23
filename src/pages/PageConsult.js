import React, { useState } from 'react';
import { motion } from 'framer-motion';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Typography, Container } from '@material-ui/core';
import { useSnackbar } from 'notistack';
// components
import { useNavigate } from 'react-router';
import { MotionContainer, varFadeInUp } from '../components/animate';
import { UploadMultiFile } from '../components/upload';
import Page from '../components/Page';
import { upload } from '../utils/API';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  // height: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function PageConsult() {
  const navigate = useNavigate();

  const [inputFiles, setInputFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { name } = JSON.parse(localStorage.getItem('personalData'));
  const { enqueueSnackbar } = useSnackbar();

  const handleDropMultiFile = (acceptedFiles) => {
    setInputFiles(
      inputFiles.concat(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )
    );
  };
  const handleRemoveAll = () => {
    setInputFiles([]);
  };

  const handleRemove = (file) => {
    const filteredItems = inputFiles.filter((_file) => _file !== file);
    setInputFiles(filteredItems);
  };

  const submitImages = async (files) => {
    const bookData = JSON.parse(localStorage.getItem('bookData'));
    const { dateOfBooking } = bookData;
    const { name, email, phoneNumber, postalCode } = bookData.personalData;

    const formData = new FormData();
    formData.append('bookData', JSON.stringify(bookData));
    formData.append('dateOfBooking', dateOfBooking);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('postalCode', postalCode);

    files.forEach((file) => {
      formData.append('filesize', file.size);
      formData.append('files', file);
    });

    setIsSubmitting(true);
    console.log(formData);
    const uploadResult = await upload(formData);
    setIsSubmitting(false);
    if (uploadResult?.status === 'success') {
      enqueueSnackbar('Images are submitted successfuly!', { variant: 'primary' });
      console.log('Test', uploadResult);
      navigate('/book/thankyou');
    } else navigate('something-went-wrong');
  };

  return (
    <RootStyle title="Submit | Photos">
      <Container>
        <MotionContainer initial="initial" open>
          <motion.div variants={varFadeInUp}>
            <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
              <Typography variant="h3" paragraph>
                Hi {name}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Submit Photos for a Detailed Quote and Request an in-Home Consultation
              </Typography>
            </Box>
            <UploadMultiFile
              accept="image/*"
              isSubmitting={isSubmitting}
              onUpload={submitImages}
              showPreview
              files={inputFiles}
              onDrop={handleDropMultiFile}
              onRemove={handleRemove}
              onRemoveAll={handleRemoveAll}
            />
          </motion.div>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
