class CoursesController < ApplicationController
  before_action :set_course, except: :index
  before_action :authenticate_user!, only: :resume

  def index
    @q = Course.ransack(params[:q])
    @courses = @q.result(distinct: true).order(:updated_at)

    @languages = Course.all.map(&:language).uniq
  end

  def resume
    lesson = @course.resume(current_user)
    redirect_to lesson ? course_lesson_path(@course, lesson) : course_path(@course)
  end

  private
    def set_course
      @course = Course.friendly.find(params[:id])
    end
end
