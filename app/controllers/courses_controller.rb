# frozen_string_literal: true

# Course controller
class CoursesController < ApplicationController
  include StaticCache

  static_cache! %i[index show]

  def index
    return redirect_to root_url, status: :moved_permanently if request.path != '/'

    @courses = Course.reviewed
  end

  def show
    @course = Course.reviewed.friendly.find(params[:id])

    redirect_to course_path(@course), status: :moved_permanently if request.path != course_path(@course)
  end
end
