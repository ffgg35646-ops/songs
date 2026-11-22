// Vercel serverless bridge for a self-hosted ACE-Step 1.5 API.
// Configure ACESTEP_API_URL (and optionally ACESTEP_API_KEY) in Vercel Environment Variables.
const BASE = (process.env.ACESTEP_API_URL || "").replace(/\/+$/, "");
const KEY = process.env.ACESTEP_API_KEY || "";

function headers() {
  const h = { "Content-Type": "application/json" };
  if (KEY) h.Authorization = `Bearer ${KEY}`;
  return h;
}
async function upstream(path, options = {}) {
  const response = await fetch(`${BASE}${path}`, { ...options, headers: { ...headers(), ...(options.headers || {}) } });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || (body.code && body.code !== 200)) {
    throw new Error(body.detail || body.error || "ACE-Step server returned an error.");
  }
  return body.data ?? body;
}
module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });
  if (!BASE) return res.status(503).json({ error: "محرك الأغاني لم يتم توصيله بعد. شغّل ACE-Step مجاناً على جهازك، أو أضف عنوان خادمه في ACESTEP_API_URL داخل إعدادات Vercel." });
  try {
    const body = req.body || {};
    if (body.action === "start") {
      if (typeof body.sample_query !== "string" || !body.sample_query.trim()) {
        return res.status(400).json({ error: "اكتب وصف الأغنية أولاً." });
      }
      const data = await upstream("/release_task", {
        method: "POST",
        body: JSON.stringify({
          sample_mode: true,
          sample_query: body.sample_query.slice(0, 1800),
          thinking: true,
          vocal_language: body.vocal_language || "unknown",
          instrumental: Boolean(body.instrumental),
          audio_format: "mp3",
          batch_size: 1,
          inference_steps: 8
        })
      });
      if (!data.task_id) throw new Error("ACE-Step did not return a task ID.");
      return res.status(200).json({ taskId: data.task_id });
    }
    if (body.action === "status") {
      if (typeof body.taskId !== "string" || !/^[a-zA-Z0-9-]{8,80}$/.test(body.taskId)) {
        return res.status(400).json({ error: "Invalid task ID." });
      }
      const data = await upstream("/query_result", {
        method: "POST",
        body: JSON.stringify({ task_id_list: [body.taskId] })
      });
      const task = Array.isArray(data) ? data[0] : null;
      if (!task) return res.status(200).json({ status: "processing" });
      if (task.status === 0) return res.status(200).json({ status: "processing" });
      if (task.status === 2) return res.status(200).json({ status: "failed", error: "فشل محرك ACE-Step في إنشاء الأغنية." });
      let result = task.result;
      if (typeof result === "string") result = JSON.parse(result);
      const track = Array.isArray(result) ? result[0] : result;
      if (!track || typeof track.file !== "string") throw new Error("ACE-Step finished without an audio file.");
      const audioUrl = new URL(track.file, BASE + "/").toString();
      return res.status(200).json({ status: "done", audioUrl, title: "أغنيتك الجديدة" });
    }
    return res.status(400).json({ error: "Unknown action." });
  } catch (error) {
    return res.status(502).json({ error: error.message || "تعذر الاتصال بمحرك الموسيقى." });
  }
};
