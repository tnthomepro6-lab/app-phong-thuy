
import { GoogleGenAI } from "@google/genai";
import { FengShuiInput, FengShuiResult } from "../types";

export async function getAIFengShuiSummary(input: FengShuiInput, result: FengShuiResult): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Bạn là chuyên gia tư vấn phong thủy cao cấp của thương hiệu "Thái Vua Nội Thất Phong Thủy".
    Gia chủ sinh ngày: ${input.dob}, giới tính ${input.gender === 'male' ? 'Nam' : 'Nữ'}.
    Cung phi: ${result.summary.cungPhi}, Mệnh: ${result.summary.fateElement}.
    Hướng nhà hiện tại: ${input.houseDirection}.
    
    Hãy viết một đoạn tóm tắt ngắn (khoảng 150 chữ) mang tính chuyên nghiệp và truyền cảm hứng về cách tối ưu hóa nội thất để kiến tạo một không gian sống hạnh phúc.
    Tập trung vào cảm giác không gian (vật liệu, ánh sáng, năng lượng) thay vì chỉ liệt kê hướng.
    Giọng văn tinh tế, đẳng cấp, xứng tầm vị thế gia chủ.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Chúc bạn kiến tạo được không gian sống hạnh phúc và tràn đầy năng lượng.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Phong thủy là nghệ thuật của sự cân bằng. Với bản mệnh của bạn, việc chú trọng vào sự thông thoáng và hài hòa màu sắc sẽ mang lại hạnh phúc cho ngôi nhà.";
  }
}
