const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const MODEL = import.meta.env.VITE_OPENAI_MODEL;

export async function askGPT(question) {
  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: "당신은 부산 지역 관광 안내 챗봇입니다."
          },
          {
            role: "user",
            content: question
          }
        ]
      })
    }
  );

  const data = await response.json();

  console.log(data);

  if (!response.ok) {
    return data.error?.message || "OpenAI 오류";
  }

  return data.choices[0].message.content;
}