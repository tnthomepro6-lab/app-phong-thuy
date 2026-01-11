
import { FengShuiInput, FengShuiResult, FateElement, DirectionDetail, HouseDirection } from '../types';

/**
 * Calculates Cung Phi (Palace/Trigram) based on birth year and gender.
 * Standard simplified Bát Trạch method.
 */
export function calculateFengShui(input: FengShuiInput): FengShuiResult {
  const { dob, gender } = input;
  const birthDate = new Date(dob);
  const yearOfBirth = birthDate.getFullYear();

  // Simplified Cung Phi calculation based on solar year
  let sum = yearOfBirth.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  while (sum > 9) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }

  // Male: 11 - sum, Female: 4 + sum
  let cungValue = gender === 'male' ? 11 - sum : 4 + sum;
  if (cungValue > 9) cungValue -= 9;
  if (cungValue < 1) cungValue += 9;

  // Map to Cung and Element
  const mapping: Record<number, { name: string; element: FateElement; group: "Đông Tứ Mệnh" | "Tây Tứ Mệnh" }> = {
    1: { name: "Khảm", element: "Thủy", group: "Đông Tứ Mệnh" },
    2: { name: "Khôn", element: "Thổ", group: "Tây Tứ Mệnh" },
    3: { name: "Chấn", element: "Mộc", group: "Đông Tứ Mệnh" },
    4: { name: "Tốn", element: "Mộc", group: "Đông Tứ Mệnh" },
    5: { name: gender === 'male' ? "Khôn" : "Cấn", element: "Thổ", group: "Tây Tứ Mệnh" },
    6: { name: "Càn", element: "Kim", group: "Tây Tứ Mệnh" },
    7: { name: "Đoài", element: "Kim", group: "Tây Tứ Mệnh" },
    8: { name: "Cấn", element: "Thổ", group: "Tây Tứ Mệnh" },
    9: { name: "Ly", element: "Hỏa", group: "Đông Tứ Mệnh" },
  };

  const info = mapping[cungValue];

  const directionsList: DirectionDetail[] = [
    { direction: "Bắc", meaning: info.group === "Đông Tứ Mệnh" ? "Phục Vị/Thiên Y" : "Lục Sát/Tuyệt Mệnh", isGood: info.group === "Đông Tứ Mệnh" },
    { direction: "Nam", meaning: info.group === "Đông Tứ Mệnh" ? "Phục Vị/Diên Niên" : "Tuyệt Mệnh/Lục Sát", isGood: info.group === "Đông Tứ Mệnh" },
    { direction: "Đông", meaning: info.group === "Đông Tứ Mệnh" ? "Thiên Y/Sinh Khí" : "Ngũ Quỷ/Họa Hại", isGood: info.group === "Đông Tứ Mệnh" },
    { direction: "Đông Nam", meaning: info.group === "Đông Tứ Mệnh" ? "Sinh Khí/Diên Niên" : "Họa Hại/Ngũ Quỷ", isGood: info.group === "Đông Tứ Mệnh" },
    { direction: "Tây", meaning: info.group === "Tây Tứ Mệnh" ? "Sinh Khí/Thiên Y" : "Họa Hại/Ngũ Quỷ", isGood: info.group === "Tây Tứ Mệnh" },
    { direction: "Tây Bắc", meaning: info.group === "Tây Tứ Mệnh" ? "Phục Vị/Diên Niên" : "Lục Sát/Tuyệt Mệnh", isGood: info.group === "Tây Tứ Mệnh" },
    { direction: "Tây Nam", meaning: info.group === "Tây Tứ Mệnh" ? "Thiên Y/Sinh Khí" : "Tuyệt Mệnh/Lục Sát", isGood: info.group === "Tây Tứ Mệnh" },
    { direction: "Đông Bắc", meaning: info.group === "Tây Tứ Mệnh" ? "Diên Niên/Phục Vị" : "Ngũ Quỷ/Họa Hại", isGood: info.group === "Tây Tứ Mệnh" },
  ];

  const bestD = directionsList.filter(d => d.isGood).map(d => d.direction);

  const colorsByElement: Record<FateElement, { p: string[]; s: string[]; a: string[]; notes: string[] }> = {
    "Kim": { 
      p: ["Trắng", "Xám"], 
      s: ["Vàng", "Nâu"], 
      a: ["Bạch kim", "Ánh bạc"],
      notes: ["Hợp với màu hành Thổ (Vàng, Nâu) vì Thổ sinh Kim.", "Tránh màu đỏ, hồng (Hỏa khắc Kim)."] 
    },
    "Mộc": { 
      p: ["Xanh lá", "Xanh lục"], 
      s: ["Đen", "Xanh biển"], 
      a: ["Nâu gỗ"],
      notes: ["Hợp với màu hành Thủy (Đen, Xanh biển) vì Thủy sinh Mộc.", "Tránh màu trắng, ánh kim (Kim khắc Mộc)."] 
    },
    "Thủy": { 
      p: ["Đen", "Xanh nước biển"], 
      s: ["Trắng", "Xám"], 
      a: ["Xanh dương nhạt"],
      notes: ["Hợp với màu hành Kim (Trắng, Xám) vì Kim sinh Thủy.", "Tránh màu vàng, nâu đất (Thổ khắc Thủy)."] 
    },
    "Hỏa": { 
      p: ["Đỏ", "Tím", "Cam"], 
      s: ["Xanh lá"], 
      a: ["Vàng đồng"],
      notes: ["Hợp với màu hành Mộc (Xanh lá) vì Mộc sinh Hỏa.", "Tránh màu đen, xanh biển (Thủy khắc Hỏa)."] 
    },
    "Thổ": { 
      p: ["Vàng", "Nâu đất"], 
      s: ["Đỏ", "Hồng", "Tím"], 
      a: ["Gạch nung"],
      notes: ["Hợp với màu hành Hỏa (Đỏ, Tím) vì Hỏa sinh Thổ.", "Tránh màu xanh lá (Mộc khắc Thổ)."] 
    }
  };

  return {
    summary: {
      cungPhi: info.name,
      fateElement: info.element,
      group: info.group,
      directions: directionsList,
    },
    kitchen: {
      bestDirections: bestD.slice(0, 2),
      notes: [
        "Nên đặt tại cung xấu nhưng nhìn về hướng tốt (Tọa Hung Hướng Cát).",
        "Tránh đặt bếp đối diện nhà vệ sinh hoặc cửa chính.",
        "Không nên đặt bếp dưới xà ngang hoặc dưới điều hòa."
      ]
    },
    altar: {
      bestDirections: [bestD[0]],
      notes: [
        "Ban thờ cần đặt ở vị trí trang trọng, tĩnh lặng nhất ngôi nhà.",
        "Tránh hướng ban thờ nhìn thẳng vào nhà vệ sinh hoặc phòng ngủ.",
        "Không đặt ban thờ dưới tầng hầm hoặc nơi có đường ống nước đi qua."
      ]
    },
    bedroom: {
      bedHeadDirections: bestD,
      notes: [
        "Đầu giường nên tựa vào tường vững chãi, không có cửa sổ ngay phía sau.",
        "Tránh đặt giường đối diện gương soi lớn.",
        "Hướng giường nên quay về các cung tốt của bản mệnh."
      ]
    },
    toilet: {
      recommendedZones: directionsList.filter(d => !d.isGood).map(d => d.direction),
      avoidZones: directionsList.filter(d => d.isGood).map(d => d.direction),
      notes: [
        "Nên đặt ở các cung xấu để trấn áp sát khí (Tọa Hung).",
        "Tránh đặt nhà vệ sinh ở trung tâm ngôi nhà (Trung cung).",
        "Cửa vệ sinh không nên đối diện trực tiếp với cửa chính hoặc giường ngủ."
      ]
    },
    colors: {
      primary: colorsByElement[info.element].p,
      secondary: colorsByElement[info.element].s,
      accent: colorsByElement[info.element].a,
      notes: colorsByElement[info.element].notes
    }
  };
}
