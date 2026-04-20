variable "api_name" {
  description = "Name of the API Gateway REST API"
  type        = string
}

variable "description" {
  description = "Description of the API Gateway"
  type        = string
  default     = ""
}

variable "stage_name" {
  description = "Name of the deployment stage (e.g. dev, prod)"
  type        = string
  default     = "prod"
}

variable "lambda_invoke_arn" {
  description = "Invoke ARN of the Lambda function (output invoke_arn from the lambda module)"
  type        = string
}

variable "lambda_function_name" {
  description = "Name of the Lambda function to grant invoke permission to API Gateway"
  type        = string
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default     = {}
}
