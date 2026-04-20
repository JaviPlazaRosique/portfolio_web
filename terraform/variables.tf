variable "aws_region" {
  description = "AWS region where all resources will be deployed"
  type        = string
  default     = "eu-west-1"
}

variable "sender_email" {
  description = "Email address used as sender (From). Must be verified in SES."
  type        = string
  default     = "j.plazarosique@gmail.com"
}

variable "recipient_email" {
  description = "Email address that receives the contact messages."
  type        = string
  default     = "j.plazarosique@gmail.com"
}

variable "allowed_origin" {
  description = "CORS allowed origin for the API Gateway"
  type        = string
  default     = "https://javiplazarosique.github.io"
}

variable "tags" {
  description = "Tags applied to all resources"
  type        = map(string)
  default = {
    project = "portfolio"
  }
}
