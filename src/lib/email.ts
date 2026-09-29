import { Resend } from "resend";

export interface SiteScreenNotificationData {
  referenceId: string;
  fullName: string;
  workEmail: string;
  company?: string | null;
  role?: string | null;
  candidateSite: string;
  projectType: string;
  approximateCapacityMw?: number | null;
  approximateDurationHours?: number | null;
  developmentStage: string;
  primaryDecisionQuestion: string;
  additionalNotes?: string | null;
  createdAt: string;
}

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "admin@geospatialabs.com";
const fromEmail = process.env.RESEND_FROM_EMAIL || "GeoSpatia Labs Inquiries <onboarding@resend.dev>";

export async function sendAdminNotification(
  data: SiteScreenNotificationData
): Promise<{ success: boolean; skipped?: boolean; error?: string }> {
  if (!resend) {
    console.info("[email] RESEND_API_KEY is not configured. Admin email notification skipped.");
    return { success: false, skipped: true };
  }

  const companyOrName = data.company?.trim() || data.fullName.trim() || "Inquirer";
  const subject = `[GeoSpatia Labs] New Site Screen Request: ${companyOrName} (${data.referenceId.slice(0, 8)})`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; background-color: #f8fafc; padding: 24px; }
    .card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 600px; margin: 0 auto; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .header { border-bottom: 2px solid #10b981; padding-bottom: 16px; margin-bottom: 20px; }
    .title { font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 4px; }
    .subtitle { font-size: 13px; color: #64748b; margin: 0; }
    .section { margin-bottom: 18px; }
    .section-title { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #047857; margin-bottom: 8px; }
    .field-row { margin-bottom: 8px; font-size: 14px; }
    .field-label { font-weight: 600; color: #475569; width: 140px; display: inline-block; }
    .field-value { color: #0f172a; }
    .box { background: #f1f5f9; border-radius: 6px; padding: 12px 14px; font-size: 14px; line-height: 1.5; color: #1e293b; margin-top: 4px; white-space: pre-wrap; }
    .footer { border-top: 1px solid #e2e8f0; margin-top: 24px; padding-top: 16px; font-size: 12px; color: #94a3b8; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1 class="title">New Preliminary Site Screen Request</h1>
      <p class="subtitle">Reference ID: ${data.referenceId} &bull; Submitted: ${data.createdAt}</p>
    </div>

    <div class="section">
      <div class="section-title">Contact Information</div>
      <div class="field-row"><span class="field-label">Full Name:</span> <span class="field-value">${escapeHtml(data.fullName)}</span></div>
      <div class="field-row"><span class="field-label">Work Email:</span> <span class="field-value"><a href="mailto:${escapeHtml(data.workEmail)}">${escapeHtml(data.workEmail)}</a></span></div>
      <div class="field-row"><span class="field-label">Company:</span> <span class="field-value">${escapeHtml(data.company || "Not specified")}</span></div>
      <div class="field-row"><span class="field-label">Role:</span> <span class="field-value">${escapeHtml(data.role || "Not specified")}</span></div>
    </div>

    <div class="section">
      <div class="section-title">Candidate Site &amp; Project</div>
      <div class="field-row"><span class="field-label">Project Type:</span> <span class="field-value">${escapeHtml(data.projectType)}</span></div>
      <div class="field-row"><span class="field-label">Capacity (MW):</span> <span class="field-value">${data.approximateCapacityMw !== null && data.approximateCapacityMw !== undefined ? `${data.approximateCapacityMw} MW` : "Not specified"}</span></div>
      <div class="field-row"><span class="field-label">Duration (Hours):</span> <span class="field-value">${data.approximateDurationHours !== null && data.approximateDurationHours !== undefined ? `${data.approximateDurationHours} Hours` : "Not specified"}</span></div>
      <div class="field-row"><span class="field-label">Stage:</span> <span class="field-value">${escapeHtml(data.developmentStage)}</span></div>
      <div style="margin-top: 10px;">
        <span class="field-label" style="display:block; margin-bottom: 4px;">Candidate Site Location:</span>
        <div class="box">${escapeHtml(data.candidateSite)}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Evaluation Question</div>
      <div class="box">${escapeHtml(data.primaryDecisionQuestion)}</div>
    </div>

    ${data.additionalNotes ? `
    <div class="section">
      <div class="section-title">Additional Notes</div>
      <div class="box">${escapeHtml(data.additionalNotes)}</div>
    </div>
    ` : ""}

    <div class="footer">
      This notification was automatically dispatched by the GeoSpatia Labs platform upon verified database insertion.
    </div>
  </div>
</body>
</html>
  `.trim();

  const text = `
New Preliminary Site Screen Request
----------------------------------
Reference ID: ${data.referenceId}
Submitted: ${data.createdAt}

Contact Information:
- Name: ${data.fullName}
- Email: ${data.workEmail}
- Company: ${data.company || "Not specified"}
- Role: ${data.role || "Not specified"}

Project Details:
- Project Type: ${data.projectType}
- Capacity: ${data.approximateCapacityMw ?? "N/A"} MW
- Duration: ${data.approximateDurationHours ?? "N/A"} Hours
- Development Stage: ${data.developmentStage}

Candidate Site:
${data.candidateSite}

Primary Decision Question:
${data.primaryDecisionQuestion}

${data.additionalNotes ? `Additional Notes:\n${data.additionalNotes}\n` : ""}
  `.trim();

  try {
    const response = await resend.emails.send({
      from: fromEmail,
      to: [adminEmail],
      replyTo: data.workEmail,
      subject,
      text,
      html,
    });

    if (response.error) {
      console.warn("[email] Resend returned an error:", response.error.message);
      return { success: false, error: response.error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    console.warn("[email] Exception during admin notification send:", errorMsg);
    return { success: false, error: errorMsg };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
