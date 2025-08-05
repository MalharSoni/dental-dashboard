# Vercel Environment Variables Setup

Your dental dashboard is deployed at: https://dental-dashboard1.vercel.app/
Deployment details: https://vercel.com/malhar-sonis-projects/dental-dashboard1

To make it fully functional, you need to add the following environment variables in your Vercel dashboard:

## Required Environment Variables

1. **BETTER_AUTH_SECRET**
   - Description: Secret key for authentication (use a strong random string)
   - Example: `your-super-secret-key-change-this-in-production`
   - Generate one: `openssl rand -base64 32`

2. **BETTER_AUTH_URL**
   - Description: Your production URL
   - Value: `https://dental-dashboard1.vercel.app`

3. **NEXT_PUBLIC_URL**
   - Description: Public URL for the app
   - Value: `https://dental-dashboard1.vercel.app`

4. **GOOGLE_SHEETS_SHEET_ID**
   - Description: Your Google Sheets ID
   - Value: `1t5WNH7g7Osjzh-wS2FnZJtywSFLa2Gak_w5QspggKtI` (or your own sheet ID)

5. **GOOGLE_SHEETS_CLIENT_EMAIL**
   - Description: Service account email from Google Cloud Console
   - Example: `your-service-account@your-project.iam.gserviceaccount.com`

6. **GOOGLE_SHEETS_PRIVATE_KEY**
   - Description: Private key from your Google service account JSON
   - Format: The entire private key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
   - Important: In Vercel, paste the key exactly as it appears in your JSON file

## How to Add Environment Variables in Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project: `dental-dashboard1`
3. Click on "Settings" tab
4. Navigate to "Environment Variables" in the left sidebar
5. Add each variable:
   - Enter the variable name (e.g., `BETTER_AUTH_SECRET`)
   - Enter the value
   - Select environments (Production, Preview, Development)
   - Click "Save"

## Google Sheets Service Account Setup

If you haven't set up a Google service account yet:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google Sheets API
4. Create a service account:
   - Go to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Download the JSON key file
5. Share your Google Sheet with the service account email
6. Extract `client_email` and `private_key` from the JSON file

## After Adding Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to "Deployments"
3. Click on the three dots menu on your latest deployment
4. Select "Redeploy"
5. This will rebuild with the new environment variables

## Testing

After redeployment, test the following:
- Login functionality at `/login`
- Dashboard data loading at `/dashboard`
- Google Sheets integration on various pages

## Troubleshooting

If you encounter issues:
1. Check the Vercel function logs for errors
2. Ensure all environment variables are correctly set
3. Verify Google Sheets permissions
4. Check that the service account has access to your Google Sheet