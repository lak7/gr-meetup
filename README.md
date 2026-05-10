# FireShield — Emergency Help Desk + AI Copilot

FireShield is an AI-powered emergency assistance platform designed to help users quickly request medical support or evacuation guidance during critical situations. The platform provides a simple multi-step emergency flow combined with real-time AI-generated incident response guidance.

Built with a modern frontend experience, FireShield focuses on speed, clarity, and actionable emergency coordination. 

---

## Features

* 🚨 Emergency medical assistance requests
* 🛟 Safe evacuation guidance
* 🤖 AI-powered incident copilot
* 📍 Real-time location sharing
* 📞 Emergency contact integration
* 🧠 AI-generated action plans and safety checks
* 📋 Live response queue dashboard
* ⚡ Simple 3-step emergency workflow
* 🎯 Priority-based incident handling

---

## AI Copilot Capabilities

The integrated AI Copilot generates:

* Incident summaries
* Priority classification
* Immediate action recommendations
* Safety verification checklists
* Responder briefing notes

Example scenarios:

* Smoke-filled corridors
* Unconscious individuals
* Evacuation routing
* Injury reporting
* Emergency coordination

---

## Tech Stack

### Frontend

* React
* TypeScript
* Next.js / App Router
* CSS Modules / Custom Styling

### Backend

* API Routes
* AI Agent Endpoint (`/api/agent`)

### AI Integration

* Groq-powered incident guidance
* Real-time emergency response generation

---

## Project Structure

```bash
project-root/
│
├── app/
├── components/
│   └── EmergencyDesktopFlow.tsx
├── api/
│   └── agent/
├── styles/
├── public/
├── package.json
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/lak7/gr-meetup.git
cd gr-meetup
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Application will run on:

```bash
http://localhost:3000
```

---

## How It Works

### Step 1 — Select Emergency Type

Users can choose between:

* Medical Assistance
* Evacuation Support

### Step 2 — Share Details

The system automatically attaches:

* Current location
* Emergency contact
* Additional notes from the user

### Step 3 — AI Response Plan

The AI Copilot generates:

* Emergency priority
* Immediate safety actions
* Responder guidance
* Incident summary

### Final Step

The request is sent to the emergency response system with an estimated responder arrival time.

---

## UI Highlights

* Minimal emergency-first interface
* Fast decision-based workflow
* High-contrast emergency visual design
* Real-time incident dashboard
* AI-generated operational guidance

---

## Example AI Output

```json
{
  "priority": "critical",
  "summary": "Heavy smoke reported near staircase with one unconscious individual.",
  "immediate_actions": [
    "Move away from smoke source",
    "Cover nose and mouth",
    "Avoid elevators"
  ],
  "safety_checks": [
    "Check breathing status",
    "Ensure exit path is clear"
  ],
  "responder_brief": "Medical responder required at Block A staircase 2."
}
```

---

## Future Improvements

* 📡 Real-time responder tracking
* 🗺️ Indoor navigation support
* 🔥 IoT smoke and fire sensor integration
* 📱 Mobile app support
* 🌍 Multi-language emergency support
* 🧑‍🚒 Emergency responder dashboard
* 📊 Incident analytics system
* 🔔 Push notifications and alerts

---

## Contributing

Contributions are welcome.

### Steps

```bash
# Fork the repository
# Create your feature branch
git checkout -b feature/amazing-feature

# Commit changes
git commit -m "Add amazing feature"

# Push branch
git push origin feature/amazing-feature
```

Then open a Pull Request.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

Built to explore how AI can improve emergency coordination, incident response workflows, and public safety systems using modern web technologies and intelligent copilots.
