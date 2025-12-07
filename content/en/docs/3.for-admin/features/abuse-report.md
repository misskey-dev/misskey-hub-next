# Abuse Reports

Misskey can receive abuse reports about content within the server from users both inside and outside the server.

Reports are sent to [Control Panel > Reports](x-mi-web://admin/abuses).**We recommend checking it frequently.**

## Handling abuse reports

The report contains the following information:

- The user being reported
- The details of the report
- The reporter

の情報が含まれています。

:::tip

Reports may be forwarded from remote servers.In such cases, the reporter may be the system account for that server (`@instance.actor`).

:::

If necessary, you can leave moderation notes to document the circumstances of the report. These notes can only be viewed by accounts with administrator and moderator privileges.

Once you've completed handling the report, mark it as complete.

- If the content is legitimate and action has been taken, mark as “Resolved (Approved)”.
- If the content is fraudulent and no specific action is taken, mark as “Resolved (Denied)”.

In this way, you can differentiate the resolution status based on the outcome of the response and conclude the handling accordingly.

## Forwarding abuse reports

For reports concerning remote users, you can forward the report to the target server.When forwarding a report, the reporter is forwarded as an anonymous system account (`@instance.actor`).

## Notification of abuse report

You can receive notifications of reports via webhook or email.Open [Control Panel > Reports](x-mi-web://admin/abuses) and configure settings under “Notification Settings”.
