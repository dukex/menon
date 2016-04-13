class StatusController < ApplicationController
  skip_before_filter :verify_authenticity_token

  before_action :authenticate_user!

  before_action :set_course
  before_action :set_lesson

  respond_to :json

  def create
    @status = LessonStatus.first_or_create user_id: current_user.id,
                                           lesson_id: @lesson.id
    @status.time = params[:status][:time]
    @status.save
    head :created
  end

  private
    def set_course
      @course = Course.find(params[:course_id])
    end

    def set_lesson
      @lesson = @course.lessons.find(params[:lesson_id])
    end
end