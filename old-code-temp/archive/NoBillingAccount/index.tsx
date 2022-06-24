/* eslint-disable */
import styles from '../../../../styles/Account/Account.module.css';

const NoBillingAccount = () => {
    return (
        <div className={styles.accountDivContainer}>
            <h1 className={styles.title}>No billing account linked</h1>
            <span className={styles.billingOptionContainer}>
                <section className={styles.billingOptionCard}>
                    <h1 className={styles.rowInfo}>Basic</h1>
                    <h3 className={styles.rowInfo}>$14/month</h3>
                    <h3 className={styles.rowInfo}>Features</h3>
                    <p className={styles.pInfo}>Feature 1</p>
                    <p className={styles.pInfo}>Feature 2</p>
                    <p className={styles.pInfo}>Feature 3</p>
                    <p className={styles.pInfo}>Feature 4</p>
                    <p className={styles.pInfo}>Feature 5</p>
                </section>
                <section className={styles.billingOptionCard}>
                    <h1 className={styles.rowInfo}>Profesional</h1>
                    <h3 className={styles.rowInfo}>$29/month</h3>
                    <h3 className={styles.rowInfo}>Features</h3>
                    <p className={styles.pInfo}>Feature 1</p>
                    <p className={styles.pInfo}>Feature 2</p>
                    <p className={styles.pInfo}>Feature 3</p>
                    <p className={styles.pInfo}>Feature 4</p>
                    <p className={styles.pInfo}>Feature 5</p>
                </section>
            </span>
        </div>
    )
}

export default NoBillingAccount;