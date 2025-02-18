export const GuidelinesSms = {
    title: "SMS Configuration Guidelines",
    content: [
        {
            id: 1,
            name: "Account SID",
            content:
                "The Account SID is a unique identifier for your Twilio account. You can find it in your Twilio Console under 'Account Info.' It is required to authenticate your API requests. \n\nExample: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'"
        },
        {
            id: 2,
            name: "Auth Token",
            content:
                "The Auth Token is a secret key used along with your Account SID to authenticate API requests. Keep it secure and never expose it publicly. You can find it in your Twilio Console under 'Account Info.' \n\nExample: 'your_auth_token_here'"
        },
        {
            id: 3,
            name: "Phone Number",
            content:
                "The phone number is the Twilio-provided number from which SMS messages will be sent. It should be in E.164 format (e.g., +1234567890). You can purchase or find your Twilio number in the Twilio Console under 'Phone Numbers.' \n\nExample: '+1234567890'"
        },
        
    ]
};

export const GuidelinesEmail = {
    title: "Email Configuration Guidelines",
    content: [
        {
            id: 1,
            name: "Username/Email Address",
            content:
                "This is the email address used to authenticate with the SMTP server. It is typically the email account you want to use to send emails. \n\nExample: 'user@example.com'"
        },
        {
            id: 2,
            name: "Password",
            content:
                "The password for the email account. Some providers may require an application-specific password or token instead of the account's main password. \n\nExample: 'P@ssw0rd123!' or 'app-specific-token'"
        },
        {
            id: 3,
            name: "SMTP Server Address",
            content:
                "The SMTP server address is provided by your email service provider. It is responsible for sending your emails. Ensure you enter the correct address for your email service. \n\nExample: 'smtp.gmail.com' or 'mail.example.com'"
        },
        {
            id: 4,
            name: "SMTP Port Number",
            content:
                "The port number is used to connect to the SMTP server. Common values are 587 (for TLS encryption) or 465 (for SSL encryption). Confirm this value with your email service provider. \n\nExample: '587' or '465'"
        },
        //   {
        //     id: 5,
        //     name: "Testing the Configuration",
        //     content:
        //       "After entering all the required fields, send a test email to ensure everything is configured correctly. If the test fails, double-check all details for typos or missing information."
        //   }
    ]
};





