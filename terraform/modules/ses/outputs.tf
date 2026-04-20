output "sender_identity_arn" {
  description = "ARN of the verified sender email identity"
  value       = aws_ses_email_identity.sender.arn
}

output "send_email_policy_arn" {
  description = "ARN of the IAM policy that allows ses:SendEmail — attach this to the Lambda role"
  value       = aws_iam_policy.send_email.arn
}
