Rails.application.default_url_options = { protocol: Rails.env.production? ? 'https' : 'http' }
