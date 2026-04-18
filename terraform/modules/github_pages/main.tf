terraform {
  required_providers {
    github = {
      source = "integrations/github"
    }
  }
}

resource "github_repository" "this" {
  name = var.repository_name

  pages {
    build_type = "legacy"

    source {
      branch = var.branch
      path   = var.path
    }
  }

  # Solo gestionamos la configuración de Pages; ignoramos el resto
  # de atributos del repositorio que ya existen en GitHub.
  lifecycle {
    ignore_changes = [
      description,
      homepage_url,
      visibility,
      has_issues,
      has_projects,
      has_wiki,
      allow_merge_commit,
      allow_squash_merge,
      allow_rebase_merge,
      delete_branch_on_merge,
      topics,
      archived,
      auto_init,
    ]
  }
}
