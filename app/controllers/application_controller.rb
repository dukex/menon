class ApplicationController < ActionController::Base
  before_action :redirect_from_www

  def redirect_from_www
    if request.host.match?(/^www\./)
      redirect_to url_for(host: request.host.sub('www.', '')), allow_other_host: true,
                                                               status: :moved_permanently
    end
  end
end
