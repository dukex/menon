Rails.application.config.real_env = ActiveSupport::EnvironmentInquirer.new(ENV.fetch('REAL_ENV', Rails.env.to_s))
