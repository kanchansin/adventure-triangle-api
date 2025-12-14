const { z } = require('zod');

// User Registration Schema
const userRegistrationSchema = z.object({
  fullName: z.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Full name must contain only letters and spaces'),
  
  email: z.string()
    .email('Invalid email format')
    .toLowerCase()
    .trim(),
  
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    .optional()
    .nullable(),
  
  adventureInterests: z.array(
    z.enum(['water', 'air', 'land'])
  ).min(1, 'Select at least one adventure interest')
    .max(3, 'Maximum 3 adventure interests allowed'),
  
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced'], {
    errorMap: () => ({ message: 'Experience level must be beginner, intermediate, or advanced' })
  }),
  
  location: z.string()
    .min(2, 'Location must be at least 2 characters')
    .max(200, 'Location must not exceed 200 characters'),
  
  hearAboutUs: z.string()
    .min(2, 'Please tell us how you heard about us')
    .max(100, 'Response must not exceed 100 characters')
});

// Partner Registration Schema
const partnerRegistrationSchema = z.object({
  companyName: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(200, 'Company name must not exceed 200 characters'),
  
  contactPerson: z.string()
    .min(2, 'Contact person name must be at least 2 characters')
    .max(100, 'Contact person name must not exceed 100 characters'),
  
  email: z.string()
    .email('Invalid email format')
    .toLowerCase()
    .trim(),
  
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  
  businessType: z.enum([
    'tour_operator',
    'equipment_rental',
    'accommodation',
    'training_center',
    'other'
  ], {
    errorMap: () => ({ message: 'Invalid business type' })
  }),
  
  adventureTypes: z.array(
    z.enum(['water', 'air', 'land'])
  ).min(1, 'Select at least one adventure type')
    .max(3, 'Maximum 3 adventure types allowed'),
  
  location: z.string()
    .min(2, 'Location must be at least 2 characters')
    .max(200, 'Location must not exceed 200 characters'),
  
  website: z.string()
    .url('Invalid website URL')
    .optional()
    .nullable(),
  
  description: z.string()
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description must not exceed 1000 characters')
});

// Event Registration Schema
const eventRegistrationSchema = z.object({
  fullName: z.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Full name must contain only letters and spaces'),
  
  email: z.string()
    .email('Invalid email format')
    .toLowerCase()
    .trim(),
  
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  
  attendeeType: z.enum(['user', 'partner', 'investor', 'media'], {
    errorMap: () => ({ message: 'Invalid attendee type' })
  }),
  
  dietaryRestrictions: z.string()
    .max(500, 'Dietary restrictions must not exceed 500 characters')
    .optional()
    .nullable()
});

// Newsletter Subscription Schema
const newsletterSchema = z.object({
  email: z.string()
    .email('Invalid email format')
    .toLowerCase()
    .trim()
});

module.exports = {
  userRegistrationSchema,
  partnerRegistrationSchema,
  eventRegistrationSchema,
  newsletterSchema,
};