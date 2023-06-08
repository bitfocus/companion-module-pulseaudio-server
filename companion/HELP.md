# Pulseaudio Control Module

## Config
* `sockPath`:  Absolute path to PulseAudio native protocol socket. See [Limitations](#limitations) regarding permissions.
* `cookie`:  Absolute path for PulseAudio authentication cookie. See [Limitations](#limitations) regarding permissions.

## Actions
### Sources
* Set Mute
  * Set a list of sources to be muted or unmuted
* Toggle Mute
  * From a list of sources, set muted sources to unmute and unmuted sources to mute

### Sinks
* Set Mute
  * Set a list of sinks to be muted or unmuted
* Toggle Mute
  * From a list of sinks, set muted sinks to unmute and unmuted sinks to mute

## Sink Inputs
* Set Mute
  * Set a list of sink inputs to be muted or unmuted
* Toggle Mute
  * From a list of sink inputs, set muted sink inputs to unmute and unmuted sink inputs to mute
* Volume Adjust
  * Adjust all channels on a Sink Input to be louder or quieter by a given percentage

## Feedbacks
### isMuted Boolean
* Sinks
  * True when all selected sinks are muted, false if even one is unmuted
* Sources
  * True when all selected sources are muted, false if even one is unmuted
* Sink Inputs
  * True when all selected sink inputs are muted, false if even one is unmuted

## Presets
### Mute Buttons
* Sources
  * Uses Source Muted feedback with Toggle Mute Source action
* Sinks
  * Uses Sink Muted feedback with Toggle Mute Sink action
* Sink Inputs
  * Uses Sink Input Muted feedback with Toggle Mute Sink Input action

### Limitations
* PulseAudio Native Protocol Permissions
  * The native protocol socket and authentication cookie is usally accessible to only the user whose window manager session is active.
  * If the Companion daemon is being run by another system user, this module may not operate unless that user is given permissions to the socket and cookie files.
