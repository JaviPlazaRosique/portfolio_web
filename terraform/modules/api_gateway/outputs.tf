output "api_id" {
  description = "ID of the REST API"
  value       = aws_api_gateway_rest_api.this.id
}

output "invoke_url" {
  description = "URL to invoke the API: https://<id>.execute-api.<region>.amazonaws.com/<stage>"
  value       = aws_api_gateway_stage.this.invoke_url
}

output "execution_arn" {
  description = "Execution ARN of the API Gateway stage"
  value       = aws_api_gateway_stage.this.execution_arn
}

output "stage_arn" {
  description = "ARN of the API Gateway stage — required to attach a WAF Web ACL"
  value       = aws_api_gateway_stage.this.arn
}
