// Test script to verify Google Sheets connection
// Run with: node test-google-sheets.js

const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  console.log('🔍 Testing Google Sheets connection...\n');

  // Check environment variables
  const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  const SHEET_ID = process.env.GOOGLE_SHEETS_SHEET_ID;

  console.log('Environment Variables:');
  console.log('✓ CLIENT_EMAIL:', CLIENT_EMAIL ? 'Set' : 'Missing');
  console.log('✓ PRIVATE_KEY:', PRIVATE_KEY ? 'Set' : 'Missing');
  console.log('✓ SHEET_ID:', SHEET_ID ? 'Set' : 'Missing');
  console.log();

  if (!CLIENT_EMAIL || !PRIVATE_KEY || !SHEET_ID) {
    console.log('❌ Missing required environment variables!');
    console.log('Please update your .env.local file with your service account credentials.');
    return;
  }

  try {
    // Initialize JWT auth
    const serviceAccountAuth = new JWT({
      email: CLIENT_EMAIL,
      key: PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
      ],
    });

    // Initialize the sheet
    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    
    console.log('✅ Successfully connected to Google Sheets!');
    console.log('📊 Sheet Title:', doc.title);
    console.log('📝 Number of sheets:', doc.sheetCount);
    console.log();
    
    console.log('Available sheets:');
    Object.values(doc.sheetsByIndex).forEach((sheet, index) => {
      console.log(`  ${index + 1}. ${sheet.title} (${sheet.rowCount} rows)`);
    });
    
    console.log();
    console.log('🎉 Google Sheets integration is ready!');
    console.log('Your dashboard will now use real data from your sheet.');
    
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    console.log();
    console.log('Common issues:');
    console.log('1. Service account email not shared with the sheet');
    console.log('2. Incorrect private key format (check newlines)');
    console.log('3. Wrong sheet ID');
    console.log('4. APIs not enabled in Google Cloud Console');
  }
}

testConnection();