import { ToastContainer } from 'react-toastify';
import { Grid, Accordion, AccordionSummary, Icon, Typography, AccordionDetails, styled } from '@mui/material';
import { useRef, useState } from 'react';
import RegisterDocument from './RegisterDocument';
import SalaryIncrease from './SalaryIncrease';
import Promote from './Promote';
import ProposeAdvisory from './ProposeAdvisory';

const MyAccordionSummary = styled(AccordionSummary)({
  background: 'rgba(34,42,69, 0.9)',
  height: 64,
  borderRadius: '4px',
  color: '#fff',
  '& .icon': {
    color: '#fff',
  },
});

const UpdateOptions = () => {
  const accordion1Ref = useRef(null);
  const accordion2Ref = useRef(null);
  const accordion3Ref = useRef(null);
  const accordion4Ref = useRef(null);

  const [expanded, setExpanded] = useState({
    panel1: false,
    panel2: false,
    panel3: false,
    panel4: false,
  });

  const handleChange = (panel, accordionRef) => (event, isExpanded) => {
    const newExpanded = { ...expanded };
    newExpanded[panel] = isExpanded ? panel : false;
    setExpanded(newExpanded);
    accordionRef.current.scrollIntoView();
  };

  const handleClose = (panel) => {
    const newExpanded = { ...expanded };
    newExpanded[panel] = false;
    setExpanded(newExpanded);
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Accordion
            ref={accordion1Ref}
            expanded={expanded.panel1 === 'panel1'}
            onChange={handleChange('panel1', accordion1Ref)}
          >
            <MyAccordionSummary
              sx={{ backgroundColor: 'var(--primary)' }}
              className="update-option"
              expandIcon={<Icon className="icon">expand_more</Icon>}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Đăng kí hồ sơ</Typography>
            </MyAccordionSummary>
            <AccordionDetails>
              <RegisterDocument
                handleClose={() => {
                  handleClose('panel1');
                }}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion
            ref={accordion2Ref}
            expanded={expanded.panel2 === 'panel2'}
            onChange={handleChange('panel2', accordion2Ref)}
          >
            <MyAccordionSummary
              sx={{ backgroundColor: 'var(--primary)' }}
              expandIcon={<Icon className="icon">expand_more</Icon>}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Tăng lương</Typography>
            </MyAccordionSummary>
            <AccordionDetails>
              <SalaryIncrease
                handleClose={() => {
                  handleClose('panel2');
                }}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion
            ref={accordion3Ref}
            expanded={expanded.panel3 === 'panel3'}
            onChange={handleChange('panel3', accordion3Ref)}
          >
            <MyAccordionSummary
              sx={{ backgroundColor: 'var(--primary)' }}
              expandIcon={<Icon className="icon">expand_more</Icon>}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Thăng chức</Typography>
            </MyAccordionSummary>
            <AccordionDetails>
              <Promote
                handleClose={() => {
                  handleClose('panel3');
                }}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion
            ref={accordion4Ref}
            expanded={expanded.panel4 === 'panel4'}
            onChange={handleChange('panel4', accordion4Ref)}
          >
            <MyAccordionSummary
              sx={{ backgroundColor: 'var(--primary)' }}
              expandIcon={<Icon className="icon">expand_more</Icon>}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Đề xuất tham mưu</Typography>
            </MyAccordionSummary>
            <AccordionDetails>
              <ProposeAdvisory
                handleClose={() => {
                  handleClose('panel4');
                }}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
};

export default UpdateOptions;
