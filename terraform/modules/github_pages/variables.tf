variable "repository_name" {
  description = "Name of the GitHub repository where Pages will be enabled"
  type        = string
}

variable "branch" {
  description = "Branch to serve GitHub Pages from"
  type        = string
  default     = "gh-pages"
}

variable "path" {
  description = "Directory within the branch to serve"
  type        = string
  default     = "/"
}
