import React, {
    useState,
    useEffect
} from 'react';
import PageTemplate from '../../components/PageTemplate';
import TopNav from '../../components/Account/AccountNav';
import Security from '../../components/Account/Security';
import Address from '../../components/Account/Address';
import { Box, Card } from '@mui/material'
import { useRouter } from 'next/router'

export default function Home() {
    const router = useRouter();
    const [settingToDisplay, setSettingToDisplay] = useState('security');

    useEffect(() => {
        router.push(`${router.pathname}?q=security`)
    }, [])

    useEffect(() => {
        switch (router.query.q) {
            case 'account':
            setSettingToDisplay('account')
                break;
            case 'security':
            setSettingToDisplay('security')
                break;
            case 'privacy':
            setSettingToDisplay('privacy')
                break;
            case 'privacy':
                setSettingToDisplay('privacy')
                break;
            case 'help':
                setSettingToDisplay('help')
                break;
            case 'additional':
                setSettingToDisplay('additional')
                break;
        }
    }, [router])

    return (
        <PageTemplate description="Account settings page for Earmark" title="Account">
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                margin: 'auto',
                width: '100%',
                height: '100%',
            }}>
                <TopNav />
                { settingToDisplay == 'security' ? <Security /> : null}
                { settingToDisplay == 'account' ? <Address /> : null}
            </Box>
        </PageTemplate>
    )
}