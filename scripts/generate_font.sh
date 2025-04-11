#!/bin/bash

set -e

# SVGフォントを生成
echo "🔄 SVGフォントを生成しています..."
npx svgicons2svgfont -f Fukiai -o /Users/kurogedelic/Documents/Fukiai/build/fukiai.svg \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0000-waveform_sawtooth_ac.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0001-waveform_sawtooth_ac_inv.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0002-waveform_sawtooth_dc.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0003-waveform_sawtooth_dc_inv.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0004-waveform_triangle_ac.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0005-waveform_triangle_ac_inv.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0006-waveform_triangle_dc.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0007-waveform_triangle_dc_inv.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0008-waveform_square.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0009-waveform_square_inv.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0010-waveform_sine.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0011-waveform_sine_inv.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0012-waveform_cos.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0013-waveform_cos_inv.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0014-waveform_pulse_half.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0015-waveform_pulse_half_inv.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0016-waveform_pulse_quarter.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0017-waveform_pulse_quarter_inv.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0018-waveform_pulse_eighth.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0019-waveform_pulse_eighth_inv.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0020-waveform_noise_white.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0021-waveform_noise_pink.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0022-waveform_noise_step.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0023-waveform_noise_bit.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0024-symbol_lock_close_f.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0025-symbol_lock_close_o.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0026-symbol_lock_open_f.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0027-symbol_lock_open_o.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0028-symbol_cloud_f.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0029-symbol_cloud_o.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0030-symbol_thunder_f.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0031-symbol_thunder_o.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0032-symbol_primitives_f.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0033-symbol_primitives_o.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0034-symbol_combine.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0035-symbol_clock.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0036-symbol_tempo.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0037-symbol_swing.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0038-symbol_volume.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0039-symbol_pan.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0040-symbol_audio.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0041-control_play_f.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0042-control_play_o.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0043-control_stop_f.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0044-control_stop_o.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0045-control_pause_f.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0046-control_pause_o.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0047-control_skip_f.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0048-control_skip_o.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0049-control_rec_f.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0050-control_rec_o.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0051-control_forward_f.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0052-control_forward_o.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0053-control_reverse_f.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0054-control_reverse_o.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0055-control_eject_f.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0056-control_eject_o.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0057-function_signal_harmonic.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0058-function_signal_clip.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0059-function_signal_double.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0060-function_signal_pitch.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0061-function_signal_fold.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0062-function_signal_fade.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0063-function_signal_loop.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0064-function_signal_bipolar.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0065-function_signal_unipolar.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0066-function_signal_gate_rise.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0067-function_signal_gate_fall.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0068-function_env_adsr_lin.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0069-function_env_adsr_exp.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0070-function_env_adsr_log.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0071-function_env_ar_lin.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0072-function_env_ar_exp.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0073-function_env_ar_log.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0074-function_impulse.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0075-function_cross.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0076-function_multiply.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0077-function_phase.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0078-function_odd.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0079-function_even.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0080-port_midi.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0081-port_mic.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0082-port_dmx.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0083-port_usb_c.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0084-port_usb_a.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0085-port_usb_b.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0086-port_rj45.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0087-port_sd.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0088-port_sd_micro.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0089-ui_knob.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0090-ui_slider_vertical.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0091-ui_slider_horizontal.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0092-ui_button_toggle.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0093-ui_button_momentary.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0094-ui_toggle_switch.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0095-ui_led_round.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0096-ui_led_square.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0097-ui_display_meter.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0098-ui_display_scope.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0099-logic_and.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0100-logic_or.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0101-logic_xor.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0102-logic_not.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0103-logic_trigger.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0104-logic_gate.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0105-logic_hold.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0106-logic_flipflop.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0107-mod_lfo.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0108-mod_env.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0109-mod_sync.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0110-mod_phase.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0111-mod_ring.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0112-mod_freq.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0113-mod_amp.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0114-mod_offset.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0115-display_vu.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0116-display_bargraph.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0117-display_scope.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0118-display_segment.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0119-display_led.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0120-display_screen.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0121-display_dotmatrix.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0122-symbol_arrow_up.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0123-symbol_arrow_down.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0124-symbol_arrow_left.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0125-symbol_arrow_right.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0126-symbol_warning.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0127-symbol_alert.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0128-symbol_info.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0129-symbol_question.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0130-port_cv.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0131-port_gate.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0132-port_trs.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0133-port_ts.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0134-port_hdmi.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0135-port_optical.svg" \
  "/Users/kurogedelic/Documents/Fukiai/temp_ordered/0136-port_bluetooth.svg" \

# TTFに変換
echo "🔄 TTFに変換しています..."
npx svg2ttf /Users/kurogedelic/Documents/Fukiai/build/fukiai.svg /Users/kurogedelic/Documents/Fukiai/build/fukiai.ttf

# WOFFに変換
echo "🔄 WOFFに変換しています..."
npx ttf2woff /Users/kurogedelic/Documents/Fukiai/build/fukiai.ttf /Users/kurogedelic/Documents/Fukiai/build/fukiai.woff

# docsにコピー
echo "🔄 docsにコピーしています..."
cp /Users/kurogedelic/Documents/Fukiai/build/fukiai.woff /Users/kurogedelic/Documents/Fukiai/docs/

echo "✅ フォントのビルドが完了しました"
