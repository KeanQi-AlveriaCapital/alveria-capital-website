# Custom Components

This folder contains custom, reusable components for the Alveria Capital website.

## Navigation.tsx

**Complete navigation system** with all functionality baked in:

### Features
- **Responsive breakpoints**: Automatically switches between desktop and mobile layouts at `lg` breakpoint
- **Dark/light mode**: Dynamically changes colors based on section background
- **Scroll behavior**: Hides when scrolling down, shows when scrolling up with smooth animations
- **Animated links**: Hover effects with smooth underline animations
- **Mobile menu**: Side sheet with full navigation when on mobile/tablet
- **Language toggle**: Switch between EN and 中文
- **Investor login button**: Call-to-action button in both desktop and mobile views

### Scroll Behavior
- **Hide on scroll down**: Navigation slides up and fades out when scrolling down past 100px
- **Show on scroll up**: Navigation slides down and fades in when scrolling up
- **Smooth transitions**: 0.3s Framer Motion animations with easeInOut easing
- **Performance optimized**: Throttled scroll events using requestAnimationFrame
- **Threshold protection**: 10px threshold prevents jittery behavior on small movements

### Usage
```tsx
import Navigation from "@/components/custom/Navigation";

<Navigation 
  isDarkMode={isDarkMode}       // Controls light/dark color scheme
  currentLang={currentLang}     // Current language ("EN" or "中文")
  onLanguageChange={handleLang} // Language change callback
/>
```

### Styling
- **Total height**: 124px (100px logo + 24px padding)
- **Horizontal padding**: 100px on desktop
- **Breakpoint**: `hidden lg:block` for desktop menu, `lg:hidden` for mobile
- **Color schemes**: Uses CSS custom properties with `nav-light` and `nav-dark` classes

### Components Included
- `AnimatedNavLink`: Desktop navigation links with underline animations
- `AnimatedMobileLink`: Mobile menu links with same animations
- `LanguageToggle`: Toggle group for language switching

### Future additions
Add new custom components to this folder to maintain consistency and reusability across the application. 