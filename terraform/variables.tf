variable "github_token" {
  description = "GitHub personal access token with repo permissions"
  type        = string
  sensitive   = true
}

variable "github_owner" {
  description = "GitHub username or organization that owns the repository"
  type        = string
}

variable "repository_name" {
  description = "Name of the GitHub repository"
  type        = string
}

variable "pages_branch" {
  description = "Branch from which GitHub Pages is served"
  type        = string
  default     = "gh-pages"
}

variable "pages_path" {
  description = "Directory within the branch to serve"
  type        = string
  default     = "/"
}
