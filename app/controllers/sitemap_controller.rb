# frozen_string_literal: true

class SitemapController < ApplicationController
  def index
    @courses = Course.reviewed.includes(:lessons)
  end
end

