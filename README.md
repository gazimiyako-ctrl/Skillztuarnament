# Tournament Arena — Firebase/Vercel Admin-Ready (Points Version)

This package is a safe, non-cash tournament/game starter.

## Included
- Firebase Email/Password authentication
- Protected Admin Panel
- Admin authorization using `admins/{uid}`
- Firestore rules that prevent players from changing their own points
- Waiting queue + two-player match creation
- 30-second skill game
- Live scores
- Tournament collection for admin-managed tournament records
- Vercel static deployment support

## IMPORTANT
The original ZIP contained deposit/withdrawal and balance/prize flows. Those are intentionally not included in this ready package. Do not use client-side Firestore writes as authority for real-money balances, deposits, withdrawals, entry fees, or prize payouts.

## Firebase setup
1. Firebase Console → Authentication → enable Email/Password.
2. Firebase Console → Firestore Database → create database.
3. Deploy `firestore.rules`.
4. Create your admin user under Authentication.
5. Copy that user's UID.
6. Firestore → create collection `admins`.
7. Create a document whose ID is exactly the admin UID. It can contain:
   `{ "role": "admin", "createdAt": <timestamp> }`
8. Keep the Firebase web config in `app.js` and `admin.js` matched to your project.
9. Upload the `firebase-matchmaking` folder to Vercel.

## Admin URL
After Vercel deployment:
`https://YOUR-DOMAIN/admin.html`

## Recommended production hardening
- Enable Firebase App Check.
- Keep admin accounts separate from normal player accounts.
- Use a server-side backend/Cloud Functions for any future authoritative game result or non-cash rewards.
- Add audit logs for administrative actions.
