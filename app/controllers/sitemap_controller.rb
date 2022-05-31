# frozen_string_literal: true

class SitemapController < ApplicationController
  LIMIT = 500

  def index
    @pages = courses.count / LIMIT
  end

  def show
    @courses = courses.offset(params[:skip]).limit(LIMIT)
  end

  private

  def courses
    @courses ||= Course.reviewed.includes(:lessons).order('id DESC')
  end
end
