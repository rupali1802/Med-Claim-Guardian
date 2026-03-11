# Logo Setup Instructions

## Overview
The Med-Claim Guardian application components have been updated to use an image logo instead of inline SVG icons.

## Required Setup

### 1. Logo Image File
You need to place your Med-Claim Guardian logo image file in this directory with the filename:
```
med-claim-guardian-logo.png
```

**File Location:** `d:\TEAM_HEIST\rcm_dashboard\public\med-claim-guardian-logo.png`

### 2. Image Specifications
- **Filename:** `med-claim-guardian-logo.png`
- **Format:** PNG (with transparent background recommended)
- **Recommended Size:** 600×600 pixels or larger (will be scaled by CSS)
- **Format:** The logo you provided (with blue and green shield, medical cross, and circuit design)

### 3. How to Add the Logo

#### Method 1: Using Windows File Explorer
1. Copy your Med-Claim Guardian logo image file
2. Navigate to: `d:\TEAM_HEIST\rcm_dashboard\public\`
3. Paste the file there
4. Rename it to `med-claim-guardian-logo.png` if needed

#### Method 2: Using Command Line
```powershell
# Navigate to the public directory
cd d:\TEAM_HEIST\rcm_dashboard\public

# Copy your logo file (replace SOURCE_PATH with actual location)
Copy-Item "SOURCE_PATH\med-claim-guardian-logo.png" -Destination ".\"
```

### 4. Where the Logo Appears

The logo image will be displayed in:
- **Login Page** (`Login.js`) - 144px × auto
- **Registration Page** (`Register.js`) - 144px × auto  
- **Landing Page/Navigation** (`Landing.js`) - 40px × 40px

### 5. If Image Not Found

If the logo image is not placed in the public folder, the components will show a broken image icon. Simply add the `med-claim-guardian-logo.png` file to fix this.

## Component References

The following components reference the logo:
- `src/components/Login.js` - Line with `img src="/med-claim-guardian-logo.png"`
- `src/components/Register.js` - Line with `img src="/med-claim-guardian-logo.png"`
- `src/components/Landing.js` - Line with `img src="/med-claim-guardian-logo.png"`

All components reference the same logo file for consistency across the application.

## Next Steps

1. Save your Med-Claim Guardian logo image as `med-claim-guardian-logo.png`
2. Place it in the `d:\TEAM_HEIST\rcm_dashboard\public\` directory
3. Restart the React development server (if running)
4. The logo should now appear on all pages

---

**Note:** Make sure the image file has a transparent background for best display, especially since it will appear on colored gradients on the login and registration pages.
