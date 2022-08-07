export function formatAmounts(amount:number | string) {
    if (typeof amount === 'string') amount = parseInt(amount);
    amount = amount.toFixed(2);
    if (amount.includes('-')) {
        amount = amount.replace('-', '-$');
    } else {
        amount = `$${amount}`;
    }
    return amount;
}