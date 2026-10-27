# KotiloPlay 🎧

<img
  src="src/assets/kotiloplay-logo-nobg-1.png"
  alt="KotiloPlay logo"
  width="240"
/>

A cozy home for your music.

KotiloPlay is a music companion where you explore a little illustrated house, choose a room, and settle into your favorite music. Seasonal scenery, gentle animations, and warm colors create a relaxing space for everyday listening.

Inspired by the homepage of my home inventory app, [Kotilo](https://kotilo-nu.vercel.app/).

## Live demo

[Visit KotiloPlay](https://kotilo-play.vercel.app/)

## Features

### An interactive little home

- Explore the house through clickable room links.
- Discover miniature room illustrations and garden decorations.
- Enjoy animated clouds, birds, and chimney smoke.
- Move between rooms using previous and next navigation buttons.

### Cozy room scenes

- Detailed SVG illustrations with seasonal themes.
- Warm colors, greenery, and cozy furnishings.
- Responsive layouts for desktop, tablet, and mobile.
- Frosted-glass panels that help text remain readable over the artwork.

### Room-based music

- Listen through an embedded YouTube player.
- Start with each room’s default music selection.
- Open “Change music” to add YouTube video or playlist links.
- Save up to 10 music selections per room.
- Add your own titles, select saved music, or remove items.
- Return to the room’s default music whenever you like.

Saved music stays in the browser where it was added, using local storage. It is stored separately for each room and does not sync between devices or browsers.

## How to use

1. Choose a room from the house.
2. Press play in the YouTube player.
3. To choose something different, open “Change music.”
4. Paste a YouTube video or playlist link and optionally add a title.
5. Add the music, then press play in the player.

No account is needed to save music in your browser.

## Rooms

Each room offers a place for a different listening mood:

- Bedroom — sleep and relaxation
- Living room — cozy listening
- Office — focus and studying
- Kitchen — cooking and everyday moments
- Garden — nature sounds and outdoor ambience
- Bathroom — a quiet pause
- Hallway — a welcoming place to begin

## Tech stack

- React
- TypeScript
- Vite
- React Router
- CSS and SVG
- YouTube embeds
- Browser local storage

## Getting started

### Requirements

- Node.js and npm
- Git

### Run locally

Clone the repository and install the dependencies:

```bash
git clone https://github.com/mareerray/KotiloPlay.git
cd KotiloPlay
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in your terminal.

### Build for production

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Check code quality

```bash
npm run lint
```

## Learning goals

KotiloPlay is a personal learning project focused on:

- Building reusable React components.
- Managing state and room-based navigation.
- Creating detailed SVG scenes and gentle animations.
- Designing responsive, accessible interfaces.
- Integrating an embedded music player.
- Validating user input and saving preferences locally.
- Improving the interface through real-device testing.

## Project status

## Project status

The core experience is complete:

- Interactive house with clickable room links and keyboard navigation.
- Detailed seasonal room scenes and gentle animations.
- Room-based YouTube playback.
- Custom music selections saved separately for each room.
- Responsive desktop, tablet, and mobile layouts.
- Frosted-glass panels for readable text over the artwork.
- Installable progressive web app (PWA).
- Live deployment on Vercel.

KotiloPlay remains a personal portfolio and learning project,
with ongoing maintenance and small improvements.

## Author

Created by Mayuree Reunsati.