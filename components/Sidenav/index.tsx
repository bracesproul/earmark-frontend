/* eslint-disable */
import React, {
    useState,
} from 'react';
import { useRouter } from 'next/router';
import useCollapse from 'react-collapsed'
import PlaidLink from '../PlaidLink';
import Link from 'next/link';

const Sidenav = ({ accounts }) => {
    const router = useRouter()
    const [isExpanded, setExpanded] = useState(false)
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })

    const handleClick = (e) => {
        let id;
        if (e === "transactions") {
            id = "transactions"
            const currentPath = router.query
            if (currentPath && currentPath.transactions) {
                router.push(`/account/dashboard?transactions=${currentPath.transactions}`)
            } else return
        } else {
            id = e.target.id
            router.push(`/account/dashboard?${id}`)
            return;
        }
        
    }

    // TODO: Fix bug where onClick all transactions, account name above txn list doesn't update

    const handleAccountClick = (bank_name, account_id) => {
        if (bank_name && account_id === "null") {
            setExpanded(false)
            return router.push(`/account/dashboard`)
        }
        router.push(`/account/dashboard?transactions=${bank_name}?id=${account_id}`)
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
                    {accounts.map((acc, index) => {
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
            <Link href="/account/visualize">
                <h3 id="visualize" className="visualize_side_nav">Visualize Data</h3>
            </Link>

            <Link href="/account/institutions">
            <h3 id="accounts" className="accounts_side_nav">Institutions</h3>
            </Link>
            

            <Link href="/account/investments">
            <h3 id="investments" className="investments_side_nav">Investments</h3>
            </Link>

            <Link href="/account/transfers">
            <h3 id="transfers" className="transfers_side_nav">Transfers</h3>
            </Link>

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
    return (
        <div className="auth_container">
            <Link href="/account">
                <h3 id="account" className="account">Account</h3>
            </Link>
            <Link href="/auth/signIn">
                <h3 id="auth" className="auth">Sign Out</h3>
            </Link>
        </div>
    )
}

export default Sidenav;