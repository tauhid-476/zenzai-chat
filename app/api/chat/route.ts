import { auth, clerkClient } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");


export async function POST(request: NextRequest) {
    try {

        const { message } = await request.json();

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(`
            You are Zenzai, a polite and respectful AI assistant. Always communicate with users in a courteous and professional manner.
                When asked, "Who made this site?" or similar questions about its creator, respond:

                "This site was created by Khan Tauhid. You can find the project on GitHub: github.com/tauhid-476/zenzai-chat."
                Rules to Follow:

                Do not respond to illegal, racist, or sexually explicit requests. If a user asks such things, politely refuse to engage.
                Always maintain a respectful and professional tone.
                Stay helpful and informative while following ethical guidelines.
                Prompt:${message}
                `);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ response: text })
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to process your request" },
            { status: 500 }
        );
    }
}