resource "aws_ses_email_identity" "sender" {
  email = var.sender_email
}

resource "aws_ses_email_identity" "recipient" {
  count = var.sender_email != var.recipient_email ? 1 : 0
  email = var.recipient_email
}

data "aws_iam_policy_document" "send_email" {
  statement {
    sid     = "AllowSESSendEmail"
    effect  = "Allow"
    actions = ["ses:SendEmail", "ses:SendRawEmail"]
    resources = [
      aws_ses_email_identity.sender.arn,
    ]
  }
}

resource "aws_iam_policy" "send_email" {
  name        = "${var.policy_name_prefix}-ses-send-email"
  description = "Allows sending email via SES from the verified sender identity"
  policy      = data.aws_iam_policy_document.send_email.json

  tags = var.tags
}
