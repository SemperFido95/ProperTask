import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Tooltip from '@mui/material/Tooltip';

export default function ControlledAccordions({ id, task, complete }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div style={{ width: '50%', marginRight: 'auto' }}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
                style={{ border: 'none', paddingLeft: 0 }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography>
                        {task}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ padding: 0 }}>
                    <ul style={{ display: 'flex', justifyContent: 'space-between', width: '25%', paddingLeft: 0 }}>
                        <li>
                            <Tooltip title="complete">
                                <IconButton>
                                    <CheckCircleOutlineIcon />
                                </IconButton>
                            </Tooltip>
                        </li>
                        <li>
                            <Tooltip title="edit">
                                <IconButton>
                                    <EditOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        </li>
                        <li>
                            <Tooltip title="delete">
                                <IconButton>
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </Tooltip>
                        </li>
                    </ul>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}