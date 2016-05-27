class CoursesController < ApplicationController
  before_action :set_course, only: :show

  def index
    @courses = Course.all
  end

  private
    def set_course
      @course = Course.find(params[:id])
    end
end
