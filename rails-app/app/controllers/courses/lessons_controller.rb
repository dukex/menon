module Courses
  class LessonsController < ApplicationController
    include StaticCache

    static_cache! %i[show]

    def show
      @lesson = course.lessons.friendly.find(params[:id])

      if request.path != course_lesson_path(
        @course.to_param, @lesson.to_param
      )
        redirect_to course_lesson_path(@course.to_param, @lesson.to_param),
                    status: :moved_permanently
      end
    end

    private

    def course
      @course ||= Course.reviewed.friendly.find(params[:course_id])
    end
  end
end
