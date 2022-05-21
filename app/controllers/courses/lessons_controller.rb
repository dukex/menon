module Courses
  class LessonsController < ApplicationController
    include StaticCache

    static_cache! %i[show]

    def show
      @lesson = course.lessons.friendly.find(params[:id])
    end

    private

    def course
      @course ||= Course.reviewed.friendly.find(params[:course_id])
    end
  end
end
