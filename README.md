# FADEC Control Unit - CFM56-7B

A browser-based interactive dashboard that simulates a FADEC (Full Authority Digital Engine Control) control panel for a CFM56-7B engine. It uses live sliders, calculated outputs, a fuel-map canvas, and status indicators to show how sensor inputs affect engine behavior.

## Project Status

This project is still in progress and currently being developed. Some parts may still be refined, improved, or added as the work continues.

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

## Overview

This project presents a futuristic aircraft engine monitoring interface with:

- Real-time sensor input controls
- Fuel flow calculation
- Throttle-to-fuel and N1 feedback logic
- Temperature warning states
- Engine status output: Airworthy, Caution, or Requires Maintenance
- Reset button for returning all values to default

## Features

- `Wa` air mass flow slider
- `Tamb` ambient temperature slider
- Throttle position slider
- `N1` fan speed slider
- Live fuel flow computation using `Wf = Wa / 15`
- Fuel valve open/close/hold logic
- Temperature-based warning and fault states
- Animated log ticker
- Canvas-based fuel map visualization
- One-click reset to default values


## How To Run

1. Open the project folder.
2. Double-click `index.html`, or open it in your browser.
3. Adjust the sliders to simulate different engine conditions.

No install or build step is required. This is a static HTML/CSS/JavaScript project.

## Controls

- `Wa` controls air mass flow in `kg/s`
- `Tamb` controls ambient temperature in degrees C
- `Throttle` controls engine input percentage
- `N1` controls actual fan speed in `RPM`
- `RESET` returns all inputs to their default values

## Logic Summary

- Fuel flow is computed from the air mass flow input.
- Throttle position affects the target N1 value.
- Actual N1 is compared against the target to decide whether the fuel valve opens, closes, or holds.
- Temperature conditions determine whether the engine is operating normally, in caution, or in fault mode.

## Notes

- The interface is designed to look like a cockpit or diagnostic panel.
- The project is meant for demonstration, simulation, or academic presentation purposes.
- The project is currently ongoing and not yet final.
- This README includes both the app summary and the project requirements from the task sheet.
