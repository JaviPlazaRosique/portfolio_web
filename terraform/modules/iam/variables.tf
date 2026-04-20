variable "role_name" {
  description = "Name of the IAM role"
  type        = string
}

variable "principal_type" {
  description = "Type of principal allowed to assume the role (Service, AWS, Federated)"
  type        = string
  default     = "Service"
}

variable "principal_identifiers" {
  description = "List of principal identifiers allowed to assume the role"
  type        = list(string)
}

variable "managed_policy_arns" {
  description = "Map of logical_name => ARN of policies to attach to the role. Keys must be static strings."
  type        = map(string)
  default     = {}
}

variable "tags" {
  description = "Tags to apply to all IAM resources"
  type        = map(string)
  default     = {}
}
