import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { ArrowDown2 } from "iconsax-react";

const AccountSupport = ({ theme }) => {
    return (
        <>
            <div className="d-flex flex-column">
                <p>If you need help related to your account, we can help you.</p>
                <Accordion sx={{
                    marginTop: '12px',
                    width: '80%',
                    bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                    color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                    border: 'none',
                    boxShadow: 'none',
                    '&:before': {
                        bgcolor: 'transparent',
                    },
                    '@media screen and (max-width: 768px)': {
                        width: '100%',
                    },
                    boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                    borderRadius: '24px !important',
                }}>
                    <AccordionSummary
                        expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>General help</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p>Visit our help center to learn how to get started with buying, selling, and creating.</p>
                    </AccordionDetails>
                </Accordion>

                <Accordion sx={{
                    marginTop: '12px',
                    width: '80%',
                    bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                    color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                    border: 'none',
                    boxShadow: 'none',
                    '&:before': {
                        bgcolor: 'transparent',
                    },
                    '@media screen and (max-width: 768px)': {
                        width: '100%',
                    },
                    boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                    borderRadius: '24px !important',
                }}>
                    <AccordionSummary
                        expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>contact open sea support</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p>Visit our help center to learn how to get started with buying, selling, and creating.</p>
                    </AccordionDetails>
                </Accordion>

                <Accordion sx={{
                    marginTop: '12px',
                    width: '80%',
                    bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                    color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                    border: 'none',
                    boxShadow: 'none',
                    '&:before': {
                        bgcolor: 'transparent',
                    },
                    '@media screen and (max-width: 768px)': {
                        width: '100%',
                    },
                    boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                    borderRadius: '24px !important',
                }}>
                    <AccordionSummary
                        expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>help with a compromised account</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p>Visit our help center to learn how to get started with buying, selling, and creating.</p>
                    </AccordionDetails>
                </Accordion>

                <Accordion sx={{
                    marginTop: '12px',
                    width: '80%',
                    bgcolor: theme == 'light' ? "#F9F9F9" : "#272448",
                    color: theme == 'light' ? "#4d4d4d" : "#e6e6e6",
                    border: 'none',
                    boxShadow: 'none',
                    '&:before': {
                        bgcolor: 'transparent',
                    },
                    '@media screen and (max-width: 768px)': {
                        width: '100%',
                    },
                    boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.07)',
                    borderRadius: '24px !important',
                }}>
                    <AccordionSummary
                        expandIcon={<ArrowDown2 color={theme == 'light' ? "#333333" : "#e6e6e6"} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>cancel all ethereum listings offer</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <p>Visit our help center to learn how to get started with buying, selling, and creating.</p>
                    </AccordionDetails>
                </Accordion>


            </div>
        </>
    );
}

export default AccountSupport;