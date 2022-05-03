import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
// material
import {
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Box,
  Stack,
  TextField
} from '@material-ui/core';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import Check from '@material-ui/icons/Check';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import { varFadeIn, varWrapEnter, varFadeInRight, TextAnimate, MotionInView } from '../components/animate';
import { SelectType, GetPersonalData } from '../components/booking';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------
const SERVICE_DATA = [
  {
    type: 'stand-up',
    packages: [
      {
        title: 'Essential Package',
        budget: '299',
        services:
          'steam clean of tile and grout, glass cleaning, all shower fixtures & remove and replace all silicone from tile, grout and glass'
      },
      {
        title: 'Deluxe Package',
        budget: '599',
        services:
          'Essential Package PLUS colour sealing of all grout lines on walls and ceiling, custom colours available'
      },
      {
        title: 'Complete Package',
        budget: '799',
        services: 'Deluxe Package PLUS re-grout shower floor with e-proxy based grout'
      }
    ],
    add_ons: [
      {
        service: 'Traces of Black Mould/Mildew',
        budget: '99'
      },
      {
        service: 'Rectangular/Larger Size Shower',
        budget: '99'
      },
      {
        service: 'Missing/DamagedGrout',
        budget: '99'
      },
      {
        service: 'Glass Cleaning',
        budget: '75'
      },
      {
        service: 'Replace Plastic Strip on Glass Door',
        budget: '30'
      }
    ]
  },
  {
    type: 'bathtub',
    packages: [
      {
        title: 'Essential Package',
        budget: '299',
        services:
          'steam clean of tile and grout, glass cleaning, all shower fixtures & remove and replace all silicone caulking'
      },
      {
        title: 'Complete Package',
        budget: '499',
        services:
          'Essential Package PLUS colour sealing of all grout lines on walls and ceiling, custom colours available'
      }
    ],
    add_ons: [
      {
        service: 'Traces of Black Mould/Mildew',
        budget: '99'
      },
      {
        service: 'Rectangular/Larger Size Shower',
        budget: '99'
      },
      {
        service: 'Missing/DamagedGrout',
        budget: '99'
      },
      {
        service: 'Glass Door Cleaning',
        budget: '75'
      },
      {
        service: 'Window',
        budget: '49'
      }
    ]
  }
];

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)'
  },
  active: {
    '& $line': {
      borderColor: '#784af4'
    }
  },
  completed: {
    '& $line': {
      borderColor: '#784af4'
    }
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1
  }
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center'
  },
  active: {
    color: '#784af4'
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor'
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18
  }
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22
  },
  active: {
    '& $line': {
      backgroundImage: 'linear-gradient( 136deg, rgb(0,0,0) 0%, rgb(0,0,0) 50%, rgb(0,0,0) 100%)'
    }
  },
  completed: {
    '& $line': {
      backgroundImage: 'linear-gradient( 136deg, rgb(0,0,0) 0%, rgb(0,0,0) 50%, rgb(0,0,0) 100%)'
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1
  }
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  active: {
    backgroundImage: 'linear-gradient( 136deg, rgb(0,0,0) 0%, rgb(0,0,0) 50%, rgb(0,0,0) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  },
  completed: {
    backgroundImage: 'linear-gradient( 136deg, rgb(0,0,0) 0%, rgb(0,0,0) 50%, rgb(0,0,0) 100%)'
  }
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(5)
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

function getSteps() {
  return ['Select shower type', 'Service packages', 'Select date and time'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Hi there, lets start with the basics. What types of shower are you interested in restoring?';
    case 1:
      return 'Lets save your progress before continuing.';
    case 2:
      return 'Select date and time to start.';
    default:
      return 'Unknown step';
  }
}

export default function PageProcessing() {
  const theme = useTheme();
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [bookData, setBookData] = useState({});

  const steps = getSteps(); // ==3

  const handleServiceTypeData = (serviceTypeData) => {
    setBookData({ ...bookData, serviceTypeData });
  };
  const handlePersonalData = (personalData) => {
    setBookData({ ...bookData, personalData });
  };

  const getServiceAndNext = (value) => {
    SERVICE_DATA.map((item) => {
      const { type } = item;
      if (type === value) {
        handleServiceTypeData(item);
      }
      return console.log('bookData');
    });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleNext = () => {
    setActiveStep((preActiveStep) => preActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const navigate = useNavigate();
  const routeBack = () => {
    navigate('/');
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Page title="Service Shower">
      <Container maxWidth="lg">
        <Button
          color="inherit"
          // disabled={activeStep === 0}
          onClick={activeStep === 0 ? routeBack : handleBack}
          sx={{ mr: 1 }}
          startIcon={<ArrowBackIcon />}
        >
          Previous
        </Button>
        <div className={classes.root}>
          <Stepper sx={{ width: '100%' }} alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box
            sx={{ width: '50%', marginTop: '5vh', [theme.breakpoints.down('md')]: { width: '100%', marginTop: '1vh' } }}
          >
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>All steps completed - you&apos;re finished</Typography>
                <Button onClick={handleReset} className={classes.button}>
                  Reset
                </Button>
              </div>
            ) : (
              <Card>
                <CardHeader title={getStepContent(activeStep)} />
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    [theme.breakpoints.down('sm')]: { padding: theme.spacing(2, 1) }
                  }}
                >
                  <Divider />
                  <Box m={4} />
                  {activeStep === 0 && <SelectType onNext={getServiceAndNext} />}
                  {activeStep === 1 && <GetPersonalData getPersonalDataProps={handlePersonalData} />}
                  {activeStep === 2 && <Typography>This is third</Typography>}
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    {activeStep === 1 && (
                      <Button
                        color="inherit"
                        // disabled={activeStep === 0}
                        onClick={handleNext}
                        sx={{ mr: 1 }}
                        // startIcon={<ArrowBackIosIcon />}
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>
        </div>
      </Container>
    </Page>
  );
}
