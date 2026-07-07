export interface UserProfile {
  username: string;
  postcode: string;
  city?: string;
  state?: string;
  country?: string;
  lastFrostDate?: string;
  hasBiometrics: boolean;
  avatarSeed: string;
}

export interface GeocodeResult {
  latitude: number;
  longitude: number;
  name: string;
  admin1?: string;
  country: string;
  postcode?: string;
}

export type SunRequirement = 'Full Sun' | 'Partial Shade' | 'Full Shade' | 'Indirect Light';
export type WaterConsumption = 'Low' | 'Moderate' | 'High' | 'Extreme';

export interface GrowthStage {
  dayRange: [number, number];
  name: string;
  description: string;
  careTips: string;
  illustrationSeed: string; // Used to seed custom decorative visual growth renders
  heightInches: number;
}

export interface PlantLayout {
  rows: number;
  plantsPerRow: number;
  totalPlants: number;
  fertilizerBand: 'center' | 'side' | 'double-side';
  diagramPoints: { x: number; y: number }[]; // Coordinates on a 100x100 grid of the top-down Earthbox
  instructions: string;
}

export interface PlantType {
  id: string;
  name: string;
  scientificName: string;
  category: 'Vegetable' | 'Herb' | 'Fruit';
  description: string;
  climbingFrameRequired: boolean;
  climbingFrameType?: string;
  shadeRequirement: SunRequirement;
  waterConsumption: WaterConsumption;
  waterGallonsPerWeekLocal: number; // Base gallons per week
  daysToHarvest: number;
  daysToSprout: number;
  recommendedPlantingSeason: string;
  earthboxLayout: PlantLayout;
  stages: GrowthStage[];
}

export interface PlanterBox {
  id: string;
  name: string;
  createdAt: number;
  plantId: string;
  plantCount: number;
  plantingDate: number; // Timestamp
  waterReservoirLevel: number; // 0 to 100%
  soilMoisture: number; // 0 to 100%
  notes: string[];
  refilledAt?: number;
  planterType?: 'earthbox' | 'hozelock_growbag' | 'emsco_citypicker' | 'linex_raised' | 'ourwarm_windowsill' | 'biolan_planter' | 'oasesbox' | 'earthbox_junior';
  growBagType?: string;
}

export interface WeatherData {
  temp: number;
  state: 'Sunny' | 'Rainy' | 'Cloudy' | 'Freezing' | 'Windy' | 'Stormy' | 'Calm';
  humidity: number;
  windSpeed: number;
  forecast: { day: string; temp: number; state: string }[];
  alerts: NotificationAlert[];
}

export interface NotificationAlert {
  id: string;
  type: 'freeze' | 'storm' | 'water' | 'heat' | 'sys';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}
