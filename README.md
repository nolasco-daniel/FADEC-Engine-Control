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

- `src/index.html` - layout shell and script loading order
- `src/css/styles.css` - all visual styling and layout rules
- `src/js/fadec-state.js` - shared app state and defaults
- `src/js/fadec-engine.js` - FADEC computation and decision logic
- `src/js/fadec-ui.js` - DOM rendering and display updates
- `src/js/fadec-canvas.js` - fuel map canvas drawing
- `src/js/fadec-events.js` - slider, reset, and timer wiring
- `src/js/main.js` - bootstrap entrypoint
- `assets/` - static assets placeholder
- `docs/` - documentation placeholder
- `tests/` - test placeholder
- `lib/` - vendor or external library placeholder
- `config/` - configuration placeholder

---

## 🚀 How To Run

1. 📂 Open the project folder
2. 🌐 Open `src/index.html` in your browser
3. 🎛️ Adjust the sliders to simulate different engine conditions

> 💡 **No install or build step required!** This is a static HTML/CSS/JavaScript project.

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
