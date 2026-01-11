
export type Gender = "male" | "female";

export type HouseDirection = "N" | "S" | "E" | "W" | "NE" | "NW" | "SE" | "SW";

export type HouseType = "Villa" | "Townhouse" | "Apartment";

export interface FengShuiInput {
  dob: string; // Date of birth string (YYYY-MM-DD)
  gender: Gender;
  houseDirection: HouseDirection;
  houseType?: HouseType;
}

export type FateElement = "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";

export interface DirectionDetail {
  direction: string;
  meaning: string;
  isGood: boolean;
}

export interface FengShuiResult {
  summary: {
    cungPhi: string;
    fateElement: FateElement;
    group: "Đông Tứ Mệnh" | "Tây Tứ Mệnh";
    directions: DirectionDetail[];
  };
  kitchen: {
    bestDirections: string[];
    notes: string[];
  };
  altar: {
    bestDirections: string[];
    notes: string[];
  };
  bedroom: {
    bedHeadDirections: string[];
    notes: string[];
  };
  toilet: {
    recommendedZones: string[];
    avoidZones: string[];
    notes: string[];
  };
  colors: {
    primary: string[];
    secondary: string[];
    accent: string[];
    notes: string[];
  };
  aiAdvice?: string;
}
