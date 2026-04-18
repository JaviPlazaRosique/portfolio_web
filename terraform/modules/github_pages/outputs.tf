output "pages_url" {
  description = "URL of the published GitHub Pages site"
  value       = try(github_repository.this.pages[0].html_url, null)
}
