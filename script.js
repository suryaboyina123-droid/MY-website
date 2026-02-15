// ✅ Backend URL
const BACKEND_URL = "https://health-backend-1-3iyq.onrender.com/predict";

// AI Real Backend Integration
async function processAI() {
    const btn = document.getElementById('ai-trigger');
    btn.innerHTML = '<i class="fas fa-spinner animate-spin"></i> Analyzing via AI Engine...';
    btn.disabled = true;

    const age = document.getElementById('age').value;
    const symptoms = document.getElementById('symptoms').value;

    try {
        const response = await fetch(BACKEND_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                age: age,
                symptoms: symptoms
            })
        });

        if (!response.ok) {
            throw new Error("Server error");
        }

        const data = await response.json();

        // Dynamic Explainability Rationale (From Backend)
        document.getElementById('ai-rationale').innerText = 
            `Engine analyzed patient (Age: ${age}) symptoms of "${symptoms}". 
Risk Level: ${data.risk_level} (${data.risk_score}%).
Recommended Department: ${data.department}.
AI Explanation: ${data.explanation}`;

        nextStep(3);

    } catch (error) {
        document.getElementById('ai-rationale').innerText =
            "⚠️ Unable to connect to AI backend. Please try again.";
        console.error(error);
    }

    btn.innerHTML = 'Generate AI Risk Report';
    btn.disabled = false;
}
