class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  respond_to :html

  before_action :set_locale

  private

  def set_locale
    I18n.locale = extract_locale_from_cookie || I18n.default_locale
  end

  def extract_locale_from_cookie
    cookies[:locale]
  end
end
