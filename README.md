# Solenne Villas — Cinematic Luxury Retreat Website

Solenne Villas is a fictional luxury hospitality website for a private Mediterranean retreat.
The project was built as a cinematic editorial landing page using full-screen imagery, refined typography, smooth slideshow behavior, chapter-based storytelling, a gallery lightbox, and an inquiry form.

## Live Site

 https://michaeleliezer.github.io/Solenne-Villas/

## Project Purpose

This project was created as a portfolio demo to practice luxury hospitality web design, cinematic visual flow, and polished frontend interactions.

The main goal was to create a website that feels:

* Cinematic
* Editorial
* Premium
* Calm
* Image-led
* Hospitality-focused
* Mobile responsive

## Built With

* HTML
* CSS
* JavaScript
* Google Fonts
* Responsive design
* Vanilla JavaScript interactions

## Features

* Cinematic intro screen
* Full-screen hero slideshow
* Play/pause slideshow control
* Slide indicators
* Editorial chapter sections
* Luxury villa cards
* Experience section
* Responsive image gallery
* Gallery lightbox modal
* Inquiry form with validation
* Email format validation
* Mobile navigation menu
* Hamburger-to-X animation
* Escape-key menu close
* Toast messages for placeholder links
* Reduced-motion support
* Keyboard-accessible gallery items
* Focus-visible accessibility styling

## Sections

1. Intro
2. Navigation
3. Hero slideshow
4. Editorial chapters
5. Villas
6. Experience
7. Gallery
8. Inquiry form
9. Footer

## Image Assets

The project uses AI-generated luxury villa imagery with a consistent Mediterranean hospitality direction.

Image files are stored in:

```text
assets/images/
```

Required images:

```text
aerial-coastal-retreat.jpg
pool-terrace-blue-hour.jpg
architectural-detail-archway.jpg
master-bedroom-ocean-view.jpg
open-lounge-villa.jpg
outdoor-dining-terrace.jpg
spa-bathroom-detail.jpg
```

## Folder Structure

```text
solenne-villas/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    └── images/
        ├── aerial-coastal-retreat.jpg
        ├── pool-terrace-blue-hour.jpg
        ├── architectural-detail-archway.jpg
        ├── master-bedroom-ocean-view.jpg
        ├── open-lounge-villa.jpg
        ├── outdoor-dining-terrace.jpg
        └── spa-bathroom-detail.jpg
```

## Design Direction

The visual direction is based on a cinematic Mediterranean retreat experience.

Key design choices:

* Dark warm background
* Champagne/gold accent color
* Large serif headings
* Minimal uppercase navigation
* Full-screen editorial image sections
* Slow image movement
* Dark overlays for readability
* Calm spacing
* Premium hospitality mood

## JavaScript Functionality

The JavaScript handles:

* Intro skip and auto-exit
* Hero slideshow
* Slide dot navigation
* Play/pause toggle
* Scoped keyboard arrow navigation
* Mobile menu open/close
* Escape key support
* Scroll reveal
* Gallery lightbox
* Lightbox focus return
* Inquiry form validation
* Email validation
* Toast messages
* Reduced-motion behavior

## Accessibility Notes

This project includes:

* Semantic HTML structure
* Keyboard-accessible navigation
* Focus-visible styles
* `aria-expanded` for mobile menu
* `aria-hidden` for menu and slides
* `aria-selected` for slideshow dots
* Lightbox dialog role
* Reduced-motion support
* Alt text for images
* Form labels and validation feedback

## Manual Testing Checklist

Before publishing, test:

* Intro appears and exits correctly
* Skip/Enter button works
* Hero slideshow auto-plays
* Dots change slides
* Play/pause button works
* Arrow keys only affect slideshow when focused in the hero area
* Mobile hamburger opens and closes
* Escape closes the mobile menu
* Mobile menu locks page scroll
* Editorial chapters display correctly
* Gallery opens lightbox
* Escape closes lightbox
* Focus returns after closing lightbox
* Empty form shows error
* Invalid email shows error
* Valid form shows success
* Footer placeholder links show toast
* No horizontal scrollbar appears
* Site works on mobile widths

## Status

Portfolio demo project.

This is not a real booking website. The inquiry form uses fake submit behavior only and does not send data to a backend.

## Author

Built by Michael Eliezer as part of a frontend development portfolio.
