# frozen_string_literal: true

# Course controller
class CoursesController < ApplicationController
  include StaticCache

  static_cache! %i[index show]

  def index
    @courses = Course.reviewed
  end

  def show
    @course = Course.reviewed.friendly.find(params[:id])
  end
end
