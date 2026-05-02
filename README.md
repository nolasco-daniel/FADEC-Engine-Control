# FADEC Control Unit - CFM56-7B

A browser-based interactive dashboard that simulates a **FADEC** (Full Authority Digital Engine Control) panel for a CFM56-7B aircraft engine.

## Assignment Requirements

- **Title:** `Full Authority Digital Engine Control`
- **Objective:** interpret real-time sensor data from changing air volumes and use FADEC diagnostic logic to decide whether the engine is `Airworthy` or requires maintenance
- **Inputs:**
  - `Wa` for air mass flow
  - `Tamb` for ambient temperature
  - `N1` for fan speed
- **Algorithm rule:**
  - **Golden Rule:** every 15 units of air must provide 1 unit of fuel
  - **Fuel flow formula:** `Wf = Wa / 15`
- **Throttle-to-Fuel map:**
  - Throttle slider ranges from `0%` to `100%`
  - If throttle is above `50%`, target `N1` becomes `5,000 RPM`
  - Below or equal to `50%`, the system stays in `STANDBY`
  - FADEC checks the actual `N1` and decides whether the fuel valve should open, close, hold, or reduce fuel during safety conditions
- **Feedback loop:**
  - Check whether added fuel increases engine speed
  - Check whether the engine is too hot
  - Reduce fuel when temperature is too high
- **Software output:**
  - Build the logic in a simple CBT or browser-based simulation
- **Final hardware concept:**
  - ECU or brain
  - Sensors or eyes
  - Actuators or hands

## Overview

This project presents a futuristic aircraft engine monitoring interface with:

- Real-time sensor input controls
- Fuel flow calculation
- Throttle-to-fuel and N1 feedback logic
- Temperature warning states
- Engine status output: **Airworthy**, **Caution**, **Standby**, or **Requires Maintenance**
- Reset button for returning all values to default

## Features

| Feature | Description |
|---------|-------------|
| `Wa` Slider | Air mass flow control in `kg/s` |
| `Tamb` Slider | Ambient temperature control in `C` |
| `Throttle` Slider | Engine input percentage `(0-100%)` |
| `N1` Slider | Fan speed control in RPM |
| Fuel Flow | Live computation using `Wf = Wa / 15` |
| Fuel Valve | Open / Close / Hold / Reduce logic |
| Temperature | Warning and fault state detection |
| Log Ticker | Animated activity log |
| Fuel Map | Canvas-based fuel visualization |
| Reset | One-click return to default values |

## Logic Summary

- **Fuel Flow** = air mass flow divided by 15
- **Target N1** = 5,000 RPM when throttle > 50%
- **Standby** = throttle <= 50%
- **Valve Decision** = compare actual N1 vs target when active
- **Temperature States** = Normal → Caution → Fault
- **Safety Action** = reduce fuel flow during overtemperature

## File Structure

| Area | What It Handles | Key Files |
|---|---|---|
| `app` | Next.js route shell and home entry | `src/app/layout.js`, `src/app/page.js` |
| `components/fadec` | Main cockpit UI composition | `src/components/fadec/FadecDashboard.jsx`, `src/components/fadec/index.js` |
| `components/fadec/panels` | Dashboard sections and screen blocks | `AlgorithmPanel.jsx`, `CodePanel.jsx`, `DiagnosticsLog.jsx`, `FeedbackPanel.jsx`, `HardwarePanel.jsx`, `OutputPanel.jsx`, `SensorsPanel.jsx`, `SubNav.jsx`, `TopBar.jsx` |
| `components/fadec/ui` | Reusable UI atoms and small building blocks | `FeedbackStep.jsx`, `HardwareItem.jsx`, `PanelHeader.jsx`, `SensorBlock.jsx`, `StatRow.jsx` |
| `hooks` | State, timers, and animation control | `src/hooks/useFadecController.js` |
| `lib/fadec` | Core FADEC logic and helpers | `canvas.js`, `constants.js`, `engine.js`, `format.js`, `index.js`, `state.js` |
| `styles` | Global cockpit theme and responsiveness | `src/styles/globals.css` |

### Architecture View

```text
src
├─ app
│  ├─ layout.js      # document shell, metadata, fonts
│  └─ page.js        # route entry that renders the dashboard
├─ components
│  └─ fadec
│     ├─ FadecDashboard.jsx
│     ├─ panels
│     └─ ui
├─ hooks
│  └─ useFadecController.js
├─ lib
│  └─ fadec
│     ├─ engine.js   # FADEC computation engine
│     ├─ canvas.js   # fuel-map renderer
│     ├─ format.js   # stable number formatting
│     └─ state.js
└─ styles
   └─ globals.css    # cockpit theme, layout, responsiveness
```

## How To Run

1. Open the project folder
2. Install dependencies with `npm install`
3. Run the dev server with `npm run dev`
4. Open the local URL shown in the terminal


