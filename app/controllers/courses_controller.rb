# frozen_string_literal: true

# Course controller
class CoursesController < ApplicationController
  def index
    @courses = Course.reviewed
  end

  def show
    @course = Course.reviewed.find(params[:id])
  end
end
