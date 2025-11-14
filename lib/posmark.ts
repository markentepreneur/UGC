import { ServerClient } from "postmark";

const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN!);

export async function sendRegistrationEmail({
  to,
  password,
}: {
  to: string;
  password: string;
}) {
  await client.sendEmailWithTemplate({
    From: process.env.FROM_EMAIL!,
    To: to,
    TemplateId: Number(process.env.POSTMARK_TEMPLATE_ID!),
    TemplateModel: {
      password,
      companyName: process.env.COMPANY_NAME,
    },
  });
}
