# 📋 Google Sheet Setup Guide

## Required Sheet Structure

Your Google Sheet should have these **4 tabs** with the following column headers:

### 1. **Call Logs** Tab
| Caller Name | Phone Number | Call Type | Duration | Timestamp | Status | Notes |
|-------------|--------------|-----------|----------|-----------|---------|-------|
| Emma Wilson | +1 (555) 123-4567 | incoming | 4:32 | 2024-08-05 10:30:00 | answered | Routine inquiry |
| Michael Chen | +1 (555) 234-5678 | outgoing | 2:15 | 2024-08-05 09:45:00 | answered | Follow-up call |

**Call Type Values:** `incoming`, `outgoing`
**Status Values:** `answered`, `missed`, `voicemail`

### 2. **Appointments** Tab
| Patient Name | Phone Number | Appointment Type | Date | Time | Status | Notes |
|--------------|--------------|------------------|------|------|---------|-------|
| Emma Wilson | +1 (555) 123-4567 | Routine Cleaning | 2024-08-05 | 09:00 | completed | On time |
| Michael Chen | +1 (555) 234-5678 | Dental Filling | 2024-08-05 | 10:30 | scheduled | Cavity treatment |

**Status Values:** `scheduled`, `completed`, `cancelled`, `no-show`

### 3. **Voicemails** Tab
| Caller Name | Phone Number | Duration | Timestamp | Transcription | Urgent | Listened |
|-------------|--------------|----------|-----------|---------------|---------|----------|
| Sarah Johnson | +1 (555) 123-4567 | 2:34 | 2024-08-05 10:00:00 | Need to reschedule appointment | FALSE | FALSE |
| Robert Miller | +1 (555) 234-5678 | 1:12 | 2024-08-05 09:00:00 | Urgent tooth pain | TRUE | FALSE |

**Urgent Values:** `TRUE`, `FALSE`
**Listened Values:** `TRUE`, `FALSE`

### 4. **AI Activity** Tab
| Agent Name | Agent Type | Task Description | Timestamp | Status | Response Time |
|------------|------------|------------------|-----------|---------|---------------|
| Reception Assistant | chat | Answered patient inquiry | 2024-08-05 10:28:00 | success | 1.2s |
| Scheduler Pro | scheduling | Scheduled new appointment | 2024-08-05 10:25:00 | success | 0.8s |

**Agent Type Values:** `chat`, `phone`, `scheduling`, `care`
**Status Values:** `success`, `error`, `in_progress`

## 🚀 Quick Setup Steps

1. **Open your Google Sheet**: https://docs.google.com/spreadsheets/d/1t5WNH7g7Osjzh-wS2FnZJtywSFLa2Gak_w5QspggKtI/edit

2. **Create 4 tabs** (rename existing or add new):
   - Call Logs
   - Appointments  
   - Voicemails
   - AI Activity

3. **Add the column headers** exactly as shown above (first row of each tab)

4. **Add some sample data** using the format examples

5. **Share with your service account** (the email from your JSON file)

## 🔧 Environment Variables

After getting your service account JSON file, update `.env.local`:

```env
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour actual private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_CLIENT_EMAIL="your-service-account@your-project.iam.gserviceaccount.com"
GOOGLE_SHEETS_SHEET_ID="1t5WNH7g7Osjzh-wS2FnZJtywSFLa2Gak_w5QspggKtI"
```

## ✅ Testing

Once configured, your dashboard will automatically pull real data from your Google Sheet!

The service includes fallback to mock data if there are any connection issues, so your dashboard will always work.