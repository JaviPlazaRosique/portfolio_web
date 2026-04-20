variable "sender_email" {
  description = "Email address used as sender (From). Must be verified in SES."
  type        = string
}

variable "recipient_email" {
  description = "Email address that receives the contact messages. Must be verified in SES sandbox."
  type        = string
}

variable "policy_name_prefix" {
  description = "Prefix for the IAM policy name created by this module"
  type        = string
  default     = "portfolio"
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default     = {}
}
