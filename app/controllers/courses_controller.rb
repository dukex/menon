class CoursesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_public_course, only: :show
  before_action :set_course, only: [:edit, :update, :destroy, :import_youtube]

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
    @course = current_user.courses.new(course_params)

    respond_to do |format|
      if @course.save
        format.html { redirect_to @course, notice: 'Course was successfully created.' }
        format.json { render :show, status: :created, location: @course }
      else
        format.html { render :new }
        format.json { render json: @course.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @course.update(course_params)
        format.html { redirect_to @course, notice: 'Course was successfully updated.' }
        format.json { render :show, status: :ok, location: @course }
      else
        format.html { render :edit }
        format.json { render json: @course.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @course.destroy
    respond_to do |format|
      format.html { redirect_to courses_url, notice: 'Course was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def import_youtube
    playlist = Yt::Playlist.new url:  params[:url]
    # TODO: course thumb playlist.thumbnail_url
    # TODO: course 'by' playlist.channel_title
    # TODO: course tags playlist.tags

    @course.lessons.delete_all

    @course.lessons = playlist.playlist_items.map do |item|
      YoutubeLesson.new name: item.title,
                        description: item.description,
                        thumbnail_url: item.thumbnail_url(:high),
                        published_at: item.published_at,
                        provider_id: item.video.id,
                        position: item.position
    end

     redirect_to @course
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
