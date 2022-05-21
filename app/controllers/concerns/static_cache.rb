module StaticCache
  extend ActiveSupport::Concern

  class_methods do
    def static_cache!(actions)
      after_action :static_cache!, only: actions
    end
  end

  included do
    def static_cache!
      return unless response.status == 200

      filename = Rails.root.join('public', request.path.gsub(%r{^/}, ''), 'index.html')
      FileUtils.mkdir_p(File.dirname(filename))
      File.write(filename, response.body)
    end
  end
end
