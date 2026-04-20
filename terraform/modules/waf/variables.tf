variable "name" {
  description = "Name for the WAF Web ACL and its CloudWatch metrics"
  type        = string
}

variable "api_gateway_stage_arn" {
  description = "ARN of the API Gateway stage to protect"
  type        = string
}

variable "rate_limit" {
  description = "Max requests per IP in a 5-minute window before blocking"
  type        = number
  default     = 100
}

variable "tags" {
  description = "Tags to apply to the WAF resources"
  type        = map(string)
  default     = {}
}
