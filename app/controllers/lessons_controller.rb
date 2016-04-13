class LessonsController < ApplicationController
  before_action :set_course
  before_action :set_lesson, except: :create

  respond_to :json

  def show
    respond_with @lesson
  end

  def create
    @lesson = @course.lessons.create(lesson_params)
    respond_with @course, @lesson
  end

  def update
    @lesson.update(lesson_params)
    respond_with @lesson
  end

  def destroy
    @lesson.destroy
    head :no_content
  end

  private
    def set_course
      @course = Course.find(params[:course_id])
    end

    def set_lesson
      @lesson = @course.lessons.find(params[:id])
    end

    def lesson_params
      params.require(:lesson).permit(:name, :type)
    end
end
