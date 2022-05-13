/* eslint-disable */
import Link from "next/link";
import styles from '../../../styles/Misc/NotSignedIn.module.css'

const NotSignedIn = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>You are not signed in</h1>
            <Link href="/auth/signIn">
                <h3 className={styles.link}>Click here to sign in</h3>
            </Link>
            <Link href="/auth/signUp">
                <h3 className={styles.link}>Click here to sign up</h3>
            </Link>
        </div>
    )
};

export default NotSignedIn;