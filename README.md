
STATIC


# 🛩️ FADEC Control Unit - CFM56-7B

> A browser-based interactive dashboard that simulates a **FADEC** (Full Authority Digital Engine Control) control panel for a CFM56-7B aircraft engine. It uses live sliders, calculated outputs, a fuel-map canvas, and status indicators to show how sensor inputs affect engine behavior.

---

## 📊 Project Status

| Status | Description |
|--------|-------------|
| 🟡 In Progress | Currently being developed |
| 🔧 Some parts may still be refined or improved | |

---

## 🎯 Assignment Requirements

- **Title:** `Full Authority Digital Engine Control`
- **Objective:** interpret real-time sensor data from changing air volumes and use FADEC diagnostic logic to decide whether the engine is `Airworthy` or requires maintenance
- **Inputs:**
  - 📊 `Wa` for air mass flow
  - 🌡️ `Tamb` for ambient temperature
  - ⚙️ `N1` for fan speed
- **Algorithm rule:**
  - ✨ **Golden Rule:** every 15 units of air must provide 1 unit of fuel
  - ⛽ Fuel flow formula: `Wf = Wa / 15`
- **Throttle-to-Fuel map:**
  - 🎚️ Throttle slider ranges from `0%` to `100%`
  - 🚀 If throttle is above `50%`, target `N1` becomes `5,000 RPM`
  - 🧠 FADEC checks the actual `N1` and decides whether the fuel valve should open, close, or hold
- **Feedback loop:**
  - 🔄 Check whether added fuel increases engine speed
  - 🌡️ Check whether the engine is too hot
  - 🛑 Stop adding fuel when the temperature is too high
- **Software output:**
  - 💻 Build the logic in a simple CBT or browser-based simulation
- **Final hardware concept:**
  - 🖥️ ECU or brain
  - 👁️ Sensors or eyes
  - 🤖 Actuators or hands

## Assignment Requirements

- Title: `Full Authority Digital Engine Control`
- Objective: interpret real-time sensor data from changing air volumes and use FADEC diagnostic logic to decide whether the engine is `Airworthy` or requires maintenance
- Inputs:
  - `Wa` for air mass flow
  - `Tamb` for ambient temperature
  - `N1` for fan speed
- Algorithm rule:
  - Golden Rule: every 15 units of air must provide 1 unit of fuel
  - Fuel flow formula: `Wf = Wa / 15`
- Throttle-to-Fuel map:
  - Throttle slider ranges from `0%` to `100%`
  - If throttle is above `50%`, target `N1` becomes `5,000 RPM`
  - FADEC checks the actual `N1` and decides whether the fuel valve should open, close, or hold
- Feedback loop:
  - Check whether added fuel increases engine speed
  - Check whether the engine is too hot
  - Stop adding fuel when the temperature is too high
- Software output:
  - Build the logic in a simple CBT or browser-based simulation
- Final hardware concept:
  - ECU or brain
  - Sensors or eyes
  - Actuators or hands

---

## 📋 Overview

This project presents a futuristic aircraft engine monitoring interface with:

- 📡 Real-time sensor input controls
- ⛽ Fuel flow calculation
- 🔀 Throttle-to-fuel and N1 feedback logic
- ⚠️ Temperature warning states
- 🟢 Engine status output: **Airworthy**, **Caution**, or **Requires Maintenance**
- 🔄 Reset button for returning all values to default

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📊 `Wa` Slider | Air mass flow control in `kg/s` |
| 🌡️ `Tamb` Slider | Ambient temperature control in °C |
| 🎚️ Throttle Slider | Engine input percentage (0-100%) |
| ⚙️ `N1` Slider | Fan speed control in RPM |
| 🔥 Fuel Flow | Live computation using `Wf = Wa / 15` |
| 🚪 Fuel Valve | Open/Close/Hold logic |
| ⚠️ Temperature | Warning and fault state detection |
| 📜 Log Ticker | Animated activity log |
| 🗺️ Fuel Map | Canvas-based fuel visualization |
| 🔙 Reset | One-click return to default values |

---

## Project Structure

- `src/app/page.js` - thin route entry that renders the dashboard
- `src/app/layout.js` - root HTML shell and font loading
- `src/styles/globals.css` - global styles for the cockpit UI
- `src/components/fadec/FadecDashboard.jsx` - main dashboard composer
- `src/components/fadec/panels/` - top bar, panels, and layout sections
- `src/components/fadec/ui/` - reusable UI atoms such as headers and rows
- `src/hooks/useFadecController.js` - controller logic, timers, and state wiring
- `src/lib/fadec/constants.js` - defaults and log messages
- `src/lib/fadec/state.js` - OOP model for the FADEC state
- `src/lib/fadec/engine.js` - FADEC calculation engine
- `src/lib/fadec/canvas.js` - canvas renderer for the fuel map
- `src/lib/fadec/index.js` - clean export surface for the FADEC module
- `public/` - add static assets here if needed

---

## 🚀 How To Run

1. 📂 Open the project folder
2. Install dependencies with `npm install`
3. Run the dev server with `npm run dev`
4. Open the local URL shown in the terminal

For deployment:

1. Run `npm run build`
2. Deploy the Next.js app to Vercel or your preferred Node host

---

## 🎮 Controls

| Control | Function |
|---------|----------|
| 📊 `Wa` | Air mass flow in `kg/s` |
| 🌡️ `Tamb` | Ambient temperature in °C |
| 🎚️ `Throttle` | Engine input percentage |
| ⚙️ `N1` | Actual fan speed in RPM |
| 🔙 `RESET` | Returns all inputs to default |

---

## 🧠 Logic Summary

- ⛽ **Fuel Flow** = Air mass flow ÷ 15
- 🎯 **Target N1** = 5,000 RPM when throttle > 50%
- 🔍 **Valve Decision** = Compare actual N1 vs target
- 🌡️ **Temperature States** = Normal → Caution → Fault

---

## 📝 Notes

- 🎨 The interface is designed to look like a cockpit or diagnostic panel
- 🎓 Meant for demonstration, simulation, or academic presentation purposes
- 🛠️ Project is currently ongoing and not yet final
- 📄 This README includes both the app summary and the project requirements from the task sheet

---

**Happy Flying! 🛫**
