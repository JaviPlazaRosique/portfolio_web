module "ses" {
  source = "./modules/ses"

  sender_email        = var.sender_email
  recipient_email     = var.recipient_email
  policy_name_prefix  = "portfolio"
  tags                = var.tags
}

module "iam_lambda" {
  source = "./modules/iam"

  role_name             = "portfolio-lambda-contacto-role"
  principal_identifiers = ["lambda.amazonaws.com"]
  managed_policy_arns = {
    lambda_basic = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
    ses_send     = module.ses.send_email_policy_arn
  }
  tags = var.tags
}

module "lambda_contacto" {
  source = "./modules/lambda"

  function_name = "portfolio-contacto"
  description   = "Envía el formulario de contacto del portfolio por email vía SES"
  role_arn      = module.iam_lambda.role_arn
  runtime       = "python3.12"
  handler       = "ContactaConmigoHandler.handler"
  source_dir    = "../backend/contacta_conmigo"

  environment_variables = {
    AWS_SES_REGION = var.aws_region
    CONTACT_EMAIL  = var.recipient_email
    SENDER_EMAIL   = var.sender_email
    ALLOWED_ORIGIN = var.allowed_origin
  }

  tags = var.tags
}

module "api_gateway" {
  source = "./modules/api_gateway"

  api_name             = "portfolio-api"
  stage_name           = "prod"
  lambda_invoke_arn    = module.lambda_contacto.invoke_arn
  lambda_function_name = module.lambda_contacto.function_name
  tags                 = var.tags
}