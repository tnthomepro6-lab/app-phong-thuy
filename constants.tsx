
import React from 'react';
import { HouseDirection, HouseType } from './types';

export const DIRECTIONS: { value: HouseDirection; label: string; icon: string }[] = [
  { value: "N", label: "Bắc", icon: "fa-arrow-up" },
  { value: "S", label: "Nam", icon: "fa-arrow-down" },
  { value: "E", label: "Đông", icon: "fa-arrow-right" },
  { value: "W", label: "Tây", icon: "fa-arrow-left" },
  { value: "NE", label: "Đông Bắc", icon: "fa-arrow-up-right" },
  { value: "NW", label: "Tây Bắc", icon: "fa-arrow-up-left" },
  { value: "SE", label: "Đông Nam", icon: "fa-arrow-down-right" },
  { value: "SW", label: "Tây Nam", icon: "fa-arrow-down-left" },
];

export const HOUSE_TYPES: { value: HouseType; label: string; icon: string }[] = [
  { value: "Villa", label: "Biệt thự", icon: "fa-house-chimney" },
  { value: "Townhouse", label: "Nhà phố", icon: "fa-building" },
  { value: "Apartment", label: "Chung cư", icon: "fa-city" },
];

export const ELEMENT_COLORS: Record<string, string> = {
  "Kim": "bg-yellow-500/10 border-yellow-500/30 text-yellow-500",
  "Mộc": "bg-green-500/10 border-green-500/30 text-green-500",
  "Thủy": "bg-blue-500/10 border-blue-500/30 text-blue-500",
  "Hỏa": "bg-red-500/10 border-red-500/30 text-red-500",
  "Thổ": "bg-orange-800/20 border-orange-800/40 text-orange-400",
};
