# companion-module-pulseaudio-server
## A PulseAudio Companion Control Module

### Summary
[PulseAudio](https://www.freedesktop.org/wiki/Software/PulseAudio/) is a sound server system for POSIX OSes that is an integral part of modern Linux distributions. PulseAudio is able to perform advanced operations on sound data including transferring audio to a different machine, changing the sample format or channel count, or mixing several sounds into one input/output.

The PulseAudio Companion module allows users to control, monitor, and manage their PulseAudio sinks and sources directly from their control surface.

### Features
#### Actions
* Set Mute Sources
  * Set a list of sources to be muted or unmuted
* Toggle Mute Sources
  * From a list of sources, set muted sources to unmute and unmuted sources to mute
* Set Mute Sinks
  * Set a list of sinks to be muted or unmuted
* Toggle Mute Sinks
  * From a list of sinks, set muted sinks to unmute and unmuted sinks to mute
* Set Mute Sink Inputs
  * Set a list of sink inputs to be muted or unmuted
* Toggle Mute Sink Inputs
  * From a list of sink inputs, set muted sink inputs to unmute and unmuted sink inputs to mute
* Volume Adjust Sink Inputs
  * Adjust all channels on a Sink Input to be louder or quieter by a given percentage

#### Feedbacks
* (Boolean) Sinks Muted
  * True when all selected sinks are muted, false if even one is unmuted
* (Boolean) Sources Muted
  * True when all selected sources are muted, false if even one is unmuted
* (Boolean) Sink Inputs Muted
  * True when all selected sink inputs are muted, false if even one is unmuted

#### Presets
* (Button) Source Muted
  * Uses Source Muted feedback with Toggle Mute Source action
* (Button) Sink Muted
  * Uses Sink Muted feedback with Toggle Mute Sink action
* (Button) Sink Input Muted
  * Uses Sink Input Muted feedback with Toggle Mute Sink Input action

### Configuration
* `sockPath`:  Absolute path to PulseAudio native protocol socket. See [Limitations](#limitations) regarding permissions.
* `cookie`:  Absolute path for PulseAudio authentication cookie. See [Limitations](#limitations) regarding permissions.

### Limitations
* PulseAudio Native Protocol Permissions
  * The native protocol socket and authentication cookie is usally accessible to only the user whose window manager session is active.
  * If the Companion daemon is being run by another system user, this module may not operate unless that user is given permissions to the socket and cookie files.

### Dependencies
* [pulseaudio.js](https://www.npmjs.com/package/pulseaudio.js)
  * Requires PulseAudio 10.0 or higher (PulseAudio native protocol version 32 or higher)
  * Promised-based Typescript driver using PulseAudio native protocol over UNIX domain socket
  * Supports asynchronous event notifications sent by PulseAudio server
  * [ISC License](https://github.com/janakj/pulseaudio.js/blob/main/LICENSE)
  * [Wiki](https://github.com/janakj/pulseaudio.js/wiki) and [Documentation](https://janakj.github.io/pulseaudio.js/)

### Other Links
See [HELP.md](./companion/HELP.md) and [LICENSE](./LICENSE)
