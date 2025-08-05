# 🔧 Complete Google Sheets API Setup Guide

## 📋 Overview
This guide will walk you through connecting your dashboard to your Google Sheet for real-time data integration.

## 🚀 Step-by-Step Setup

### Step 1: Google Cloud Console Setup

1. **Visit Google Cloud Console**
   - Go to: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create New Project**
   - Click "Select a project" → "New Project"
   - Project Name: `SmilePoint Dashboard`
   - Click "Create"

3. **Enable APIs**
   - Go to "APIs & Services" → "Library"
   - Search and enable:
     - ✅ **Google Sheets API**
     - ✅ **Google Drive API**

### Step 2: Service Account Creation

1. **Create Service Account**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Name: `dashboard-service-account`
   - Description: `Service account for SmilePoint Dashboard`
   - Click "Create and Continue"

2. **Assign Role**
   - Role: Select `Editor`
   - Click "Continue" → "Done"

3. **Generate Key**
   - Click on your new service account
   - Go to "Keys" tab
   - Click "Add Key" → "Create New Key"
   - Choose **JSON** format
   - Download and save the JSON file securely

### Step 3: Configure Your Google Sheet

1. **Open Your Sheet**
   - Go to: https://docs.google.com/spreadsheets/d/1t5WNH7g7Osjzh-wS2FnZJtywSFLa2Gak_w5QspggKtI/edit

2. **Create Required Tabs**
   - Create 4 tabs named exactly:
     - `Call Logs`
     - `Appointments`
     - `Voicemails`
     - `AI Activity`

3. **Add Column Headers**

   **Call Logs Tab (Row 1):**
   ```
   Caller Name | Phone Number | Call Type | Duration | Timestamp | Status | Notes
   ```

   **Appointments Tab (Row 1):**
   ```
   Patient Name | Phone Number | Appointment Type | Date | Time | Status | Notes
   ```

   **Voicemails Tab (Row 1):**
   ```
   Caller Name | Phone Number | Duration | Timestamp | Transcription | Urgent | Listened
   ```

   **AI Activity Tab (Row 1):**
   ```
   Agent Name | Agent Type | Task Description | Timestamp | Status | Response Time
   ```

4. **Share with Service Account**
   - From your downloaded JSON file, copy the `client_email` value
   - In your Google Sheet, click "Share"
   - Paste the service account email
   - Give it "Editor" permissions
   - Click "Send"

### Step 4: Configure Environment Variables

1. **Open `.env.local` file** in your dashboard project

2. **Update with your credentials:**
   ```env
   # Replace with values from your downloaded JSON file
   GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour actual private key here\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEETS_CLIENT_EMAIL="your-service-account@your-project.iam.gserviceaccount.com"
   GOOGLE_SHEETS_SHEET_ID="1t5WNH7g7Osjzh-wS2FnZJtywSFLa2Gak_w5QspggKtI"
   ```

   **⚠️ Important:** 
   - Copy the entire `private_key` from your JSON file (including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`)
   - Keep the `\n` characters in the private key
   - Use the exact `client_email` from your JSON file

### Step 5: Test Your Connection

1. **Install dotenv for testing:**
   ```bash
   npm install dotenv
   ```

2. **Run the test script:**
   ```bash
   node src/scripts/test-google-sheets.js
   ```

3. **Expected Output:**
   ```
   🔍 Testing Google Sheets connection...
   
   Environment Variables:
   ✓ CLIENT_EMAIL: Set
   ✓ PRIVATE_KEY: Set
   ✓ SHEET_ID: Set
   
   ✅ Successfully connected to Google Sheets!
   📊 Sheet Title: SmilePoint Dashboard Data
   📝 Number of sheets: 4
   
   Available sheets:
     1. Call Logs (0 rows)
     2. Appointments (0 rows)
     3. Voicemails (0 rows)
     4. AI Activity (0 rows)
   
   🎉 Google Sheets integration is ready!
   ```

### Step 6: Add Sample Data (Optional)

Add some sample data to test the integration:

**Call Logs:**
```
Emma Wilson | +1 (555) 123-4567 | incoming | 4:32 | 2024-08-05 10:30:00 | answered | Routine inquiry
Michael Chen | +1 (555) 234-5678 | outgoing | 2:15 | 2024-08-05 09:45:00 | answered | Follow-up call
```

**Appointments:**
```
Emma Wilson | +1 (555) 123-4567 | Routine Cleaning | 2024-08-05 | 09:00 | completed | On time
Michael Chen | +1 (555) 234-5678 | Dental Filling | 2024-08-05 | 10:30 | scheduled | Cavity treatment
```

## 🎉 You're Done!

Restart your dashboard and it will automatically connect to your Google Sheet:

```bash
npm run dev
```

Visit `http://localhost:3000` to see your dashboard with real data from Google Sheets!

## 🔧 Troubleshooting

### Common Issues:

1. **"Service account not found"**
   - Make sure you shared the sheet with the correct service account email
   - Check that the email in `.env.local` matches exactly

2. **"Invalid private key"**
   - Copy the entire private key including begin/end markers
   - Make sure `\n` characters are preserved
   - Wrap the key in quotes in your `.env.local`

3. **"Sheet not found"**
   - Verify the sheet ID in your URL matches `.env.local`
   - Ensure the sheet is accessible (not deleted)

4. **"Permission denied"**
   - Check that APIs are enabled in Google Cloud Console
   - Verify service account has proper roles

### Getting Help:

If you're stuck, the dashboard will automatically fall back to mock data, so it will always work. The console will show warnings if there are connection issues.

## 🔄 Data Flow

Once configured:
1. Your dashboard reads data from Google Sheets in real-time
2. Any changes you make to the sheet appear immediately
3. If connection fails, it gracefully falls back to mock data
4. All data is cached for better performance

Your SmilePoint dashboard is now powered by Google Sheets! 🚀