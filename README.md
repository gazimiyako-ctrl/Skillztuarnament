# Tournament Arena — Firebase/Vercel

This package is a tournament-oriented starter with Firebase Authentication + Firestore.

## Included
- Signup/Login
- Tournament tiers ৳20 / ৳50 / ৳100
- Waiting queue and automatic 2-player match creation
- 30-second tap skill game
- Live opponent score updates
- Result screen
- Wallet balance field
- Deposit request workflow (admin approval)
- Withdrawal request workflow (admin approval)
- Admin monitoring page

## Firebase setup
1. Create a Firebase project and Web App.
2. Enable Authentication > Email/Password.
3. Create Cloud Firestore.
4. Put the Web App config in both `app.js` and `admin.js`.
5. Deploy the rules in `firestore.rules`.
6. Deploy the folder to Vercel as a static site.

## Admin security
The demo admin page uses the same Firebase login only to keep the example simple. For production, DO NOT rely on the page being hidden. Create an `admins/{uid}` record or Firebase custom admin claims and enforce admin-only reads/writes in Firestore rules / Cloud Functions.

## Real-money note
The deposit/withdraw module here is an admin-approved request ledger, not an automated payment gateway. It records transaction references and lets an authorized backend/admin approve or reject them. Do not treat client-side wallet values as authoritative for real-money use. For a live money product, wallet debits/credits, tournament entry locks, prize settlement, refunds, and score validation must be server-authoritative (e.g. Cloud Functions/Admin SDK), with proper payment-provider verification, fraud controls, age/KYC requirements where applicable, and legal review in the operating jurisdiction.

Firebase Authentication and Firestore are designed to work together for authenticated access and realtime data; use Security Rules and App Check for production hardening.
