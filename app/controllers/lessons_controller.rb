class LessonsController < ApplicationController
  before_action :authenticate_user!

  respond_to :html

  def show
    @course = Course.find params[:course_id]
    @lesson = @course.lessons.find params[:id]
    respond_with @lesson
  end

  def destroy
    course = current_user.courses.find params[:course_id]
    lesson = course.lessons.find params[:id]
    lesson.destroy
    redirect_to course
  end
end
