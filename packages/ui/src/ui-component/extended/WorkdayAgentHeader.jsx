import PropTypes from 'prop-types'
import { useRef } from 'react'

// material-ui
import { IconButton, Box, OutlinedInput, Toolbar, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { StyledFab } from '@/ui-component/button/StyledFab'

// icons
import { IconSearch, IconArrowLeft, IconEdit } from '@tabler/icons-react'

// assets
import WorkdayLogoCircular from '@/assets/images/workday-logo-circular.png'

import useSearchShortcut from '@/hooks/useSearchShortcut'
import { getOS } from '@/utils/genericHelper'

const os = getOS()
const isMac = os === 'macos'
const isDesktop = isMac || os === 'windows' || os === 'linux'
const keyboardShortcut = isMac ? '[ ⌘ + F ]' : '[ Ctrl + F ]'

const WorkdayAgentHeader = ({
    children,
    filters = null,
    onSearchChange,
    search,
    searchPlaceholder = 'Search',
    isBackButton,
    onBack,
    isEditButton,
    onEdit
}) => {
    const theme = useTheme()
    const searchInputRef = useRef()
    useSearchShortcut(searchInputRef)

    return (
        <Box sx={{ flexGrow: 1, py: 1.25, width: '100%' }}>
            <Toolbar
                disableGutters={true}
                sx={{
                    p: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                    {isBackButton && (
                        <StyledFab sx={{ mr: 3 }} size='small' color='secondary' aria-label='back' title='Back' onClick={onBack}>
                            <IconArrowLeft />
                        </StyledFab>
                    )}
                    
                    {/* Workday Logo and Title */}
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', mr: 2 }}>
                        <img
                            src={WorkdayLogoCircular}
                            alt="Workday Logo"
                            style={{
                                height: '48px',
                                width: '48px',
                                marginRight: '16px',
                                objectFit: 'contain'
                            }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
                            <Typography
                                sx={{
                                    fontSize: '1.8rem',
                                    fontWeight: 600,
                                    color: '#0f2e66', // Workday dark blue
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    flex: 1,
                                    maxWidth: 'calc(100vh - 100px)'
                                }}
                                variant='h1'
                            >
                                Workday Flowise Agent Builder
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    mt: 1,
                                    color: theme.palette.text.secondary,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 5,
                                    WebkitBoxOrient: 'vertical',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    flex: 1,
                                    maxWidth: 'calc(100vh - 100px)'
                                }}
                            >
                                Multi-agent systems, workflow orchestration powered by Workday
                            </Typography>
                        </Box>
                    </Box>
                    
                    {isEditButton && (
                        <IconButton sx={{ ml: 3 }} color='secondary' title='Edit' onClick={onEdit}>
                            <IconEdit />
                        </IconButton>
                    )}
                </Box>
                
                <Box sx={{ height: 40, display: 'flex', alignItems: 'center', gap: 1 }}>
                    {filters && (
                        <Box sx={{ height: 40, display: 'flex', alignItems: 'center' }}>
                            {filters}
                        </Box>
                    )}
                    {search && (
                        <OutlinedInput
                            ref={searchInputRef}
                            id='input-search-node'
                            placeholder={isDesktop ? `${searchPlaceholder} ${keyboardShortcut}` : searchPlaceholder}
                            sx={{
                                input: {
                                    fontSize: '0.9rem',
                                    height: '35px',
                                    padding: '0 35px 0 16px'
                                }
                            }}
                            onChange={onSearchChange}
                            startAdornment={
                                <IconButton sx={{ color: theme.palette.grey[500], p: 0, mr: 2 }}>
                                    <IconSearch stroke={1.5} size='20px' />
                                </IconButton>
                            }
                        />
                    )}
                    {children && (
                        <Box sx={{ height: 40, display: 'flex', alignItems: 'center' }}>
                            {children}
                        </Box>
                    )}
                </Box>
            </Toolbar>
        </Box>
    )
}

WorkdayAgentHeader.propTypes = {
    children: PropTypes.node,
    filters: PropTypes.node,
    onSearchChange: PropTypes.func,
    search: PropTypes.bool,
    searchPlaceholder: PropTypes.string,
    isBackButton: PropTypes.bool,
    onBack: PropTypes.func,
    isEditButton: PropTypes.bool,
    onEdit: PropTypes.func
}

export default WorkdayAgentHeader