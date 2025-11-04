# My GitHub Pages Website

This is a simple, clean GitHub Pages website with a navigation menu structure.

## Site Structure

```
├── index.html       # Main landing page
├── about.html       # About Me page
├── contact.html     # Contact information page
├── other.html       # Other resources page (contains link to Tools)
├── tools.html       # Tools page (currently empty, ready for content)
├── styles.css       # Stylesheet for all pages
└── README.md        # This file
```

## Menu Structure

The navigation menu appears on all pages and includes:
- **Home** - Main landing page (index.html)
- **About Me** - Personal information and background (about.html)
- **Contact** - Contact information and social links (contact.html)
- **Other** - Additional resources (other.html)
  - Contains a link to **Tools** page (tools.html)

## Customization Guide

### 1. Update Personal Information

**About Page (about.html):**
- Replace placeholder text with your actual background
- Update skills and interests
- Add your professional activities

**Contact Page (contact.html):**
- Replace `your.email@example.com` with your actual email
- Update social media links (LinkedIn, GitHub, Twitter)
- Add or remove contact methods as needed

**Home Page (index.html):**
- Customize the hero section text
- Modify the welcome message
- Update card descriptions

### 2. Customize Site Name

Replace "My Site" in the navigation brand across all HTML files with your preferred site name.

### 3. Add Tools

When you're ready to add tools to the Tools page (tools.html):
1. Remove the "Coming Soon" section
2. Uncomment and use the tool-card template provided
3. Add your tool information

Example:
```html
<div class="tool-grid">
    <div class="tool-card">
        <h3>My Tool Name</h3>
        <p>Description of what this tool does</p>
        <a href="path-to-tool.html" class="btn">Launch Tool</a>
    </div>
</div>
```

### 4. Styling Customization

The `styles.css` file uses CSS variables for easy color customization. Modify the `:root` section:

```css
:root {
    --primary-color: #2563eb;      /* Main accent color */
    --secondary-color: #1e40af;    /* Hover states */
    --text-color: #1f2937;         /* Main text */
    --text-light: #6b7280;         /* Secondary text */
}
```

## Publishing to GitHub Pages

1. Commit and push all files to your repository:
   ```bash
   git add .
   git commit -m "Initial site setup"
   git push origin main
   ```

2. Enable GitHub Pages:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "main" branch as source
   - Click "Save"

3. Your site will be available at: `https://yourusername.github.io`

## Features

- ✅ Responsive design (mobile-friendly)
- ✅ Clean, modern interface
- ✅ Consistent navigation across all pages
- ✅ Easy to customize
- ✅ Ready for content expansion
- ✅ Professional styling

## Next Steps

1. Update all placeholder content with your information
2. Customize colors and styling to your preference
3. Add your actual contact information
4. Create tool pages as needed
5. Add more sections to the Other page

## Support

For issues or questions about GitHub Pages, visit: https://docs.github.com/en/pages

---

*Last updated: November 2025*
