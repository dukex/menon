class LessonsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course
  before_action :set_lesson

  def show
    respond_with @lesson
  end

  def next
    lesson = @course.lessons[current_lesson_index + 1]
    redirect_to lesson ? course_lesson_path(@course, lesson) : course_path(@course)
  end

  def previous
    lesson = @course.lessons[current_lesson_index - 1]
    redirect_to lesson ? course_lesson_path(@course, lesson) : course_path(@course)
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
