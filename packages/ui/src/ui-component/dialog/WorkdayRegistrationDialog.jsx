import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography } from '@mui/material'
import { StyledButton } from '@/ui-component/button/StyledButton'
import workdayLogo from '@/assets/images/workday-logo.png'

const WorkdayRegistrationDialog = ({ show, dialogProps, onCancel, onRegister }) => {
    const portalElement = document.getElementById('portal')

    const component = show ? (
        <Dialog
            open={show}
            fullWidth
            maxWidth='md'
            onClose={onCancel}
            aria-labelledby='workday-registration-dialog-title'
            aria-describedby='workday-registration-dialog-description'
            disableRestoreFocus // needed due to StrictMode
        >
            <DialogTitle sx={{ fontSize: '1.2rem', textAlign: 'center', pb: 1 }} id='workday-registration-dialog-title'>
                {dialogProps.title}
            </DialogTitle>
            <DialogContent sx={{ py: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <img 
                        src={workdayLogo} 
                        alt="Workday Logo" 
                        style={{ 
                            height: '60px', 
                            width: 'auto',
                            objectFit: 'contain'
                        }} 
                    />
                </Box>
                
                {/* Description Section */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
                        Description:
                    </Typography>
                    <Typography variant='body2' sx={{ mb: 2, lineHeight: 1.6, textAlign: 'left' }}>
                        This is a helper agent for determining full sessions and heavy booth traffic. It will automatically create a new session for full sessions, as well as assign Workday personnel shifts to booths that have heavier traffic.
                    </Typography>
                </Box>

                {/* Skills Section */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                        Skills:
                    </Typography>
                    
                    {/* Analyze data from Rainfocus */}
                    <Box sx={{ mb: 2 }}>
                        <Typography variant='body2' sx={{ fontWeight: 'medium', mb: 1 }}>
                            • Analyze data from Rainfocus
                        </Typography>
                        <Box sx={{ ml: 2 }}>
                            <Typography variant='body2' sx={{ fontWeight: 'medium', mb: 0.5, color: 'text.secondary' }}>
                                Tools:
                            </Typography>
                            <Box sx={{ ml: 2 }}>
                                <Typography variant='body2' sx={{ mb: 0.2, fontSize: '0.85rem' }}>
                                    - Analyze data with LLMs
                                </Typography>
                                <Typography variant='body2' sx={{ mb: 0.2, fontSize: '0.85rem' }}>
                                    - Deterministic Analysis for Booth Shifts
                                </Typography>
                                <Typography variant='body2' sx={{ mb: 0.2, fontSize: '0.85rem' }}>
                                    - Deterministic Analysis for Full Sessions
                                </Typography>
                                <Typography variant='body2' sx={{ mb: 0.2, fontFamily: 'monospace', fontSize: '0.75rem', color: 'primary.dark' }}>
                                    - GET Scan Information from Rainfocus (/attendeeStore/scans)
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Shift Assignment */}
                    <Box sx={{ mb: 2 }}>
                        <Typography variant='body2' sx={{ fontWeight: 'medium', mb: 1 }}>
                            • Shift Assignment
                        </Typography>
                        <Box sx={{ ml: 2 }}>
                            <Typography variant='body2' sx={{ fontWeight: 'medium', mb: 0.5, color: 'text.secondary' }}>
                                Tools:
                            </Typography>
                            <Box sx={{ ml: 2 }}>
                                <Typography variant='body2' sx={{ mb: 0.2, fontFamily: 'monospace', fontSize: '0.75rem', color: 'primary.dark' }}>
                                    - Assign Work Schedule (/Time_Tracking/v44.2/Assign_Work_Schedule)
                                </Typography>
                                <Typography variant='body2' sx={{ mb: 0.2, fontFamily: 'monospace', fontSize: '0.75rem', color: 'primary.dark' }}>
                                    - Notify Workers (api.workday.com/oe/labs/sendSms)
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Session Creation */}
                    <Box sx={{ mb: 2 }}>
                        <Typography variant='body2' sx={{ fontWeight: 'medium', mb: 1 }}>
                            • Session Creation
                        </Typography>
                        <Box sx={{ ml: 2 }}>
                            <Typography variant='body2' sx={{ fontWeight: 'medium', mb: 0.5, color: 'text.secondary' }}>
                                Tools:
                            </Typography>
                            <Box sx={{ ml: 2 }}>
                                <Typography variant='body2' sx={{ mb: 0.2, fontFamily: 'monospace', fontSize: '0.75rem', color: 'primary.dark' }}>
                                    - Create New Session (POST /sessionCreate)
                                </Typography>
                                <Typography variant='body2' sx={{ mb: 0.2, fontFamily: 'monospace', fontSize: '0.75rem', color: 'primary.dark' }}>
                                    - Notify Attendees (POST /mobileNotification)
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', fontStyle: 'italic' }}>
                    Register this agent flow with the Workday Agent System of Record?
                </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button 
                    onClick={onCancel}
                    variant="outlined"
                    sx={{ mr: 2, minWidth: '100px' }}
                >
                    {dialogProps.cancelButtonName || 'Cancel'}
                </Button>
                <StyledButton 
                    variant='contained' 
                    onClick={onRegister}
                    sx={{ minWidth: '100px' }}
                >
                    {dialogProps.confirmButtonName || 'Register'}
                </StyledButton>
            </DialogActions>
        </Dialog>
    ) : null

    return createPortal(component, portalElement)
}

WorkdayRegistrationDialog.propTypes = {
    show: PropTypes.bool,
    dialogProps: PropTypes.object,
    onCancel: PropTypes.func,
    onRegister: PropTypes.func
}

export default WorkdayRegistrationDialog
