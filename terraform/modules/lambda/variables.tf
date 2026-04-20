variable "function_name" {
  description = "Name of the Lambda function"
  type        = string
}

variable "description" {
  description = "Description of the Lambda function"
  type        = string
  default     = ""
}

variable "role_arn" {
  description = "ARN of the IAM role assumed by the Lambda function"
  type        = string
}

variable "runtime" {
  description = "Runtime for the Lambda function (e.g. python3.12, nodejs20.x)"
  type        = string
}

variable "handler" {
  description = "Function entrypoint in the format file.method"
  type        = string
}

variable "source_dir" {
  description = "Path to the folder that will be zipped and deployed as the Lambda package"
  type        = string
}

variable "memory_size" {
  description = "Amount of memory in MB allocated to the function"
  type        = number
  default     = 128
}

variable "timeout" {
  description = "Maximum execution time in seconds"
  type        = number
  default     = 30
}

variable "environment_variables" {
  description = "Map of environment variables passed to the function"
  type        = map(string)
  default     = {}
}

variable "log_retention_days" {
  description = "Number of days to retain CloudWatch logs"
  type        = number
  default     = 14
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default     = {}
}
