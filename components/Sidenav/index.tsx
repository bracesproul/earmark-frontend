/* eslint-disable */
import React, {
    useState,
} from 'react';
import { useRouter } from 'next/router';
import useCollapse from 'react-collapsed'
import PlaidLink from '../PlaidLink';

const Sidenav = ({ accounts }) => {
    const router = useRouter()
    const [isExpanded, setExpanded] = useState(false)
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })

    const handleClick = (e: any) => {
        let id: string;
        if (e === "transactions") {
            id = "transactions"
            const currentPath = router.query
            if (currentPath && currentPath.transactions) {
                router.push(`/dashboard?transactions=${currentPath.transactions}`)
            } else return
        } else {
            id = e.target.id
            router.push(`/dashboard?${id}`)
            return;
        }
        
    }

    // TODO: Fix bug where onClick all transactions, account name above txn list doesn't update

    const handleAccountClick = (bank_name: string, account_id: string) => {
        if (bank_name && account_id === "null") {
            setExpanded(false)
            return router.push(`/dashboard`)
        }
        router.push(`/dashboard?transactions=${bank_name}?id=${account_id}`)
        setExpanded(false)
    }


    return (
        <>
       <div className="side_nav_container">
            <a onClick={e => handleClick("transactions")}>
                <h3 id="transactions" className="transactions_side_nav" {...getToggleProps({ 
                    onClick: () => setExpanded((prevExpanded) => !prevExpanded) 
                    })}>
                    {isExpanded ? 'Transactions' : 'Transactions'}
                </h3>
            </a>
            <section {...getCollapseProps()}>
                {accounts ? 
                    <>
                    <a onClick={e => handleAccountClick("null", "null")}>
                        <p className="account_dropdown_list">All Transactions</p>
                    </a>
                    {accounts.map((acc: any, index: any) => {
                    return (
                        <a onClick={e => handleAccountClick(acc.accounts.pathname, acc.accounts.account_id)} key={index}>
                            <p className="account_dropdown_list" key={index}>{acc.accounts.name}</p>
                        </a>
                    ) 
                    })}
                    </> 
                    : <p>Loading...</p>
                }
            </section>

            <a onClick={e => handleClick(e)}>
            <h3 id="accounts" className="accounts_side_nav">Accounts</h3>
            </a>
            

            <a onClick={e => handleClick(e)}>
            <h3 id="investments" className="investments_side_nav">Investments</h3>
            </a>

            <a onClick={e => handleClick(e)}>
            <h3 id="transfers" className="transfers_side_nav">Transfers</h3>
            </a>
            <PlaidLink user_id="M1uTm2PnWUY8CZCwdx32aBMLWkZ2" />
            {/* 
            <a>
            <h3 id="plaidLink" className="plaidLink_side_nav">Connect Accounts</h3>
            </a>
            */}

            <hr />
        </div>
        <Auth />
        </>


    )
}

const Auth = () => {
    const router = useRouter()

    const handleClick = (id: string) => {
        router.push(`/${id}`)
    }

    return (
        <div className="auth_container">
            <a onClick={() => handleClick("account")}>
                <h3 id="account" className="account">Account</h3>
            </a>
            <a onClick={() => handleClick("auth")}>
                <h3 id="auth" className="auth">Sign Out</h3>
            </a>
        </div>
    )
}

export default Sidenav;