import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_CHANNEL_ID = process.env.SLACK_CHANNEL_ID;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const resume = formData.get("resume") as File;

    if (!resume) {
      return NextResponse.json(
        {
          success: false,
          message: "No resume file uploaded",
        },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(resume.type)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid file type. Only PDF, DOC, and DOCX files are allowed.",
        },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    if (resume.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          message: "File too large. Maximum size is 10MB.",
        },
        { status: 400 }
      );
    }

    const bytes = await resume.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadParams = new URLSearchParams({
      filename: resume.name,
      length: resume.size.toString(),
    });

    const getUploadUrlResponse = await axios.get(
      `https://slack.com/api/files.getUploadURLExternal?${uploadParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
        },
      }
    );

    console.log("Upload URL response:", {
      ok: getUploadUrlResponse.data.ok,
      error: getUploadUrlResponse.data.error,
      has_upload_url: !!getUploadUrlResponse.data.upload_url,
      has_file_id: !!getUploadUrlResponse.data.file_id,
    });

    if (!getUploadUrlResponse.data.ok) {
      console.error("Failed to get upload URL:", getUploadUrlResponse.data);
      return NextResponse.json(
        {
          success: false,
          message: `Failed to get upload URL: ${getUploadUrlResponse.data.error}`,
        },
        { status: 500 }
      );
    }

    const { upload_url, file_id } = getUploadUrlResponse.data;

    const uploadResponse = await axios.post(upload_url, buffer, {
      headers: {
        "Content-Type": resume.type,
      },
      timeout: 60000,
    });

    if (uploadResponse.status !== 200) {
      console.error("File upload failed with status:", uploadResponse.status);
      return NextResponse.json(
        {
          success: false,
          message: `File upload failed with status: ${uploadResponse.status}`,
        },
        { status: 500 }
      );
    }

    const completeUploadResponse = await axios.post(
      "https://slack.com/api/files.completeUploadExternal",
      {
        files: [
          {
            id: file_id,
            title: `Resume - ${name}`,
          },
        ],
        channel_id: SLACK_CHANNEL_ID,
        initial_comment: `📄 New job application from **${name}** for position: **${position}**`,
      },
      {
        headers: {
          Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!completeUploadResponse.data.ok) {
      console.error(
        "Failed to complete upload:",
        completeUploadResponse.data.error
      );
      return NextResponse.json(
        {
          success: false,
          message: `Failed to complete upload: ${completeUploadResponse.data.error}`,
        },
        { status: 500 }
      );
    }

    // Get file permalink for notification
    const uploadedFile = completeUploadResponse.data.files?.[0];
    const slackFileUrl = uploadedFile?.permalink || "";

    // Send additional webhook notification with rich formatting
    const slackMessage: any = {
      text: "✅ Resume Successfully Uploaded!",
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "✅ Resume Successfully Uploaded!",
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
              text: `*Position:*\n${position}`,
            },
            {
              type: "mrkdwn",
              text: `*File:*\n${resume.name}`,
            },
            {
              type: "mrkdwn",
              text: `*Size:*\n${(resume.size / 1024 / 1024).toFixed(2)} MB`,
            },
          ],
        },
      ],
    };

    // Add file link if available
    if (slackFileUrl) {
      slackMessage.blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `📎 *<${slackFileUrl}|Click here to view the resume>*`,
        },
      });
    }

    // Add status context
    slackMessage.blocks.push({
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `✅ File uploaded successfully to Slack | File ID: ${file_id}`,
        },
      ],
    });

    // Send webhook notification
    try {
      await axios.post(SLACK_WEBHOOK_URL, slackMessage);
      console.log("✅ Webhook notification sent successfully");
    } catch (webhookError) {
      console.error("Webhook notification failed:", webhookError);
      // Don't fail the whole request if webhook fails
    }

    return NextResponse.json({
      success: true,
      message: "Resume uploaded to Slack successfully!",
      fileId: file_id,
      fileUrl: slackFileUrl,
    });
  } catch (error: any) {
    console.error("❌ Error processing resume submission:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    return NextResponse.json(
      {
        success: false,
        message: "Error processing your submission. Please try again.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
