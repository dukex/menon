class LessonsController < ApplicationController
  before_action :set_course
  before_action :set_lesson

  respond_to :html

  def show
    respond_with @lesson
  end

  def destroy
    @lesson.destroy
    redirect_to @course
  end

  private
    def set_course
      @course = Course.find(params[:course_id])
    end

    def set_lesson
      @lesson = @course.lessons.find(params[:id])
    end
end
