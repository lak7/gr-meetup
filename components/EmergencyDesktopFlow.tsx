"use client";

import { useMemo, useState } from "react";

type Need = "medical" | "evacuation";
type Stage = "start" | "details" | "done";

type CopilotPlan = {
  summary: string;
  priority: "low" | "medium" | "high" | "critical";
  immediate_actions: string[];
  responder_brief: string;
  safety_checks: string[];
};

export function EmergencyDesktopFlow() {
  const [need, setNeed] = useState<Need>("medical");
  const [stage, setStage] = useState<Stage>("start");
  const [notes, setNotes] = useState("");
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [planError, setPlanError] = useState<string | null>(null);
  const [plan, setPlan] = useState<CopilotPlan | null>(null);

  const location = "Block A, 4th Floor, Near Staircase 2";
  const contact = "+91 98765 43210";

  const helperTitle = useMemo(() => {
    if (need === "medical") return "Medical help request";
    return "Evacuation help request";
  }, [need]);

  const nextAction = () => {
    if (stage === "start") setStage("details");
    if (stage === "details") setStage("done");
  };

  const reset = () => {
    setStage("start");
    setNeed("medical");
    setNotes("");
    setPlan(null);
    setPlanError(null);
  };

  const runCopilot = async () => {
    setLoadingPlan(true);
    setPlanError(null);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          need,
          location,
          contact,
          notes
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error ?? "Unable to create incident plan.");
      }

      setPlan(data.plan as CopilotPlan);
    } catch (error) {
      setPlanError(error instanceof Error ? error.message : "Unexpected error");
    } finally {
      setLoadingPlan(false);
    }
  };

  return (
    <main className="page">
      <div className="shell">
        <header className="hero">
          <div>
            <p className="eyebrow">FireShield</p>
            <h1>Emergency Help Desk + AI Copilot</h1>
            <p className="subtitle">Simple 3-step emergency flow with real-time Groq-powered action guidance.</p>
          </div>
          <button className="sos">Call Emergency</button>
        </header>

        <section className="card">
          <div className="section-head">
            <h2>{helperTitle}</h2>
            <p className="muted">Step {stage === "start" ? "1 of 3" : stage === "details" ? "2 of 3" : "3 of 3"}</p>
          </div>

          {stage === "start" && (
            <>
              <p className="label">What do you need right now?</p>
              <div className="grid two">
                <button className={need === "medical" ? "choice active red" : "choice"} onClick={() => setNeed("medical")}>
                  <h3>Medical assistance</h3>
                  <p>For injuries, burns, breathing issues, or someone unconscious.</p>
                </button>
                <button className={need === "evacuation" ? "choice active green" : "choice"} onClick={() => setNeed("evacuation")}>
                  <h3>Safe evacuation route</h3>
                  <p>Get nearest exit and safe assembly point instructions.</p>
                </button>
              </div>
              <button className="primary" onClick={nextAction}>Continue</button>
            </>
          )}

          {stage === "details" && (
            <>
              <div className="panel">
                <h3>Details to send</h3>
                <p><strong>Need:</strong> {need === "medical" ? "Medical assistance" : "Evacuation support"}</p>
                <p><strong>Location:</strong> {location}</p>
                <p><strong>Contact:</strong> {contact}</p>
                <small>Location accuracy: High</small>
              </div>

              <div className="tips">
                <h3>Tell AI Copilot more (optional)</h3>
                <textarea
                  className="notes"
                  placeholder="Example: heavy smoke near corridor, 1 person unconscious"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <button className="ghost" onClick={runCopilot} disabled={loadingPlan}>
                  {loadingPlan ? "Generating plan..." : "Generate AI Action Plan"}
                </button>
                {planError && <p className="error">{planError}</p>}
              </div>

              {plan && (
                <div className="copilot">
                  <h3>AI Incident Copilot Plan</h3>
                  <p><strong>Priority:</strong> {plan.priority}</p>
                  <p>{plan.summary}</p>
                  <p><strong>Immediate actions:</strong></p>
                  <ul>
                    {plan.immediate_actions?.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p><strong>Safety checks:</strong></p>
                  <ul>
                    {plan.safety_checks?.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p><strong>Responder brief:</strong> {plan.responder_brief}</p>
                </div>
              )}

              <button className="primary" onClick={nextAction}>Send Request</button>
            </>
          )}

          {stage === "done" && (
            <div className="success">
              <h3>Request sent successfully</h3>
              <p>Help is on the way. Request ID: FR-2026-05-10-001</p>
              <p>Estimated arrival: 6 minutes</p>
              <div className="actions">
                <button className="safe">I reached a safe point</button>
                <button className="ghost" onClick={reset}>Start new request</button>
              </div>
            </div>
          )}
        </section>

        <section className="dashboard">
          <h2>Live Response Queue</h2>
          <div className="dashboard-grid">
            <div className="incident">
              <p className="kind red">Medical - Moderate</p>
              <p>Block A, 4th Floor</p>
              <small>Updated 2 min ago</small>
            </div>
            <div className="incident">
              <p className="kind green">Evacuation Route Active</p>
              <p>Block B, 2nd Floor</p>
              <small>8 people moving</small>
            </div>
            <div className="incident">
              <p className="kind red">Medical - Severe</p>
              <p>Block C, 1st Floor</p>
              <small>Responder dispatched</small>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
