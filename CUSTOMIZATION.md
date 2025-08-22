## Portfolio Customization Guide

This website includes placeholder variables that need to be replaced with your actual information. Below is a complete list of all placeholders and where to update them:

### Personal Information Placeholders

Replace these variables throughout the website:

- `MODEL_NAME` - Your full professional name
- `CONTACT_EMAIL` - Your professional email address
- `CONTACT_PHONE` - Your phone number
- `MANAGEMENT_CONTACT` - Your agent/manager contact
- `INSTAGRAM_HANDLE` - Your Instagram username (without @)
- `CURRENT_LOCATION` - Your current city/location

### Key Files to Update

#### 1. Site Metadata (src/app/layout.js)
- Replace `MODEL_NAME` in title and descriptions
- Update `CONTACT_EMAIL` in metadata

#### 2. Homepage (src/app/page.js)
- Hero section: Replace `MODEL_NAME` and location
- Update bio and introduction text
- Replace placeholder achievement numbers

#### 3. About Page (src/app/about/page.js)
- Replace all personal details in the stats section
- Update the biography with your actual story
- Replace measurements and physical stats
- Update career achievements and timeline

#### 4. Contact Page (src/app/contact/page.js)
- Replace all contact information
- Update social media links
- Replace management contact details

#### 5. Booking Page (src/app/booking/page.js)
- Update pricing and service information
- Replace contact details in booking form
- Customize FAQ section

#### 6. Navbar Component (src/components/Navbar.js)
- Replace `MODEL_NAME` in logo/brand text

#### 7. Footer Component (src/components/Footer.js)
- Update all contact information
- Replace social media links
- Update copyright information

### Content to Add

#### 1. Images
Replace placeholder images in `/public/images/` with your actual photos:

- `hero-main.jpg` - Main hero image (1920x1080 recommended)
- `about-portrait.jpg` - About page portrait
- `portfolio/` folder - Your portfolio images
- `press/` folder - Press coverage images

#### 2. Portfolio Content
- Add your actual portfolio images to `/public/images/portfolio/`
- Update portfolio categories and descriptions
- Replace placeholder project names and details

#### 3. Press Coverage
- Replace press articles in `/src/app/press/page.js`
- Add actual publication names, dates, and links
- Update press kit information

#### 4. Acting Reel
- Add your reel video to `/public/videos/reel.mp4`
- Update reel projects and descriptions
- Replace acting credits and skills

### Social Media Integration

Update social media links in:
- Footer component
- Contact page
- Any social sharing features

### SEO Optimization

1. Update all page titles and descriptions
2. Replace placeholder text in meta tags
3. Add your actual keywords and descriptions
4. Update Open Graph images

### Form Configuration

The booking form is currently set up with Formspree. To use it:

1. Sign up at [Formspree.io](https://formspree.io)
2. Get your form endpoint
3. Update the form action in `src/components/BookingForm.js`

### Deployment Checklist

Before deploying to Vercel:

1. ✅ Replace all placeholder variables
2. ✅ Add your actual images
3. ✅ Update contact information
4. ✅ Configure form handling
5. ✅ Test all links and functionality
6. ✅ Verify responsive design on all devices
7. ✅ Check loading speeds and optimization

### Environment Variables

For production deployment, consider using environment variables for sensitive information:

```bash
NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com
NEXT_PUBLIC_FORMSPREE_ID=your-formspree-id
```

### Quick Find & Replace

Use your code editor's find and replace feature to quickly update:

1. `MODEL_NAME` → Your actual name
2. `CONTACT_EMAIL` → Your email
3. `CONTACT_PHONE` → Your phone
4. `MANAGEMENT_CONTACT` → Your agent/manager

### Final Steps

1. Test the website thoroughly on mobile and desktop
2. Verify all forms work correctly
3. Check that all images load properly
4. Test navigation and internal links
5. Verify contact information is correct
6. Deploy to Vercel and test live site

Your professional portfolio website is now ready for customization and deployment!
