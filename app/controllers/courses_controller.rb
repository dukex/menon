class CoursesController < ApplicationController
  before_action :set_course, only: :show

  def index
    @q = Course.ransack(params[:q])
    @courses = @q.result(distinct: true).order(:updated_at)

    @languages = Course.all.map(&:language).uniq
  end

  private
    def set_course
      @course = Course.find(params[:id])
    end
end
