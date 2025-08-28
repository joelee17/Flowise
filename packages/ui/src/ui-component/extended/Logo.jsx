import WorkdayLogoCircular from '@/assets/images/workday-logo-circular.png'
import { useSelector } from 'react-redux'

// ==============================|| WORKDAY LOGO ||============================== //

const Logo = () => {
    const customization = useSelector((state) => state.customization)

    return (
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', marginLeft: '10px' }}>
            <img
                style={{ 
                    objectFit: 'contain', 
                    height: '40px', 
                    width: '40px',
                    marginRight: '12px'
                }}
                src={WorkdayLogoCircular}
                alt='Workday'
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ 
                    fontSize: '18px', 
                    fontWeight: 600, 
                    color: customization.isDarkMode ? '#ffffff' : '#0f2e66',
                    lineHeight: '1.2'
                }}>
                    Workday Flowise
                </span>
                <span style={{ 
                    fontSize: '12px', 
                    fontWeight: 400, 
                    color: customization.isDarkMode ? '#cccccc' : '#666666',
                    lineHeight: '1.2'
                }}>
                    Agent Builder
                </span>
            </div>
        </div>
    )
}

export default Logo
