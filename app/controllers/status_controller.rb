class StatusController < ApplicationController
  skip_before_filter :verify_authenticity_token

  before_action :authenticate_user!

  before_action :set_course
  before_action :set_lesson

  respond_to :json

  def create
    @status = @lesson.status_for(current_user)
    @status.update status_params
    head :no_content
  end

  def finish
    @lesson.finish(current_user)
    head :no_content
  end

  private
    def set_course
      @course = Course.find(params[:course_id])
    end

    def set_lesson
      @lesson = @course.lessons.find(params[:lesson_id])
    end

    def status_params
      params.require(:status).permit(:time, :finished)
    end
end