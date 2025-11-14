# LinkUp - Video Meeting App

A real-time video conferencing app inspired by Google Meet. Think Zoom, but we built it ourselves.

## What's This About?

Basically, it's a video meeting platform where you can:
- Jump into video calls with your friends or team
- Chat while you're on a call (because sometimes you gotta share a link or just can't unmute)
- Sign in with your Google account (the easy way)
- Share your screen and collaborate

Built this to learn how WebRTC works and honestly, it's pretty cool seeing real-time video streaming come to life.

## Tech Stack

Here's what we're working with:

**Frontend:**
- React (hooks and all that good stuff)
- Redux (for state management because we're not savages)
- Material-UI (makes things look clean without much effort)
- Socket.io-client (for real-time communication)
- PeerJS (WebRTC made easier)
- Google OAuth (new @react-oauth/google library)

**Backend:**
- Node.js + Express (keeping it simple)
- Socket.io (handling all the real-time magic)
- PeerJS server (for video/audio streaming)

## Recent Updates

Just migrated the whole authentication system from the old deprecated `react-google-login` to the shiny new `@react-oauth/google`. Also fixed some bugs along the way:
- Fixed authentication logic (LOGIN_FAILURE was doing the opposite, whoops)
- Removed client secrets from the frontend (security first)
- Better error handling
- Cleaner code overall

Check out `AUTHENTICATION_FIXED.md` for the full story.

## Getting Started

### Prerequisites

You'll need:
- Node.js installed (obviously)
- A Google Cloud Console account (for OAuth)
- Coffee (optional but recommended)

### Setup

1. **Clone this bad boy:**
   ```bash
   git clone https://github.com/vaishnaviiii4/linkUp.git
   cd linkUp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   cd client && npm install
   cd ../api && npm install
   ```

3. **Set up your environment variables:**
   
   Create a `.env` file in the `client` folder:
   ```bash
   cd client
   cp .env.example .env
   ```
   
   Then add your Google OAuth Client ID:
   ```
   REACT_APP_GOOGLE_CLIENT_ID=your-actual-google-client-id
   ```

4. **Get your Google OAuth credentials:**
   - Head to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project (or use an existing one)
   - Enable Google Identity Services API
   - Create OAuth 2.0 credentials
   - Add `http://localhost:3000` to authorized JavaScript origins
   - Copy your Client ID

### Running the App

**Option 1: Run everything together (recommended)**
```bash
npm run dev
```

**Option 2: Run separately (if you're into that)**

Terminal 1 - Backend:
```bash
cd api
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm start
```

The app should open at `http://localhost:3000`

## How It Works

1. **Sign in** with your Google account
2. **Create or join a meeting** - you'll get a unique meeting ID
3. **Share the meeting ID** with whoever you want to call
4. **Start chatting and video calling** - everything happens in real-time

The magic happens through WebRTC for peer-to-peer video connections and Socket.io for signaling and chat messages.

## Project Structure

```
.
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # All the UI components
│   │   ├── Redux/       # State management
│   │   ├── utility/     # Helper functions
│   │   └── css/         # Styling
│   └── public/
├── api/                 # Node.js backend
│   ├── index.js         # Server entry point
│   └── app.js           # Socket.io logic
└── package.json         # Root package for concurrently
```

## Features

- Real-time video and audio streaming
- Live chat during meetings
- Google authentication
- Meeting room creation and joining
- Responsive UI (looks good on mobile too)
- Copy meeting link functionality

## Known Issues / TODO

- [ ] Screen sharing (working on it)
- [ ] Recording functionality
- [ ] Better mobile experience
- [ ] Participant list
- [ ] Mute/unmute notifications
- [ ] Virtual backgrounds (because why not)

## Contributing

Feel free to fork this and make it better. If you find bugs or have ideas, open an issue or submit a PR.

## License

Do whatever you want with it. Learn, build, break things, have fun.

## Shoutout

Built with way too much coffee and a lot of Stack Overflow tabs open.

---

Questions? Found a bug? Just open an issue and let's figure it out together.
