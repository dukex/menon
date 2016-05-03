class CoursesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_public_course, only: :show
  before_action :set_course, only: [:edit, :update, :destroy]

  def index
    @courses = Course.all
  end

  def show
  end

  def new
    @course = Course.new
  end

  def edit
  end

  def create
    @course = current_user.courses.create course_params
    respond_with @course
  end

  def update
    @course.update(course_params)
    respond_with @course
  end

  def destroy
    @course.destroy
    respond_with @course
  end

  def import_from_youtube
    @course = Course.import_from_youtube params[:url], current_user
    respond_with @course
  end


  private
    def set_public_course
      @course = Course.find(params[:id])
    end

    def set_course
      @course = current_user.courses.find params[:id]
    end

    def course_params
      params.require(:course).permit(:name)
    end
end
