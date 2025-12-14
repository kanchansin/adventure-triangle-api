const sgMail = require('@sendgrid/mail');
const { logger } = require('../middleware/logger');

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// Email templates
const templates = {
  userWelcome: (data) => ({
    subject: 'Welcome to Adventure Triangle! 🏔️',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #777; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏔️ Welcome to Adventure Triangle!</h1>
          </div>
          <div class="content">
            <p>Hi ${data.name},</p>
            <p>Welcome to the future of adventure travel! We're thrilled to have you join our community of adventurers.</p>
            <p><strong>Your Adventure Interests:</strong> ${data.adventureInterests}</p>
            <p>Get ready to explore water, air, and land adventures like never before. We'll keep you updated on:</p>
            <ul>
              <li>🌊 Exclusive adventure opportunities</li>
              <li>🎯 Early access to our platform launch</li>
              <li>🎉 Special events and community meetups</li>
              <li>💡 Adventure tips and inspiration</li>
            </ul>
            <p>Click below to verify your email and complete your registration:</p>
            <a href="${process.env.FRONTEND_URL}/verify/${data.verificationToken}" class="button">Verify Email</a>
            <p><strong>#FeelTheAdventure</strong></p>
          </div>
          <div class="footer">
            <p>Adventure Triangle | Building the world's first global adventure ecosystem</p>
            <p>© 2025 Adventure Triangle. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  partnerConfirmation: (data) => ({
    subject: 'Partner Application Received - Adventure Triangle',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🤝 Partner Application Received!</h1>
          </div>
          <div class="content">
            <p>Hi ${data.contactPerson},</p>
            <p>Thank you for your interest in becoming an Adventure Triangle partner!</p>
            <p><strong>Company:</strong> ${data.companyName}</p>
            <p><strong>Business Type:</strong> ${data.businessType.replace('_', ' ')}</p>
            <p><strong>Adventure Types:</strong> ${data.adventureTypes}</p>
            <p>Our team will review your application and get back to you within 3-5 business days. We're excited about the possibility of working together!</p>
            <p>In the meantime, feel free to explore our vision and connect with us on social media.</p>
            <p>Best regards,<br>Adventure Triangle Partnership Team</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  eventConfirmation: (data) => ({
    subject: '🎉 Launch Event Registration Confirmed - Adventure Triangle',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .event-details { background: white; padding: 20px; border-left: 4px solid #fa709a; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 You're Registered!</h1>
          </div>
          <div class="content">
            <p>Hi ${data.fullName},</p>
            <p>Your registration for the Adventure Triangle Launch Event has been confirmed!</p>
            <div class="event-details">
              <h3>Event Details:</h3>
              <p><strong>Date:</strong> ${data.eventDate}</p>
              <p><strong>Time:</strong> ${data.eventTime}</p>
              <p><strong>Location:</strong> ${data.location}</p>
              <p><strong>Your Role:</strong> ${data.attendeeType}</p>
            </div>
            <p>Get ready for an unforgettable evening celebrating the launch of the world's first global adventure ecosystem!</p>
            <p>We'll send you the event link and additional details closer to the date.</p>
            <p>See you there! 🚀</p>
            <p><strong>#FeelTheAdventure</strong></p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  partnerStatusUpdate: (data) => ({
    subject: `Partner Application ${data.status.toUpperCase()} - Adventure Triangle`,
    html: `
      <!DOCTYPE html>
      <html>
      <body>
        <h2>Partner Application Update</h2>
        <p>Hi ${data.companyName},</p>
        <p>Your partner application status has been updated to: <strong>${data.status}</strong></p>
        ${data.status === 'approved' ? '<p>Congratulations! Welcome to the Adventure Triangle partner network.</p>' : ''}
        ${data.status === 'rejected' ? '<p>Thank you for your interest. We encourage you to reapply in the future.</p>' : ''}
        <p>Best regards,<br>Adventure Triangle Team</p>
      </body>
      </html>
    `
  }),

  eventCancellation: (data) => ({
    subject: 'Event Registration Cancelled - Adventure Triangle',
    html: `
      <!DOCTYPE html>
      <html>
      <body>
        <h2>Registration Cancelled</h2>
        <p>Hi ${data.fullName},</p>
        <p>Your registration for the Adventure Triangle Launch Event has been cancelled as requested.</p>
        <p>If this was a mistake, feel free to register again anytime.</p>
        <p>Best regards,<br>Adventure Triangle Team</p>
      </body>
      </html>
    `
  })
};

/**
 * Send email using SendGrid
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject (optional if using template)
 * @param {string} options.template - Template name
 * @param {Object} options.data - Template data
 */
const sendEmail = async ({ to, subject, template, data }) => {
  try {
    // If SendGrid API key is not set, log the email instead
    if (!process.env.SENDGRID_API_KEY) {
      logger.info('Email would be sent (SendGrid not configured):', {
        to,
        subject: subject || templates[template](data).subject,
        template
      });
      return { success: true, message: 'Email logged (SendGrid not configured)' };
    }

    const templateData = templates[template](data);

    const msg = {
      to,
      from: {
        email: process.env.FROM_EMAIL || 'noreply@adventuretriangle.com',
        name: process.env.FROM_NAME || 'Adventure Triangle'
      },
      subject: subject || templateData.subject,
      html: templateData.html
    };

    await sgMail.send(msg);
    logger.info(`Email sent successfully to ${to}`);
    return { success: true };

  } catch (error) {
    logger.error('Email sending failed:', error);
    throw error;
  }
};

module.exports = { sendEmail };