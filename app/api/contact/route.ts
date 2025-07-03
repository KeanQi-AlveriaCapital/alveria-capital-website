import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// Slack configuration
const SLACK_WEBHOOK_URL = process.env.SLACK_CONTACT_WEBHOOK_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, and message are required",
        },
        { status: 400 }
      );
    }

    // Create Slack message
    const slackMessage = {
      text: "📧 New Contact Form Submission",
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "📧 New Contact Form Submission",
          },
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Name:*\n${name}`,
            },
            {
              type: "mrkdwn",
              text: `*Email:*\n${email}`,
            },
            {
              type: "mrkdwn",
              text: `*Phone:*\n${phone || "Not provided"}`,
            },
          ],
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Message:*\n${message}`,
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `✅ Submitted at ${new Date().toLocaleString()}`,
            },
          ],
        },
      ],
    };

    // Send to Slack using webhook
    if (SLACK_WEBHOOK_URL) {
      await axios.post(SLACK_WEBHOOK_URL, slackMessage);
    } else {
      console.error("SLACK_WEBHOOK_URL not configured");
      return NextResponse.json(
        {
          success: false,
          message: "Slack webhook not configured",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error: any) {
    console.error("Error sending contact form:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error sending message. Please try again.",
      },
      { status: 500 }
    );
  }
}
