output "api_invoke_url" {
  description = "URL base de la API Gateway — úsala en el formulario de contacto del frontend"
  value       = module.api_gateway.invoke_url
}
