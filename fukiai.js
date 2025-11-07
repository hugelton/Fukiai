// Fukiai Icon Font Library
// Usage: <i class="fukiai" name="control_rec_f"></i>

(function() {
  'use strict';

  // Icon mapping from glyphs.json
        const ICON_MAP = {
    "control_eject_f": "EA01",
    "control_eject_o": "EA02",
    "control_forward_f": "EA03",
    "control_forward_o": "EA04",
    "control_pause_f": "EA05",
    "control_pause_o": "EA06",
    "control_play_f": "EA07",
    "control_play_o": "EA08",
    "control_rec_f": "EA09",
    "control_rec_o": "EA0A",
    "control_reverse_f": "EA0B",
    "control_reverse_o": "EA0C",
    "control_skip_f": "EA0D",
    "control_skip_o": "EA0E",
    "control_stop_f": "EA0F",
    "control_stop_o": "EA10",
    "function_cross": "EA11",
    "function_env_adsr_exp": "EA12",
    "function_env_adsr_lin": "EA13",
    "function_env_adsr_log": "EA14",
    "function_env_ar_exp": "EA15",
    "function_env_ar_lin": "EA16",
    "function_env_ar_log": "EA17",
    "function_even": "EA18",
    "function_impulse": "EA19",
    "function_multiply": "EA1A",
    "function_odd": "EA1B",
    "function_phase": "EA1C",
    "function_signal_bipolar": "EA1D",
    "function_signal_both": "EA1E",
    "function_signal_clip": "EA1F",
    "function_signal_double": "EA20",
    "function_signal_fade": "EA21",
    "function_signal_fold": "EA22",
    "function_signal_gate_fall": "EA23",
    "function_signal_gate_rise": "EA24",
    "function_signal_harmonic": "EA25",
    "function_signal_input": "EA26",
    "function_signal_loop": "EA27",
    "function_signal_output": "EA28",
    "function_signal_pitch": "EA29",
    "function_signal_unipolar": "EA2A",
    "numbers_circle_1_roman_f": "EA2B",
    "numbers_circle_1_roman_o": "EA2C",
    "numbers_circle_2_roman_f": "EA2D",
    "numbers_circle_2_roman_o": "EA2E",
    "numbers_circle_3_roman_f": "EA2F",
    "numbers_circle_3_roman_o": "EA30",
    "numbers_circle_4_roman_f": "EA31",
    "numbers_circle_4_roman_o": "EA32",
    "port_dmx": "EA33",
    "port_gate": "EA34",
    "port_mic": "EA35",
    "port_midi": "EA36",
    "port_rj45": "EA37",
    "port_sd": "EA38",
    "port_sd_micro": "EA39",
    "port_trrs": "EA3A",
    "port_trs": "EA3B",
    "port_ts": "EA3C",
    "port_usb_a": "EA3D",
    "port_usb_b": "EA3E",
    "port_usb_c": "EA3F",
    "symbol_audio": "EA40",
    "symbol_circle": "EA41",
    "symbol_clock": "EA42",
    "symbol_cloud_f": "EA43",
    "symbol_cloud_o": "EA44",
    "symbol_cocktail": "EA45",
    "symbol_cog": "EA46",
    "symbol_combine": "EA47",
    "symbol_hugelton": "EA48",
    "symbol_lock_close_f": "EA49",
    "symbol_lock_close_o": "EA4A",
    "symbol_lock_open_f": "EA4B",
    "symbol_lock_open_o": "EA4C",
    "symbol_metronome": "EA4D",
    "symbol_metronome_flip": "EA4E",
    "symbol_minus": "EA4F",
    "symbol_minus_o": "EA50",
    "symbol_moon_f": "EA51",
    "symbol_moon_o": "EA52",
    "symbol_pan": "EA53",
    "symbol_plus": "EA54",
    "symbol_plus_o": "EA55",
    "symbol_primitives_f": "EA56",
    "symbol_primitives_o": "EA57",
    "symbol_search": "EA58",
    "symbol_shift": "EA59",
    "symbol_sort": "EA5A",
    "symbol_speaker_f": "EA5B",
    "symbol_speaker_o": "EA5C",
    "symbol_speaker_one_f": "EA5D",
    "symbol_speaker_one_o": "EA5E",
    "symbol_speaker_three_f": "EA5F",
    "symbol_speaker_three_o": "EA60",
    "symbol_speaker_two_f": "EA61",
    "symbol_speaker_two_o": "EA62",
    "symbol_square": "EA63",
    "symbol_star": "EA64",
    "symbol_star_o": "EA65",
    "symbol_sun_dim_f": "EA66",
    "symbol_sun_dim_o": "EA67",
    "symbol_sun_f": "EA68",
    "symbol_sun_o": "EA69",
    "symbol_thunder_f": "EA6A",
    "symbol_thunder_o": "EA6B",
    "symbol_triangle": "EA6C",
    "symbol_volume": "EA6D",
    "ui_button_momentary": "EA6E",
    "ui_button_toggle": "EA6F",
    "ui_knob": "EA70",
    "ui_knob_four": "EA71",
    "ui_slider_horizontal": "EA72",
    "ui_slider_vertical": "EA73",
    "ui_toggle_switch": "EA74",
    "waveform_cos": "EA75",
    "waveform_cos_inv": "EA76",
    "waveform_noise_bit": "EA77",
    "waveform_noise_pink": "EA78",
    "waveform_noise_step": "EA79",
    "waveform_noise_white": "EA7A",
    "waveform_pulse_eighth": "EA7B",
    "waveform_pulse_eighth_inv": "EA7C",
    "waveform_pulse_half": "EA7D",
    "waveform_pulse_half_inv": "EA7E",
    "waveform_pulse_quarter": "EA7F",
    "waveform_pulse_quarter_inv": "EA80",
    "waveform_sawtooth_ac": "EA81",
    "waveform_sawtooth_ac_inv": "EA82",
    "waveform_sawtooth_dc": "EA83",
    "waveform_sawtooth_dc_inv": "EA84",
    "waveform_sine": "EA85",
    "waveform_sine_inv": "EA86",
    "waveform_square": "EA87",
    "waveform_square_inv": "EA88",
    "waveform_triangle_ac": "EA89",
    "waveform_triangle_ac_inv": "EA8A",
    "waveform_triangle_dc": "EA8B",
    "waveform_triangle_dc_inv": "EA8C"
  };

  // Inject font CSS
  function injectFontCSS() {
    if (document.getElementById('fukiai-font-css')) return;
    
    const style = document.createElement('style');
    style.id = 'fukiai-font-css';
    style.textContent = `
      @font-face {
        font-family: 'Fukiai';
        src: url('https://cdn.jsdelivr.net/npm/fukiai@latest/dist/fukiai.woff') format('woff'),
             url('https://cdn.jsdelivr.net/npm/fukiai@latest/dist/fukiai.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
      
      .fukiai {
        font-family: 'Fukiai', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        speak: none;
        display: inline-block;
      }
    `;
    document.head.appendChild(style);
  }

  // Convert hex to Unicode character
  function hexToUnicode(hex) {
    return String.fromCodePoint(parseInt(hex, 16));
  }

  // Update icon content
  function updateIcon(element) {
    const iconName = element.getAttribute('name');
    if (!iconName) return;

    const hexCode = ICON_MAP[iconName];
    if (hexCode) {
      element.textContent = hexToUnicode(hexCode);
      element.setAttribute('aria-label', iconName.replace(/_/g, ' '));
    } else {
      console.warn(`Fukiai: Unknown icon "${iconName}"`);
    }
  }

  // Initialize icons
  function initializeIcons() {
    const icons = document.querySelectorAll('.fukiai[name]');
    icons.forEach(updateIcon);
  }

  // Mutation observer for dynamic content
  function setupMutationObserver() {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) { // Element node
              if (node.classList && node.classList.contains('fukiai')) {
                updateIcon(node);
              }
              // Check children
              const childIcons = node.querySelectorAll && node.querySelectorAll('.fukiai[name]');
              if (childIcons) {
                childIcons.forEach(updateIcon);
              }
            }
          });
        } else if (mutation.type === 'attributes' && mutation.attributeName === 'name') {
          if (mutation.target.classList.contains('fukiai')) {
            updateIcon(mutation.target);
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['name']
    });
  }

  // Initialize when DOM is ready
  function init() {
    injectFontCSS();
    initializeIcons();
    setupMutationObserver();
  }

  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for manual initialization if needed
  window.Fukiai = {
    init: init,
    updateIcon: updateIcon,
    iconMap: ICON_MAP
  };

})();