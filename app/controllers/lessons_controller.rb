class LessonsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course, except: :destroy
  before_action :set_lesson, except: :destroy

  respond_to :html

  def show
    @lesson = @course.lessons.find params[:id]
    respond_with @lesson
  end

  def next
    redirect_to course_lesson_path @course, @course.lessons[current_lesson_index + 1]
  end

  def previous
    redirect_to course_lesson_path @course, @course.lessons[current_lesson_index - 1]
  end

  def destroy
    course = current_user.courses.find params[:course_id]
    lesson = course.lessons.find params[:id]
    lesson.destroy
    redirect_to course
  end

  private

  def set_course
    @course = Course.find params[:course_id]
  end

  def set_lesson
    @lesson = @course.lessons.find params[:id]
  end

  def current_lesson_index
    @course.lessons.index(@lesson)
  end
end
