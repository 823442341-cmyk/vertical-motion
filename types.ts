
export enum ModuleType {
  PROPOSAL = 'proposal',
  CONSTRUCTION = 'construction',
  SIMULATION = 'simulation',
  SHOWCASE = 'showcase'
}

export interface ExperimentRecord {
  id: string;
  radius: number; // meters
  theoryHeight: number; // meters (Calculated)
  actualHeight: number; // meters
  success: boolean;
  notes: string;
}

export interface TeamMember {
  role: string;
  name: string;
  task: string;
}

export interface SimParams {
  dropHeight: number;   // meters (Start height)
  radius: number;       // meters (Loop radius)
  mass: number;         // kg
  friction: number;     // coefficient
  gravity: number;      // m/s^2
}

export interface SimState {
  time: number;
  angle: number;      // angle in loop (radians)
  velocity: number;   // m/s
  height: number;     // current height from ground (m)
  kineticEnergy: number;
  potentialEnergy: number;
  mechanicalEnergy: number;
  normalForce: number;
  isFalling: boolean;
  x: number;
  y: number;
  phase: 'active' | 'crashed' | 'finished';
}
