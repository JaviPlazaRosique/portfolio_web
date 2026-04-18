module "github_pages" {
  source = "./modules/github_pages"

  repository_name = var.repository_name
  branch          = var.pages_branch
  path            = var.pages_path
}
