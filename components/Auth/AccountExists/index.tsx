/* eslint-disable */
import Link from 'next/link'
const AccountExists = () => {
    return (
        <div>
            <p>You already have an account.</p>
            <p>Click <Link className="link" href="/account/dashboard">here</Link> to visit your dashboard</p>
            <p>Click <Link className="link" href="/account/account">here</Link> to visit your account settings</p>
        </div>
    )
}

export default AccountExists;