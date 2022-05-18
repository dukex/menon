class SitemapController < ApplicationController
  def index
    @courses = Course.reviewed
  end
end