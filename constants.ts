
import { SimParams } from './types';

export const GRAVITY = 9.81;

export const DEFAULT_SIM_PARAMS: SimParams = {
  dropHeight: 8,   // m (Increased from 6m to ensure easy pass)
  radius: 2,       // m
  mass: 500,       // kg
  friction: 0.002, // Significantly reduced friction for easier success
  gravity: GRAVITY,
};

// Physics Constants for Canvas
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 500;
export const METER_TO_PIXEL = 40; // Scale: 1m = 40px

// Gemini Configuration
export const GEMINI_MODEL = 'gemini-3-flash-preview';