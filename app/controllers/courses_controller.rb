# frozen_string_literal: true

# Course controller
class CoursesController < ApplicationController
  include StaticCache

  static_cache! %i[index show]

  def index
    unless request.path.start_with?('/language/') || request.path == '/'
      return redirect_to root_url, status: :moved_permanently
    end

    @courses = Course.reviewed.in_language(params[:language])
  end

  def show
    @course = Course.reviewed.friendly.find(params[:id])

    redirect_to course_path(@course), status: :moved_permanently if request.path != course_path(@course)
  end
end
