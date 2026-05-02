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

```text
src/
  app/                     # Next.js route shell and the home page entry
    layout.js              # Global HTML layout, metadata, and font loading
    page.js                # Home route that renders the FADEC dashboard
  components/
    fadec/                 # Main dashboard UI and reusable panels
      FadecDashboard.jsx   # Composes the full FADEC cockpit screen
      index.js             # Barrel export for fadec components
      panels/              # Individual dashboard sections
        AlgorithmPanel.jsx # Fuel formula, target N1, and algorithm status
        CodePanel.jsx      # CBT-style code preview for the logic
        DiagnosticsLog.jsx # Live scrolling log and reset button
        FeedbackPanel.jsx  # Feedback loop and decision gate
        HardwarePanel.jsx  # ECU, sensor, and actuator concept cards
        OutputPanel.jsx    # Fuel output, valve, and engine status readout
        SensorsPanel.jsx   # Inputs for Wa, Tamb, throttle, and N1
        SubNav.jsx         # Navigation strip under the top bar
        TopBar.jsx         # Main header with system state and clock
        index.js           # Barrel export for panel components
      ui/                  # Small reusable UI building blocks
        FeedbackStep.jsx   # Single step in the feedback loop
        HardwareItem.jsx   # One hardware concept card
        PanelHeader.jsx    # Reusable section header
        SensorBlock.jsx    # Sensor input card with slider
        StatRow.jsx        # One-line status/value row
        index.js           # Barrel export for UI atoms
  hooks/                   # React hooks for state and animation logic
    useFadecController.js  # State, timers, canvas drawing, and updates
  lib/                     # Core FADEC logic and helpers
    fadec/
      canvas.js            # Canvas renderer for the throttle-to-fuel map
      constants.js         # Default values and log messages
      engine.js            # Main FADEC computation engine
      format.js            # Shared deterministic number formatting
      index.js             # Barrel export for FADEC helpers
      state.js             # FADEC state model and reset/snapshot logic
  styles/                  # Global app styling
    globals.css            # Full cockpit-style theme and layout styles
```

Key files:

- `src/app/page.js` - route entry that renders the dashboard
- `src/app/layout.js` - root HTML shell and font loading
- `src/components/fadec/FadecDashboard.jsx` - main dashboard composer
- `src/hooks/useFadecController.js` - controller logic, timers, and state wiring
- `src/lib/fadec/engine.js` - FADEC calculation engine
- `src/lib/fadec/canvas.js` - canvas renderer for the fuel map
- `src/lib/fadec/format.js` - shared deterministic formatting helpers
- `src/styles/globals.css` - global styles for the cockpit UI

## How To Run

1. Open the project folder
2. Install dependencies with `npm install`
3. Run the dev server with `npm run dev`
4. Open the local URL shown in the terminal


## Notes

- The interface is designed to look like a cockpit or diagnostic panel
- The project is intended for demonstration, simulation, or academic presentation
- The current implementation has been verified with a successful production build
