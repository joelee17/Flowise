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
                
                {/* Agent Registration Information */}
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
                        Agent System of Record Registration
                    </Typography>
                    
                    <Typography variant='body1' sx={{ mb: 3, lineHeight: 1.6, px: 2 }}>
                        Registering this agent flow will make it available in the Workday Agent System of Record, 
                        allowing it to be discovered and configured within your Workday tenant.
                    </Typography>
                    
                    <Box sx={{ 
                        bgcolor: 'primary.light', 
                        p: 3, 
                        borderRadius: 2, 
                        border: '1px solid', 
                        borderColor: 'primary.main',
                        mx: 2
                    }}>
                        <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 2, color: 'primary.dark' }}>
                            What happens when you register:
                        </Typography>
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography variant='body2' sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: '8px', color: '#4caf50', fontWeight: 'bold' }}>✓</span>
                                Agent becomes registered within your Workday tenant
                            </Typography>
                            <Typography variant='body2' sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: '8px', color: '#4caf50', fontWeight: 'bold' }}>✓</span>
                                Sequence generator is created for the agent
                            </Typography>
                            <Typography variant='body2' sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: '8px', color: '#4caf50', fontWeight: 'bold' }}>✓</span>
                                Agent becomes configurable within Workday Agent System of Record
                            </Typography>
                            <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: '8px', color: '#4caf50', fontWeight: 'bold' }}>✓</span>
                                Enables governance and compliance tracking for this agent
                            </Typography>
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
