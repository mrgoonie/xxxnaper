/**
 * 15 Curated gradient presets from design guidelines
 */

import type { GradientPreset } from '$lib/types';

export const GRADIENT_PRESETS: GradientPreset[] = [
  // Cool Tones (4)
  {
    id: 'purple-dream',
    name: 'Purple Dream',
    value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    value: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
  },
  {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    value: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)',
  },
  {
    id: 'cool-mint',
    name: 'Cool Mint',
    value: 'linear-gradient(135deg, #02aab0 0%, #00cdac 100%)',
  },

  // Warm Tones (4)
  {
    id: 'sunset-bliss',
    name: 'Sunset Bliss',
    value: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',
  },
  {
    id: 'peachy-keen',
    name: 'Peachy Keen',
    value: 'linear-gradient(135deg, #ed4264 0%, #ffedbc 100%)',
  },
  {
    id: 'sweet-morning',
    name: 'Sweet Morning',
    value: 'linear-gradient(135deg, #ff5f6d 0%, #ffc371 100%)',
  },
  {
    id: 'orange-coral',
    name: 'Orange Coral',
    value: 'linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)',
  },

  // Vibrant Tones (4)
  {
    id: 'purple-love',
    name: 'Purple Love',
    value: 'linear-gradient(135deg, #cc2b5e 0%, #753a88 100%)',
  },
  {
    id: 'bloody-mary',
    name: 'Bloody Mary',
    value: 'linear-gradient(135deg, #ff512f 0%, #dd2476 100%)',
  },
  {
    id: 'cosmic-night',
    name: 'Cosmic Night',
    value: 'linear-gradient(135deg, #4568dc 0%, #b06ab3 100%)',
  },
  {
    id: 'lush-green',
    name: 'Lush Green',
    value: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
  },

  // Neutral/Pastel Tones (3)
  {
    id: 'soft-pink',
    name: 'Soft Pink',
    value: 'linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)',
  },
  {
    id: 'pale-wood',
    name: 'Pale Wood',
    value: 'linear-gradient(135deg, #eacda3 0%, #d6ae7b 100%)',
  },
  {
    id: 'decent-gray',
    name: 'Decent Gray',
    value: 'linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%)',
  },
];

export const DEFAULT_GRADIENT = GRADIENT_PRESETS[0]; // Purple Dream
